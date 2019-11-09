#!/bin/bash

# only designed to run on Netlify's build image:
# https://github.com/netlify/build-image

set -euo pipefail

BINDIR=$HOME/jj-bin
mkdir -p $BINDIR

# download forked Hugo extended binary
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

# download optipng binary
echo "Downloading optipng..."
curl -sS -L https://github.com/imagemin/optipng-bin/raw/master/vendor/linux/x64/optipng -o $BINDIR/optipng
chmod +x $BINDIR/optipng

# make sure everything's OK
echo "Is Hugo ready..?"
$BINDIR/hugo-extended version

# build Hugo site
echo "Building site..."
$BINDIR/hugo-extended --gc --cleanDestinationDir --verbose

# optimize images in publish directory
echo "Optimizing JPEGs..."
find ./public -iname "*.jp*" -print0 | xargs -0 $BINDIR/jpegoptim --max=80 --strip-all --quiet
echo "Optimizing PNGs..."
find ./public -iname "*.png" -print0 | xargs -0 $BINDIR/pngquant --quality=50-70 --speed 3 --ext=.png --force
find ./public -iname "*.png" -print0 | xargs -0 $BINDIR/optipng -o3 -force -strip all -quiet --

# remove binaries (kinda unsafe, but doesn't really matter b/c it's docker)
echo "Cleaning up binaries..."
rm -rf $BINDIR

echo "All done!"
exit 0
