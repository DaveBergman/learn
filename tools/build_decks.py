#!/usr/bin/env python3
"""
Read tracks/**/cards/*.yaml and tracks/**/quiz/*.yaml, emit:
  - site/public/decks/<track>-<module>.json    (web flashcard player)
  - site/public/quizzes/<track>-<module>.json  (web quiz mode)
  - site/public/decks/manifest.json            (what's available, for the dashboard)
  - dist/apkg/<track>-<module>.apkg            (Anki import, via genanki)

Also mirrors the read-only markdown the site displays (labs, syllabus,
learner profile) into site/public/content/, since the site only ships what's
under site/public/ — it never reaches into tracks/ or system/ directly.

Cards/quiz YAML and the markdown files are the single source of truth. This
script only transforms/copies them — it never invents content. Run after
/learn-cards or /learn-ingest add or change files.
"""
import hashlib
import json
import shutil
import sys
from pathlib import Path

import yaml

try:
    import genanki
except ImportError:
    print("genanki not installed — run: pip3 install --user genanki", file=sys.stderr)
    sys.exit(1)

REPO_ROOT = Path(__file__).resolve().parent.parent
TRACKS_DIR = REPO_ROOT / "tracks"
SITE_DECKS_DIR = REPO_ROOT / "site" / "public" / "decks"
SITE_QUIZ_DIR = REPO_ROOT / "site" / "public" / "quizzes"
SITE_CONTENT_DIR = REPO_ROOT / "site" / "public" / "content"
APKG_DIR = REPO_ROOT / "dist" / "apkg"


def stable_id(*parts: str) -> int:
    """Deterministic int ID for genanki model/deck IDs, derived from a stable string."""
    digest = hashlib.sha1("::".join(parts).encode()).hexdigest()
    return int(digest[:12], 16)


CARD_MODEL = genanki.Model(
    stable_id("learn-repo", "basic-cited-model"),
    "Learn (cited)",
    fields=[{"name": "Front"}, {"name": "Back"}, {"name": "Source"}],
    templates=[
        {
            "name": "Card 1",
            "qfmt": "{{Front}}",
            "afmt": '{{FrontSide}}<hr id="answer">{{Back}}'
            '<div style="margin-top:1em;font-size:0.8em;opacity:0.6">Source: {{Source}}</div>',
        }
    ],
)


def find_card_files():
    """Yield (track_slug, module_slug, yaml_path) for every cards/*.yaml file."""
    for track_dir in sorted(TRACKS_DIR.iterdir()):
        if not track_dir.is_dir():
            continue
        for module_dir in sorted(track_dir.iterdir()):
            cards_dir = module_dir / "cards"
            if not cards_dir.is_dir():
                continue
            yaml_files = sorted(cards_dir.glob("*.yaml"))
            if yaml_files:
                yield track_dir.name, module_dir.name, yaml_files


def load_cards(yaml_files):
    cards = []
    for path in yaml_files:
        data = yaml.safe_load(path.read_text()) or []
        for card in data:
            missing = [k for k in ("id", "front", "back", "source_url") if k not in card]
            if missing:
                raise ValueError(f"{path}: card missing required field(s) {missing}: {card}")
            card["_file"] = str(path.relative_to(REPO_ROOT))
            cards.append(card)
    return cards


def write_site_deck(track: str, module: str, cards: list[dict]):
    SITE_DECKS_DIR.mkdir(parents=True, exist_ok=True)
    out_path = SITE_DECKS_DIR / f"{track}-{module}.json"
    deck_json = {
        "track": track,
        "module": module,
        "cards": [
            {
                "id": c["id"],
                "front": c["front"],
                "back": c["back"],
                "source_note": c.get("source_note"),
                "source_url": c["source_url"],
                "review": c.get("review", {"interval": 0, "ease": 2.5, "due": None, "reps": 0}),
            }
            for c in cards
        ],
    }
    out_path.write_text(json.dumps(deck_json, indent=2) + "\n")
    return out_path


def write_apkg(track: str, module: str, cards: list[dict]):
    APKG_DIR.mkdir(parents=True, exist_ok=True)
    deck_name = f"learn::{track}::{module}"
    deck = genanki.Deck(stable_id("learn-repo", track, module), deck_name)
    for c in cards:
        note = genanki.Note(
            model=CARD_MODEL,
            fields=[c["front"], c["back"], c["source_url"]],
            guid=genanki.guid_for(track, module, c["id"]),
        )
        deck.add_note(note)
    out_path = APKG_DIR / f"{track}-{module}.apkg"
    genanki.Package(deck).write_to_file(str(out_path))
    return out_path


def find_quiz_files():
    for track_dir in sorted(TRACKS_DIR.iterdir()):
        if not track_dir.is_dir():
            continue
        for module_dir in sorted(track_dir.iterdir()):
            quiz_dir = module_dir / "quiz"
            if not quiz_dir.is_dir():
                continue
            yaml_files = sorted(quiz_dir.glob("*.yaml"))
            if yaml_files:
                yield track_dir.name, module_dir.name, yaml_files


def load_quiz_questions(yaml_files):
    questions = []
    for path in yaml_files:
        data = yaml.safe_load(path.read_text()) or []
        for q in data:
            missing = [k for k in ("id", "question", "choices", "answer") if k not in q]
            if missing:
                raise ValueError(f"{path}: quiz item missing required field(s) {missing}: {q}")
            questions.append(q)
    return questions


def write_site_quiz(track: str, module: str, questions: list[dict]):
    SITE_QUIZ_DIR.mkdir(parents=True, exist_ok=True)
    out_path = SITE_QUIZ_DIR / f"{track}-{module}.json"
    out_path.write_text(json.dumps({"track": track, "module": module, "questions": questions}, indent=2) + "\n")
    return out_path


def write_manifest(entries: list[dict]):
    SITE_DECKS_DIR.mkdir(parents=True, exist_ok=True)
    manifest_path = SITE_DECKS_DIR / "manifest.json"
    manifest_path.write_text(json.dumps({"decks": entries}, indent=2) + "\n")
    return manifest_path


def mirror_content():
    """Copy read-only markdown (labs, syllabus, learner profile) into
    site/public/content/ so the site can fetch and render it."""
    if SITE_CONTENT_DIR.exists():
        shutil.rmtree(SITE_CONTENT_DIR)
    SITE_CONTENT_DIR.mkdir(parents=True)

    profile_src = REPO_ROOT / "system" / "LEARNER_PROFILE.md"
    if profile_src.exists():
        shutil.copy(profile_src, SITE_CONTENT_DIR / "learner-profile.md")

    method_src = REPO_ROOT / "system" / "METHOD.md"
    if method_src.exists():
        shutil.copy(method_src, SITE_CONTENT_DIR / "method.md")

    count = 0
    modules = []
    for track_dir in sorted(TRACKS_DIR.iterdir()):
        if not track_dir.is_dir():
            continue
        for module_dir in sorted(track_dir.iterdir()):
            if not module_dir.is_dir():
                continue
            module_entry = {"track": track_dir.name, "module": module_dir.name, "syllabus": None, "labs": []}
            syllabus_src = module_dir / "syllabus.md"
            if syllabus_src.exists():
                fname = f"{track_dir.name}-{module_dir.name}.md"
                dest = SITE_CONTENT_DIR / "syllabus" / fname
                dest.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy(syllabus_src, dest)
                module_entry["syllabus"] = fname
                count += 1
            labs_dir = module_dir / "labs"
            if labs_dir.is_dir():
                for lab_file in sorted(labs_dir.glob("*.md")):
                    fname = f"{track_dir.name}-{module_dir.name}-{lab_file.name}"
                    dest = SITE_CONTENT_DIR / "labs" / fname
                    dest.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy(lab_file, dest)
                    module_entry["labs"].append({"slug": lab_file.stem, "file": fname})
                    count += 1
            if module_entry["syllabus"] or module_entry["labs"]:
                modules.append(module_entry)

    (SITE_CONTENT_DIR / "manifest.json").write_text(json.dumps({"modules": modules}, indent=2) + "\n")
    return count


def main():
    total_cards = 0
    manifest_entries = []
    for track, module, yaml_files in find_card_files():
        cards = load_cards(yaml_files)
        if not cards:
            continue
        site_path = write_site_deck(track, module, cards)
        apkg_path = write_apkg(track, module, cards)
        print(f"{track}/{module}: {len(cards)} cards -> {site_path.relative_to(REPO_ROOT)}, {apkg_path.relative_to(REPO_ROOT)}")
        manifest_entries.append(
            {
                "track": track,
                "module": module,
                "file": site_path.name,
                "card_count": len(cards),
            }
        )
        total_cards += len(cards)
    if total_cards == 0:
        print("No cards found under tracks/**/cards/*.yaml", file=sys.stderr)
        sys.exit(1)
    write_manifest(manifest_entries)

    total_quiz = 0
    for track, module, yaml_files in find_quiz_files():
        questions = load_quiz_questions(yaml_files)
        if not questions:
            continue
        quiz_path = write_site_quiz(track, module, questions)
        print(f"{track}/{module}: {len(questions)} quiz questions -> {quiz_path.relative_to(REPO_ROOT)}")
        total_quiz += len(questions)

    content_count = mirror_content()
    print(f"\nTotal: {total_cards} cards across {len(manifest_entries)} deck(s), {total_quiz} quiz questions, {content_count} content file(s) mirrored.")


if __name__ == "__main__":
    main()
