#!/bin/bash

INSTALL_DIR="/usr/local/bin"
VERSION=v0.29.1

echo "Start Install of geckodriver"
wget https://github.com/mozilla/geckodriver/releases/download/$VERSION/geckodriver-$VERSION-linux64.tar.gz
tar -xvzf geckodriver*
chmod +x geckodriver
mv geckodriver "$INSTALL_DIR"
rm -f geckodriver*
echo "installed geckodriver binary in $INSTALL_DIR"
