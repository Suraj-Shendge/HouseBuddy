# 🏠 HouseBuddy - Premium Service Provider Marketplace

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-Expo-blue?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript" />
  <img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android-green?style=flat-square" />
</p>

> A premium iOS-style mobile app that helps users find trusted local service providers (plumbers, electricians, cleaners, etc.) based on ratings, trust scores, and real work proof.

## ✨ Features

### Core Features
- 🔐 **User Authentication** - Email/password and phone-based auth
- 🏠 **Service Categories** - Plumbers, Electricians, HVAC, Painters, Cleaners, etc.
- ⭐ **Rating & Reviews** - Detailed reviews with photos
- 📊 **Trust Score** - Proprietary trust algorithm based on 10+ factors
- 📍 **Location-Based Search** - Find nearby verified professionals
- 📅 **Smart Booking** - Multi-step booking with calendar & time slots

### Booking System
- 📅 **Calendar Integration** - Visual date picker
- ⏰ **Time Slot Selection** - Morning, Afternoon, Evening slots
- 📝 **Service Customization** - Add notes, select add-ons
- 🔄 **Booking Management** - View, modify, cancel bookings
- 📜 **Booking History** - Complete transaction history

### Payments
- 💳 **Multiple Payment Methods** - Cards, UPI, Net Banking, Wallets
- 🔒 **Secure Transactions** - Razorpay integration ready
- 📱 **In-App Payments** - Seamless payment experience
- 🧾 **Invoice Generation** - Auto-generated invoices

### Communication
- 💬 **Real-Time Chat** - In-app messaging with workers
- 🔔 **Push Notifications** - Booking updates, promotions
- 📧 **Email Notifications** - Booking confirmations

### Worker Features
- 📊 **Worker Dashboard** - Manage bookings and earnings
- 📷 **Work Gallery** - Upload work photos
- ⏱️ **Availability Management** - Set online/offline status
- 📈 **Analytics** - View ratings, reviews, earnings

## 📱 Screenshots

| Splash | Onboarding | Home |
|:------:|:----------:|:----:|
| ![Splash](docs/images/splash.png) | ![Onboarding](docs/images/onboarding.png) | ![Home](docs/images/home.png) |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app (iOS/Android) or emulator

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/HouseBuddy.git
cd HouseBuddy

# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS (Mac required)
npm run ios

# Run on Android
npm run android
```

### Environment Setup

Create a `.env` file in the root directory:

```env
# Firebase Configuration
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# Razorpay (Payment Gateway)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET_KEY=your_razorpay_secret_key
```

## 🏗️ Project Structure

```
HouseBuddy/
├── App.tsx                    # App entry point
├── app.json                  # Expo configuration
├── eas.json                  # EAS Build configuration
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── BookingCard.tsx
│   │   ├── WorkerCard.tsx
│   │   ├── ChatBubble.tsx
│   │   ├── AvailabilityBadge.tsx
│   │   ├── TimeSlotPicker.tsx
│   │   └── ...
│   ├── screens/              # App screens
│   │   ├── SplashScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── SearchScreen.tsx
│   │   ├── WorkerProfileScreen.tsx
│   │   ├── MultiStepBookingScreen.tsx
│   │   ├── PaymentScreen.tsx
│   │   ├── ChatScreen.tsx
│   │   └── ...
│   ├── navigation/           # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── context/              # React Context providers
│   │   └── AppContext.tsx
│   ├── services/             # API and external services
│   │   ├── firebase.ts
│   │   └── paymentService.ts
│   ├── hooks/                # Custom React hooks
│   │   └── useTrustScore.ts
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts
│   ├── constants/            # App constants and theme
│   │   └── theme.ts
│   └── utils/                # Utility functions
│       └── helpers.ts
├── assets/                   # Images, fonts, icons
├── android/                  # Android native code
└── ios/                      # iOS native code
```

## 🎨 Design System

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#007AFF` | Buttons, links, accents |
| Secondary | `#FF9500` | Highlights, badges |
| Success | `#34C759` | Confirmations, available |
| Warning | `#FF9500` | Warnings, busy status |
| Error | `#FF3B30` | Errors, destructive actions |
| Background | `#F2F2F7` | App background |

### Typography

- **Primary Font**: System (SF Pro on iOS, Roboto on Android)
- **Heading Large**: 34px, Bold
- **Heading Medium**: 28px, Bold
- **Body**: 17px, Regular
- **Caption**: 13px, Regular

## 🔌 API Integration

### Firebase Services
- **Authentication** - Email/password, phone verification
- **Firestore** - User data, workers, bookings
- **Storage** - Profile images, work photos

### Razorpay Integration
```typescript
import { initiatePayment, verifyPayment } from './services/paymentService';

// Create order
const order = await initiatePayment({
  amount: 2500, // in paise
  currency: 'INR',
  bookingId: 'BK123456'
});

// Verify after payment
const verified = await verifyPayment(order.id, paymentId, signature);
```

## 📦 Build & Deploy

### Android (APK)
```bash
eas build -p android --profile preview
```

### iOS (IPA)
```bash
eas build -p ios --profile preview
```

### Web
```bash
exporter --platform web
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name** - [@your_twitter](https://twitter.com/your_twitter)

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) - Amazing React Native framework
- [React Navigation](https://reactnavigation.org/) - Navigation library
- [Firebase](https://firebase.google.com/) - Backend-as-a-Service
- [Razorpay](https://razorpay.com/) - Payment gateway

---

<p align="center">
  Made with ❤️ using React Native + Expo
</p>
