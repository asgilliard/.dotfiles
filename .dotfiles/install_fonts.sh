#!/bin/bash

set -euo pipefail

FONT_DIR="$HOME/Library/Fonts"
mkdir -p "$FONT_DIR"

# Nerd Fonts Setup
nerd_fonts=(
    "Meslo"
    "JetBrainsMono"
)

for font in "${nerd_fonts[@]}"; do
    echo "Downloading $font Nerd Font..."
    curl -LsS -o "/tmp/$font.tar.xz" "https://github.com/ryanoasis/nerd-fonts/releases/latest/download/$font.tar.xz"
    
    echo "Extracting $font..."
    tar -xf "/tmp/$font.tar.xz" -C "$FONT_DIR/"
    
    rm -f "/tmp/$font.tar.xz"
done

# Inter Setup
echo "Getting latest Inter release..."
INTER_URL=$(curl -s https://api.github.com/repos/rsms/inter/releases/latest | grep "browser_download_url.*zip" | cut -d '"' -f 4)

if [ -z "$INTER_URL" ]; then
    echo "Error: Could not find Inter download URL"
    exit 1
fi

echo "Downloading Inter..."
curl -LsS -o "/tmp/Inter.zip" "$INTER_URL"

echo "Extracting Inter..."
unzip -q "/tmp/Inter.zip" -d "/tmp/Inter/"

echo "Installing Inter fonts..."
INTER_DIR=$(find "/tmp/Inter" -maxdepth 1 -type d -name "Inter*" | head -1)

if [ -n "$INTER_DIR" ]; then
    find "$INTER_DIR" -name "*.ttf" -exec cp {} "$FONT_DIR/" \;
else
    find "/tmp/Inter" -name "*.ttf" -exec cp {} "$FONT_DIR/" \;
fi

rm -f "/tmp/Inter.zip"
rm -rf "/tmp/Inter"

echo "Updating font cache..."
if command -v fc-cache > /dev/null; then
    fc-cache -f > /dev/null 2>&1
fi

echo "Done! Fonts installed to $FONT_DIR"
