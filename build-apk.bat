@echo off
echo 🔨 Building HouseBuddy APK...
echo ================================

echo 📦 Installing dependencies...
call npm install

echo 🔑 Checking EAS authentication...
call npx eas login

echo 🏗️ Building APK with EAS...
call npx eas build -p android --profile preview

echo ================================
echo ✅ Build complete! Check https://expo.dev/builds
pause
