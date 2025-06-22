#!/bin/bash
# install ffmpeg and jq before running this script
# Usage: ./split_for_strudel.sh path/to/file.mp3 sample_name

set -e

mp3_path="$1"
sample_name="$2"
json_file="strudel.json"

if [ -z "$mp3_path" ] || [ -z "$sample_name" ]; then
  echo "Usage: $0 path/to/file.mp3 sample_name"
  exit 1
fi

mkdir -p "$sample_name"

# Clean old chunks if any
rm -f "$sample_name/"*.ogg

# Split into 2s chunks as .ogg
ffmpeg -i "$mp3_path" -f segment -segment_time 2 -c:a libvorbis "$sample_name/%d.ogg"

# Build array of sample paths
ogg_files=($(ls "$sample_name"/*.ogg | sort -V))
json_array=$(printf '"%s",' "${ogg_files[@]}")
json_array="[${json_array%,}]"

# If no strudel.json, make one with _base
if [ ! -f "$json_file" ]; then
  echo "{ \"_base\": \".\", \"$sample_name\": $json_array }" > "$json_file"
  echo "✅ Created new $json_file with \"$sample_name\" sample."
else
  # Update existing strudel.json
  tmp_json=$(mktemp)

  # Use jq to insert or replace the sample entry
  jq --arg key "$sample_name" --argjson val "$(
    jq -n "$json_array"
  )" '.[$key] = $val' "$json_file" > "$tmp_json" && mv "$tmp_json" "$json_file"

  echo "✅ Updated $json_file with \"$sample_name\" sample."
fi

echo "🎧 You can now use it with: s(\"$sample_name:0 $sample_name:1 ...\")"
