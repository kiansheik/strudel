#!/bin/bash

# Usage: ./split_mp3.sh path/to/song.mp3 [output_dir]

mp3_path="$1"
basename=$(basename "$mp3_path" .mp3)

if [ -n "$2" ]; then
    output_dir="$2"
else
    output_dir="${basename}_chunks"
fi

mkdir -p "$output_dir"

ffmpeg -i "$mp3_path" -f segment -segment_time 2 -c:a libvorbis "$output_dir/%03d.ogg"
