#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "Preparing to commit Geotype files..."

# Ensure we're in a git repository
if [ ! -d .git ]; then
    echo -e "${RED}Error: Not a git repository${NC}"
    echo "Please run: git init"
    exit 1
fi

# Check if remote is set correctly
if ! git remote get-url origin >/dev/null 2>&1; then
    echo -e "${RED}Error: Git remote 'origin' not set${NC}"
    echo "Please run: git remote add origin https://github.com/renegadesamuri/geotype.git"
    exit 1
fi

# Stage all files
echo -e "\n${GREEN}Staging files...${NC}"
git add .

# Show what's being committed
echo -e "\n${GREEN}Files to be committed:${NC}"
git status

# Commit message
echo -e "\n${GREEN}Creating commit...${NC}"
git commit -m "Initial release: Geotype - TypeScript Google Maps Service

- Added core Google Maps TypeScript service
- Included comprehensive documentation
- Added examples for various integrations
- Set up testing and CI/CD configuration
- Added npm package configuration"

# Push changes
echo -e "\n${GREEN}Pushing to GitHub...${NC}"
git push -u origin main

echo -e "\n${GREEN}Done!${NC}"
echo "Check your repository at: https://github.com/renegadesamuri/geotype"
