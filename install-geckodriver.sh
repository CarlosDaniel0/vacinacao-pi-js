#!/bin/bash

install_dir="/usr/local/bin"

echo "Start Install of geckodriver"
json=$(curl -s https://api.github.com/repos/mozilla/geckodriver/releases/latest)
if [[ $(uname) == "Darwin" ]]; then
    url=$(echo "$json" | jq -r '.assets[].browser_download_url | select(contains("macos"))')
elif [[ $(uname) == "Linux" ]]; then
    url=$(echo "$json" | jq -r '.assets[].browser_download_url | select(contains("linux64"))')
else
    echo "can't determine OS"
    exit 1
fi

url=$(echo $url | cut -f1 -d" ")
curl -s -L "$url" | tar -xz
chmod +x geckodriver*
sudo mv geckodriver "$install_dir"
rm -f geckodriver*
echo "installed geckodriver binary in $install_dir"