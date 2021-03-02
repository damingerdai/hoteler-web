#!/bin/sh

echo "run ngcc."
ngcc --properties es2015 browser module main --first-only --create-ivy-entry-points --tsconfig ./tsconfig.json
