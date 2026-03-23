# HouseBuddy - Mobile Application

HouseBuddy is a premium React Native (Expo) mobile application for finding trusted local service providers.

## Project Structure

```
HouseBuddy/
├── src/
│   ├── screens/          # All app screens
│   │   ├── SplashScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── SearchScreen.tsx
│   │   ├── WorkerProfileScreen.tsx
│   │   ├── WriteReviewScreen.tsx
│   │   ├── BookingsScreen.tsx
│   │   ├── NotificationsScreen.tsx
│   │   ├── SavedWorkersScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── WorkerDashboardScreen.tsx
│   ├── components/       # Reusable UI components
│   │   ├── WorkerCard.tsx
│   │   ├── StarRating.tsx
│   │   ├── TrustBadge.tsx
│   │   ├── CategoryCard.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Button.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Gallery.tsx
│   │   └── ...
│   ├── navigation/      # React Navigation setup
│   │   └── AppNavigator.tsx
│   ├── context/         # React Context for state
│   │   └── AppContext.tsx
│   ├── services/        # Firebase & API services
│   ├── utils/           # Helper functions
│   ├── constants/        # Theme, colors, mock data
│   └── types/            # TypeScript interfaces
├── App.tsx
└── package.json
```

## Key Features

1. **Splash Screen** - Animated logo with smooth fade transitions
2. **Onboarding** - 4-screen introduction with pagination
3. **Home** - Search, categories, top-rated workers, recent additions
4. **Search** - Filter by category, sort by rating/distance/reviews
5. **Worker Profiles** - Trust scores, reviews, work photos, contact
6. **Write Reviews** - Star rating input with animations
7. **Bookings** - View upcoming/completed bookings
8. **Saved Workers** - Bookmark favorite professionals
9. **Notifications** - In-app notification center
10. **Profile** - User settings and account management
11. **Worker Dashboard** - For service providers to manage their business

## Design System

- iOS-style UI with rounded cards, soft shadows
- Airbnb/Apple-inspired minimal aesthetic
- Trust Score system (0-100) based on ratings and reviews
- Category-based service filtering
- Skeleton loading states
- Empty state handling
- Pull-to-refresh functionality

## To Run

```bash
cd HouseBuddy
npm install
npx expo start
```

## Firebase Setup

Replace the placeholder config in `src/services/firebase.ts` with your actual Firebase credentials.
