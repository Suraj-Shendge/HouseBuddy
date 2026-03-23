# 📱 Building HouseBuddy APK

## Quick Build (Local)

### Prerequisites
1. **Node.js 18+** installed
2. **Android Studio** with SDK installed (for local builds)

### Build Commands

```bash
# 1. Install dependencies
npm install

# 2. Generate Android project
npx expo prebuild --platform android

# 3. Build debug APK
cd android && ./gradlew assembleDebug
```

The APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## EAS Build (Cloud - Recommended)

### One-Time Setup

```bash
# 1. Install EAS CLI
npm install -g eas-cli

# 2. Login to Expo
eas login

# 3. Configure the project
eas build:configure
```

### Build APK

```bash
# Build preview APK (faster)
eas build -p android --profile preview

# Or use our script
./build-apk.sh    # Mac/Linux
build-apk.bat     # Windows
```

### Get the APK
After build completes (5-15 mins):
1. Open https://expo.dev/builds
2. Download your APK
3. Install on Android device

---

## 📁 Output Files

| File | Description |
|------|-------------|
| `android/app/build/outputs/apk/debug/app-debug.apk` | Debug APK (local build) |
| `android/app/build/outputs/apk/release/app-release.apk` | Release APK |
| `android/app/build/outputs/apk/release/app-release.aab` | App Bundle (for Play Store) |

---

## 🔄 After Updates

After any code changes:

```bash
# Option 1: Local build (requires Android Studio)
npx expo prebuild --platform android
cd android && ./gradlew assembleDebug

# Option 2: EAS cloud build
eas build -p android --profile preview
```

---

## ✅ Verification

Install APK on device:
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

Or drag and drop the APK file onto your Android emulator/device.
