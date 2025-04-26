# GameOracle - Game Identification and Analysis Platform

## Overview
GameOracle is a React Native mobile application built with Expo that provides game identification and analysis services. The app integrates with multiple APIs including IGDB and Google's Gemini AI to deliver comprehensive game information and insights.

## Technical Stack

### Core Technologies
- **Framework**: React Native (v0.76.9) with Expo (v52.0.42)
- **Language**: TypeScript
- **State Management**: React Context API
- **Navigation**: Expo Router
- **UI Components**: React Native Paper, Expo Vector Icons
- **Backend**: Firebase (Firestore)

### Key Dependencies
- **@google/generative-ai**: For AI-powered game analysis
- **@react-native-firebase/firestore**: For real-time database operations
- **expo-camera**: For image capture capabilities
- **expo-av**: For audio/video processing
- **formik & yup**: For form handling and validation
- **react-native-reanimated**: For smooth animations
- **react-native-webview**: For web content integration

## Project Structure

```
my-app/
├── app/                    # Main application code
│   ├── (app)/             # App screens and components
│   ├── services/          # Service layer
│   │   ├── API/          # API integrations
│   │   │   ├── igdbApi.ts
│   │   │   ├── APIHandler.ts
│   │   │   └── GemniHandler.ts
│   │   └── identification/ # Game identification services
│   │       ├── blackboard.ts
│   │       ├── experts/
│   │       └── ResultsAggregator.ts
│   ├── _layout.tsx        # Root layout component
│   ├── index.tsx          # Entry point
│   ├── login.tsx          # Authentication
│   └── registration.tsx   # User registration
├── assets/                # Static assets
├── context/              # Context providers
├── constants/            # App constants
└── scripts/              # Build and utility scripts
```

## Features

### 1. Game Identification
- Image-based game recognition
- Multi-expert analysis system
- Results aggregation and scoring
- Blackboard pattern implementation

### 2. API Integrations
- **IGDB API**: Game database integration
- **Gemini AI**: Advanced game analysis
- **Firebase**: User authentication and data storage

### 3. User Interface
- Modern, responsive design
- Smooth animations and transitions
- Form validation and error handling
- Secure authentication flow

## Development Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation
```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd my-app

# Install dependencies
npm install

# Start the development server
npm start
```

### Environment Setup
Create a `.env` file in the root directory with the following variables:
```
EXPO_PUBLIC_API_KEY=your_api_key
EXPO_PUBLIC_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_PROJECT_ID=your_project_id
EXPO_PUBLIC_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_APP_ID=your_app_id
EXPO_PUBLIC_MEASUREMENT_ID=your_measurement_id
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_key
```

## Building for Production

### Android APK
```bash
# Prebuild native code
npx expo prebuild -p android

# Build APK
npx eas build --platform android --profile preview
```

### iOS
```bash
# Prebuild native code
npx expo prebuild -p ios

# Build IPA
npx eas build --platform ios --profile preview
```

## Testing
```bash
# Run tests
npm test

# Run linter
npm run lint
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

