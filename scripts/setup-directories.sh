#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "Creating directory structure for Geotype..."

# Create all required directories
directories=(
    "src/types"
    "src/__tests__"
    "dist"
    "examples/basic-map"
    "examples/cdn-usage"
    "examples/react-integration"
    "examples/typescript-integration"
    ".github/workflows"
    ".github/ISSUE_TEMPLATE"
    "scripts"
)

for dir in "${directories[@]}"; do
    mkdir -p "$dir"
    echo -e "${GREEN}Created directory:${NC} $dir"
done

echo -e "\n${GREEN}Directory structure created successfully!${NC}"
echo "Next steps:"
echo "1. Initialize git: git init"
echo "2. Add remote: git remote add origin https://github.com/renegadesamuri/geotype.git"
echo "3. Copy source files into respective directories"
echo "4. Run: npm install"
echo "5. Run: npm run build"
