#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "Verifying file structure..."

# Essential directories
dirs=(
    "src"
    "src/__tests__"
    "src/types"
    "dist"
    "examples"
    "examples/basic-map"
    "examples/typescript-integration"
    "examples/react-integration"
    "examples/cdn-usage"
    ".github"
    ".github/workflows"
    ".github/ISSUE_TEMPLATE"
    "scripts"
)

# Essential files
files=(
    "src/geotype.ts"
    "package.json"
    "tsconfig.json"
    "README.md"
    "LICENSE"
    ".gitignore"
    ".npmignore"
)

# Check directories
for dir in "${dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓${NC} Directory exists: $dir"
    else
        echo -e "${RED}✗${NC} Missing directory: $dir"
    fi
done

# Check files
echo -e "\nChecking essential files..."
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} File exists: $file"
    else
        echo -e "${RED}✗${NC} Missing file: $file"
    fi
done

# Verify package.json configuration
echo -e "\nVerifying package.json..."
if grep -q '"name": "@renegadesamuri/geotype"' package.json; then
    echo -e "${GREEN}✓${NC} Package name is correct"
else
    echo -e "${RED}✗${NC} Package name should be @renegadesamuri/geotype"
fi

echo -e "\nDone! If all checks passed, you're ready to commit and push to GitHub."
