#!/bin/bash
GREEN='\033[0;32m'
RESET='\033[0m'
docker-compose down
docker-compose up --build
