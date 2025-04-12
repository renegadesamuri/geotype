# Setting Up Geotype Locally

## Step 1: Create and Navigate to Project Directory
```bash
# First, go to your development folder (choose one):
cd ~/Documents
# or
cd ~/Development
# or
cd ~/Projects

# Create and enter the geotype directory
mkdir geotype
cd geotype
```

## Step 2: Initialize Git
```bash
# Initialize git repository
git init

# Configure git (replace with your details)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add GitHub remote
git remote add origin https://github.com/renegadesamuri/geotype.git
```

## Step 3: Copy Files
Copy all these files and directories into your geotype folder:
- src/
- dist/
- examples/
- .github/
- scripts/
- All configuration files (.gitignore, package.json, etc.)
- All documentation files (README.md, etc.)

## Step 4: Install Dependencies
```bash
# Install all dependencies
npm install
```

## Step 5: Build the Project
```bash
# Build the project
npm run build
```

## Step 6: Commit and Push to GitHub
```bash
# Add all files
git add .

# Commit
git commit -m "Initial release: Geotype - TypeScript Google Maps Service"

# Push to GitHub
git push -u origin main
```

## Step 7: Publish to npm
```bash
# Login to npm
npm login

# Verify package contents
npm run publish:check

# Publish package
npm run publish:public
```

## Directory Structure You Should Have:
```
geotype/
├── src/
│   ├── geotype.ts
│   ├── types/
│   └── __tests__/
├── dist/
│   ├── geotype.js
│   ├── geotype.d.ts
│   └── geotype.min.js
├── examples/
├── .github/
├── scripts/
├── package.json
├── tsconfig.json
└── ... (other config and doc files)
```

## Common Issues:
1. "command not found: git" -> Install Git first
2. "command not found: npm" -> Install Node.js first
3. "permission denied" -> Use sudo for npm global commands
