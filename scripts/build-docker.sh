#!/usr/bin/env bash
set -euo pipefail

sha=$(git rev-parse --short HEAD)
# Accept an optional platform argument (default: linux/amd64)
platform=${1:-linux/amd64}

# Prefer buildx for platform builds. Use --load so the image is available locally.
if docker buildx version >/dev/null 2>&1; then
  docker buildx build --platform "${platform}" --load -t "hoteler-web:${sha}" .
else
  echo "Warning: docker buildx not available; falling back to 'docker build' (may not support platform selection)"
  docker build -t "hoteler-web:${sha}" .
fi
