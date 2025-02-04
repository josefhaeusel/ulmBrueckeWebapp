#!/bin/bash
# Directory containing images
FOLDER_NAME=learningByDoing
INPUT_DIR="./src/assets/${FOLDER_NAME}"
OUTPUT_DIR="./src/assets/comp/${FOLDER_NAME}"
# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"
# Loop through all images in the input directory
for file in "$INPUT_DIR"/*.{jpg,jpeg,png}; do
  # Skip if no files found
  [ -e "$file" ] || continue
  # Get the file name and extension
  filename=$(basename "$file")
  extension="${filename##*.}"
  name="${filename%.*}"
  # Compress the image
  ffmpeg -i "$file"  -q:v 100 "$OUTPUT_DIR/${name}.${extension}"
done
echo "Compression completed. Compressed images are in $OUTPUT_DIR."