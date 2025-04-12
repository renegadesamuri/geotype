# Setting Up Geotype on macOS

## Prerequisites Installation

1. **Install Homebrew** (if not installed):
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. **Install Git** (if not installed):
```bash
# Check if Git is installed
git --version

# If not installed, install with Homebrew
brew install git
```

3. **Install Node.js and npm** (if not installed):
```bash
# Check if Node.js is installed
node --version

# If not installed, install with Homebrew
brew install node
```

## Project Setup

1. **Open Terminal**
   - Press `Command (⌘) + Space`
   - Type "Terminal"
   - Press `Enter`

2. **Navigate to Documents** (or your preferred location):
```bash
cd ~/Documents
```

3. **Clone the Repository**:
```bash
git clone https://github.com/renegadesamuri/geotype.git
```

4. **Enter Project Directory**:
```bash
cd geotype
```

5. **Install Dependencies**:
```bash
npm install
```

6. **Build the Project**:
```bash
npm run build
```

7. **Login to npm**:
```bash
npm login
# Enter your credentials:
# Username: renegadesamuri
# Password: your-password
# Email: your-email
```

8. **Publish to npm**:
```bash
npm run publish:public
```

## Troubleshooting

### Common macOS Issues:

1. **"command not found: git"**
```bash
brew install git
```

2. **"command not found: node" or "command not found: npm"**
```bash
brew install node
```

3. **Permission Issues**
```bash
# If you get EACCES errors with npm:
sudo chown -R $USER:staff ~/.npm
sudo chown -R $USER:staff ~/.config
```

4. **Homebrew Installation Issues**
```bash
# If Homebrew installation fails:
xcode-select --install
# Then try installing Homebrew again
```

### Useful Mac Terminal Commands:

- `pwd` - Show current directory
- `ls` - List files
- `cd ..` - Go up one directory
- `clear` - Clear terminal screen
- `Command + K` - Clear terminal screen (keyboard shortcut)
- `Control + C` - Stop any running command

### Need Help?

- Open a new issue: https://github.com/renegadesamuri/geotype/issues
- Check installation logs: `~/Library/Logs/Homebrew/`
- Check npm logs: `~/.npm/_logs/`
