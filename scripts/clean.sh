#!/bin/sh
RED='\033[0;31m'
GREEN='\033[0;32m'
ORANGE='\033[0;33m'
RESET='\033[0m'
if [ "$1" = "db" ]; then
    printf "${ORANGE}Cleaning all containers and volumes${RESET}\n"
    docker-compose down
    docker volume prune -f
    if [ $? -eq 0 ]; then
        printf "${GREEN}Cleanup success${RESET}\n"
    else
        printf "${RED}Cleanup failed${RESET}\n"
    fi
elif [ "$1" = "all" ]; then
    printf "${ORANGE}Cleaning all containers and volumes${RESET}\n"
    docker-compose down
    docker volume prune -f
    printf "${ORANGE}Cleaning all network${RESET}\n"
    docker network prune -f
    printf "${ORANGE}Deleting node_modules${RESET}\n"
    du -sh */node_modules
    rm -rf */node_modules */*lock* */dist
    if [ $? -eq 0 ]; then
        printf "${GREEN}Cleanup success${RESET}\n"
    else
        printf "${RED}Cleanup failed${RESET}\n"
    fi
else
    echo "Usage: ./clean.sh [db|all]"
fi
