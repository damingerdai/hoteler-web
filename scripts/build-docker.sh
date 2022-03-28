#!/bin/bash

sha=$(git rev-parse --short HEAD)

docker build -t hoteler-web:${sha} .
