#!/bin/bash

set -euo pipefail

BINDIR=$HOME/jj-bin
mkdir -p $BINDIR

# download custom Hugo fork release
# https://github.com/jakejarvis/hugo-custom/releases
echo "Downloading Hugo..."
curl -sS -L https://github.com/jakejarvis/hugo-custom/releases/download/v0.53-patch3/hugo-extended -o $BINDIR/hugo-extended
chmod +x $BINDIR/hugo-extended

# download jpegoptim binary
echo "Downloading jpegoptim..."
curl -sS -L https://github.com/imagemin/jpegoptim-bin/raw/master/vendor/linux/jpegoptim -o $BINDIR/jpegoptim
chmod +x $BINDIR/jpegoptim

# download pngquant binary
echo "Downloading pngquant..."
curl -sS -L https://github.com/imagemin/pngquant-bin/raw/master/vendor/linux/x64/pngquant -o $BINDIR/pngquant
chmod +x $BINDIR/pngquant

# make sure everything's okay
$BINDIR/hugo-extended version
#$BINDIR/jpegoptim
#$BINDIR/pngquant

# build site
$BINDIR/hugo-extended -b "/" --gc --cleanDestinationDir --verbose

# optimize images
find ./public -iname "*.jp*" -print0 | xargs -0 $BINDIR/jpegoptim --max=80 --strip-all
find ./public -iname "*.png" -print0 | xargs -0 $BINDIR/pngquant --quality=50-70 --speed 1 --ext=.png --force

# remove binaries (TODO: make safe, doesn't really matter b/c docker)
rm -rf $BINDIR
