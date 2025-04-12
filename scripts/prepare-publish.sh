#!/bin/bash

# Exit on any error
set -e

# Clean the dist directory
echo "🧹 Cleaning dist directory..."
npm run clean

# Run tests
echo "🧪 Running tests..."
npm test

# Build the package
echo "🔨 Building package..."
npm run build

# Pack the package to verify contents
echo "📦 Verifying package contents..."
npm pack --dry-run

echo "✅ Package is ready for publishing!"
echo ""
echo "To publish, run one of these commands:"
echo "📢 For beta release: npm run publish:beta"
echo "📢 For production release: npm run publish:public"
