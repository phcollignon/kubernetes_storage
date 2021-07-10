#!/bin/bash
docker build  -f Dockerfile -t backend .
docker tag backend phico/backend:3.0
docker push phico/backend:3.0
