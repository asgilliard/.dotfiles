#!/bin/bash

set -euo pipefail

REMOTE_URL="https://github.com/asgilliard/.dotfiles.git"

echo "Setting up dotfiles..."

# Adding .dotfiles  to .gitignore to avoid recursion errors
echo ".dotfiles" >> ~/.gitignore

# Clone the repository
git clone "$REMOTE_URL" "$HOME/.dotfiles"

# Configure repository
git --git-dir="$HOME/.dotfiles/.git" --work-tree="$HOME" config --local status.showUntrackedFiles no

# Restore files with force overwrite
git --git-dir="$HOME/.dotfiles/.git" --work-tree="$HOME" checkout -f

echo "Dotfiles installed! Restart your shell or run:"
echo "exec zsh"
