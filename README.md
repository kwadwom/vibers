# Welcome to your SmartPurse - Smart Financial Management App

## Overview

SmartPurse is a modern financial management application built with React Native and Expo, designed to help users track their expenses, set savings goals, and make informed financial decisions. The app provides real-time insights into spending patterns and offers smart budgeting features.

## Features

### SmartPurse
- **Expense Tracking**: Monitor daily and monthly expenses with detailed categorization
- **Income Management**: Track all income sources and view monthly trends
- **Savings Goals**: Set and track progress towards financial goals
- **Transaction History**: View detailed transaction history with search and filter capabilities

### Reports & Analytics
- **Daily Expense Analysis**: View spending patterns over the last 14 days
- **Monthly Income Overview**: Track income trends over 6-month periods
- **Category-wise Breakdown**: Understand spending patterns by category
- **Financial Insights**: Get personalized insights based on spending behavior

## Technical Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router with file-based routing
- **UI Components**: Custom components with React Native elements
- **Charts**: react-native-chart-kit for data visualization
- **State Management**: React hooks and context
- **API Integration**: RESTful API integration with fetch

## Development Setup

1. **Prerequisites**:
   ```bash
   node >= 16.0.0
   npm >= 8.0.0
   ```

2. **Installation**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm start
   ```

## Development Options

You can develop the app using:
- [Expo Development Build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

## Project Structure

```
vibers/
├── app/                   # Main application code
│   ├── (tabs)/           # Tab-based navigation
│   │   ├── smartpurse/   # SmartPurse feature
│   │   ├── credit/       # Credit management
│   │   └── index.tsx     # Home screen
├── components/           # Reusable components
├── services/            # API and other services
└── assets/              # Images and other static files
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://expo.github.io/router/docs/)
