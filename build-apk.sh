#!/bin/bash

echo "🔨 Building HouseBuddy APK..."
echo "================================"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Configure EAS (if not logged in, will prompt)
echo "🔑 Checking EAS authentication..."
eas login || echo "Please run 'eas login' first"

# Build Android APK (APK format, no need for .aab)
echo "🏗️ Building APK with EAS..."
eas build -p android --profile preview --non-interactive

echo "================================"
echo "✅ Build complete! Check https://expo.dev/builds"
