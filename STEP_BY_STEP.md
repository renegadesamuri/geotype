# Setting Up Geotype - Step by Step Guide

## Prerequisites
Make sure you have:
1. Node.js installed (check with `node --version`)
2. Git installed (check with `git --version`)
3. npm account created and logged in

## Step 1: Create Project Directory
```bash
# Go to your development folder (choose one)
cd ~/Documents     # or
cd ~/Development   # or
cd ~/Projects

# Create and enter project directory
mkdir geotype
cd geotype
```

## Step 2: Initialize Git
```bash
# Initialize git repository
git init

# Configure git with your details
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add the remote repository
git remote add origin https://github.com/renegadesamuri/geotype.git
```

## Step 3: Clone the Repository
```bash
# Remove the empty directory if you created it
cd ..
rm -rf geotype

# Clone the repository
git clone https://github.com/renegadesamuri/geotype.git
cd geotype
```

## Step 4: Install Dependencies
```bash
# Install all required packages
npm install
```

## Step 5: Build the Project
```bash
# Build the TypeScript code
npm run build
```

## Step 6: Verify Setup
```bash
# Run the verification script
./scripts/verify-copy.sh
```

## Step 7: Publish to npm
```bash
# Login to npm (if not already logged in)
npm login

# Check what will be published
npm run publish:check

# Publish the package
npm run publish:public
```

## Troubleshooting

### If you get "command not found: git"
```bash
# On macOS with Homebrew
brew install git

# On Ubuntu/Debian
sudo apt-get update
sudo apt-get install git
```

### If you get "command not found: node" or "command not found: npm"
```bash
# On macOS with Homebrew
brew install node

# On Ubuntu/Debian
sudo apt-get update
sudo apt-get install nodejs npm
```

### If you get permission errors with npm
```bash
# Use sudo for global npm commands
sudo npm install -g npm@latest
```

### If build fails
1. Make sure all dependencies are installed
2. Check Node.js version (should be >=14.0.0)
3. Try removing node_modules and package-lock.json:
```bash
rm -rf node_modules package-lock.json
npm install
```
