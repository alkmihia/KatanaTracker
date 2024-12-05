#!/bin/bash

CYAN='\033[1;36m'
GREEN='\033[1;32m'
RED='\033[1;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sem cor

# Exibir ASCII Art em ciano
echo -e "${CYAN}"
echo " ____  __.       __                     ___________                     __                 "
echo "|    |/ _|____ _/  |______    ____ _____\\__    ___/___________    ____ |  | __ ___________ "
echo "|      < \\__  \\\\   __\\__  \\  /    \\\\__  \\ |    |  \\_  __ \\__  \\ _/ ___\\|  |/ // __ \\_  __ \\"
echo "|    |  \\ / __ \\|  |  / __ \\|   |  \\/ __ \\|    |   |  | \\/ __ \\\\  \\___|    <\\  ___/|  | \\/"
echo "|____|__ (____  /__| (____  /___|  (____  /____|   |__|  (____  /\\___  >__|_ \\\\___  >__|   "
echo "        \\/    \\/          \\/     \\/     \\/                    \\/     \\/     \\/    \\/     "
echo -e "${NC}-> Author: Alkmihia"

if [ ! -d "node_modules" ]; then
  echo -e "${RED}Dependencies not found.${YELLOW} Instaling...${NC}"
  npm install
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Dependencies installed successfully.${NC}"
  else
    echo -e "${RED}Error installing dependencies.${NC}"
    exit 1
  fi
fi

echo -e "${GREEN}Iniciando a aplicação...${NC}"
npm start
