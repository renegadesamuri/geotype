#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "Verifying required files for GitHub push..."

# Required files and directories
required_files=(
    "src/geotype.ts"
    "src/types/google-maps.d.ts"
    "package.json"
    "tsconfig.json"
    "README.md"
    "INTEGRATION.md"
    "LICENSE"
    ".gitignore"
    ".npmignore"
)

required_dirs=(
    "src"
    "examples"
    ".github"
    "dist"
)

# Check files
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} Found $file"
    else
        echo -e "${RED}✗${NC} Missing $file"
    fi
done

# Check directories
echo -e "\nChecking directories..."
for dir in "${required_dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓${NC} Found directory $dir"
    else
        echo -e "${RED}✗${NC} Missing directory $dir"
    fi
done

# Additional checks
echo -e "\nVerifying package.json..."
if grep -q "\"name\": \"@renegadesamuri/geotype\"" package.json; then
    echo -e "${GREEN}✓${NC} Package name is correct"
else
    echo -e "${RED}✗${NC} Package name should be @renegadesamuri/geotype"
fi

echo -e "\nVerifying TypeScript configuration..."
if grep -q "\"declaration\": true" tsconfig.json; then
    echo -e "${GREEN}✓${NC} TypeScript declarations enabled"
else
    echo -e "${RED}✗${NC} TypeScript declarations should be enabled"
fi

echo -e "\nVerifying Git repository..."
if git remote -v | grep -q "github.com/renegadesamuri/geotype"; then
    echo -e "${GREEN}✓${NC} Git remote is correctly set"
else
    echo -e "${RED}✗${NC} Git remote should point to github.com/renegadesamuri/geotype"
fi
