#!/usr/bin/env bash

BASEDIR=$(dirname "$(realpath -s "$0")")

function backup_dir() {
    local dir_path="$1"
    if [ -d "$dir_path" ]; then
        local backup_path="${dir_path}.bak.$(date +%Y-%m-%d_%H-%M-%S)"
        echo "Backing up existing $dir_path to $backup_path"
        mv "$dir_path" "$backup_path"
    fi
}

function backup_file() {
    local file_path="$1"
    if [ -f "$file_path" ]; then
        local backup_path="${file_path}.bak.$(date +%Y-%m-%d_%H-%M-%S)"
        echo "Backing up existing $file_path to $backup_path"
        mv "$file_path" "$backup_path"
    fi
}

backup_dir "$HOME/.config/hypr"
echo "Adding hypr config"
ln -s "$BASEDIR/hypr" "$HOME/.config/hypr"

backup_dir "$HOME/.config/ghostty"
echo "Adding ghostty config"
ln -s "$BASEDIR/ghostty" "$HOME/.config/ghostty"

backup_dir "$HOME/.config/anyrun"
echo "Adding anyrun config"
ln -s "$BASEDIR/anyrun" "$HOME/.config/anyrun"

backup_file "$HOME/.config/electron-flags.conf"
echo "Adding electron-flags.conf"
ln -s "$BASEDIR/electron-flags.conf" "$HOME/.config/electron-flags.conf"
