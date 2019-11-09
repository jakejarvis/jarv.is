#!/bin/bash

# Make sure run from parent directory...

echo "Building Docker image..."
docker build -t jarv.is:develop -f Dockerfile .

echo "Starting live Hugo server..."
echo "Will go live at: http://localhost:1313"
docker run -v $(pwd):/src -p 1313:1313 jarv.is:develop
