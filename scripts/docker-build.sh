#!/bin/bash

# Make sure run from parent directory...

echo "Building Hugo from Docker image..."
docker run -v $(pwd):/src jakejarvis/hugo-custom:latest --gc --cleanDestinationDir --verbose
