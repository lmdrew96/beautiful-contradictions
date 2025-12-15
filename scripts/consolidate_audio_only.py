#!/usr/bin/env python3
"""
Consolidate Tatoeba sentences into audio-only files.

- Beginner: merge beginner + beginner_extended, audio-only
- Intermediate: merge intermediate + intermediate_extended, audio-only
- Advanced: keep all sentences (audio is rare for complex sentences)
"""

import re
import os
from datetime import datetime

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
DATA_DIR = os.path.join(PROJECT_DIR, "src", "data", "tatoeba")

def extract_sentences(filepath):
    """Extract sentence objects from a JS file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Match sentence objects
    pattern = r"\{\s*id:\s*'([^']+)',\s*romanian:\s*'([^']*)',\s*english:\s*'([^']*)',\s*difficulty:\s*(\d+),\s*wordCount:\s*(\d+),\s*hasAudio:\s*(true|false),\s*audioUrl:\s*(null|'[^']*')\s*\}"

    sentences = []
    for match in re.finditer(pattern, content):
        audio_url = match.group(7)
        if audio_url != 'null':
            audio_url = audio_url.strip("'")
        else:
            audio_url = None

        sentences.append({
            'id': match.group(1),
            'romanian': match.group(2),
            'english': match.group(3),
            'difficulty': int(match.group(4)),
            'wordCount': int(match.group(5)),
            'hasAudio': match.group(6) == 'true',
            'audioUrl': audio_url
        })

    return sentences

def write_js_file(filepath, sentences, export_name, header_comment):
    """Write sentences to a JS file."""
    date_str = datetime.now().strftime('%Y-%m-%d')
    audio_count = len([s for s in sentences if s['hasAudio'] and s['audioUrl']])

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(f'''/**
 * {header_comment}
 * Source: tatoeba.org (CC-BY 2.0 FR)
 *
 * Consolidated: {date_str}
 * Total sentences: {len(sentences)}
 * With audio: {audio_count}
 */

export const {export_name} = [
''')

        for i, s in enumerate(sentences):
            romanian = s['romanian'].replace("'", "\\'")
            english = s['english'].replace("'", "\\'")
            audio_url = f"'{s['audioUrl']}'" if s['audioUrl'] else 'null'
            has_audio = 'true' if s['hasAudio'] and s['audioUrl'] else 'false'

            f.write(f"  {{ id: '{s['id']}', romanian: '{romanian}', english: '{english}', difficulty: {s['difficulty']}, wordCount: {s['wordCount']}, hasAudio: {has_audio}, audioUrl: {audio_url} }}")

            if i < len(sentences) - 1:
                f.write(',')
            f.write('\n')

        f.write(f'''];

export default {export_name};
''')

def main():
    print("=" * 60)
    print("Consolidating Tatoeba Sentences (Audio-Only)")
    print("=" * 60)

    # Load all sentences
    print("\nLoading sentences...")

    beginner = extract_sentences(os.path.join(DATA_DIR, 'beginner.js'))
    beginner_ext = extract_sentences(os.path.join(DATA_DIR, 'beginner_extended.js'))
    intermediate = extract_sentences(os.path.join(DATA_DIR, 'intermediate.js'))
    intermediate_ext = extract_sentences(os.path.join(DATA_DIR, 'intermediate_extended.js'))
    advanced = extract_sentences(os.path.join(DATA_DIR, 'advanced.js'))
    advanced_ext = extract_sentences(os.path.join(DATA_DIR, 'advanced_extended.js'))

    print(f"  Beginner: {len(beginner)} + {len(beginner_ext)} extended")
    print(f"  Intermediate: {len(intermediate)} + {len(intermediate_ext)} extended")
    print(f"  Advanced: {len(advanced)} + {len(advanced_ext)} extended")

    # Merge and filter
    print("\nFiltering to audio-only (except advanced)...")

    # Beginner: audio only, deduplicate by Romanian text
    seen_ro = set()
    beginner_merged = []
    for s in beginner + beginner_ext:
        if s['hasAudio'] and s['audioUrl'] and s['romanian'].lower() not in seen_ro:
            seen_ro.add(s['romanian'].lower())
            beginner_merged.append(s)

    # Sort by difficulty, then word count
    beginner_merged.sort(key=lambda x: (x['difficulty'], x['wordCount']))

    # Intermediate: audio only, deduplicate
    seen_ro = set()
    intermediate_merged = []
    for s in intermediate + intermediate_ext:
        if s['hasAudio'] and s['audioUrl'] and s['romanian'].lower() not in seen_ro:
            seen_ro.add(s['romanian'].lower())
            intermediate_merged.append(s)

    intermediate_merged.sort(key=lambda x: (x['difficulty'], x['wordCount']))

    # Advanced: keep ALL (audio is rare), deduplicate
    seen_ro = set()
    advanced_merged = []
    for s in advanced + advanced_ext:
        if s['romanian'].lower() not in seen_ro:
            seen_ro.add(s['romanian'].lower())
            advanced_merged.append(s)

    advanced_merged.sort(key=lambda x: (x['difficulty'], x['wordCount']))

    print(f"  Beginner (audio-only): {len(beginner_merged)}")
    print(f"  Intermediate (audio-only): {len(intermediate_merged)}")
    print(f"  Advanced (all): {len(advanced_merged)}")

    # Write consolidated files
    print("\nWriting consolidated files...")

    write_js_file(
        os.path.join(DATA_DIR, 'beginner.js'),
        beginner_merged,
        'TATOEBA_BEGINNER',
        'Tatoeba Beginner Sentences - Audio Only'
    )
    print(f"  beginner.js: {len(beginner_merged)} sentences")

    write_js_file(
        os.path.join(DATA_DIR, 'intermediate.js'),
        intermediate_merged,
        'TATOEBA_INTERMEDIATE',
        'Tatoeba Intermediate Sentences - Audio Only'
    )
    print(f"  intermediate.js: {len(intermediate_merged)} sentences")

    write_js_file(
        os.path.join(DATA_DIR, 'advanced.js'),
        advanced_merged,
        'TATOEBA_ADVANCED',
        'Tatoeba Advanced Sentences - All (audio rare)'
    )
    print(f"  advanced.js: {len(advanced_merged)} sentences")

    # Remove extended files (now merged)
    print("\nRemoving extended files (now merged)...")
    for filename in ['beginner_extended.js', 'intermediate_extended.js', 'advanced_extended.js']:
        filepath = os.path.join(DATA_DIR, filename)
        if os.path.exists(filepath):
            os.remove(filepath)
            print(f"  Removed {filename}")

    total = len(beginner_merged) + len(intermediate_merged) + len(advanced_merged)
    audio_total = len(beginner_merged) + len(intermediate_merged) + len([s for s in advanced_merged if s['audioUrl']])

    print("\n" + "=" * 60)
    print(f"Done! Total: {total} sentences ({audio_total} with audio)")
    print("=" * 60)

if __name__ == '__main__':
    main()
