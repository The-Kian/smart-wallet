# Smart Wallet

**🌐 Live Web Demo:** [zingy-marigold-82763f.netlify.app](http://zingy-marigold-82763f.netlify.app/)

---

## 🎯 Scope & Features

The brief allowed for scoping decisions, but I opted to implement all **five** requested features end-to-end while maintaining a strict focus on clean architecture and robust state management.

**Completed:**

1. **Google Sign-In:** Complete OAuth 2.0 implementation with persistence. Handles both Native (via `@react-native-google-signin`) and Web (via `expo-auth-session`).
2. **Main Wallet:** Displays a seeded running balance (£500.00) and a transaction ledger. Includes strict business logic to prevent the balance from ever dropping below zero.
3. **Savings Pots:** Users can create named pots, transfer funds between the main wallet and pots, and delete pots (returning funds to the wallet).
4. **Voucher Shop:** Users can purchase preset voucher denominations. The system deducts the face value from the main wallet and generates a unique, formatted voucher code.
5. **Loyalty Points:** A fully integrated rewards loop. Voucher purchases automatically yield loyalty points (1 point per £1 spent), which can be redeemed in multiples of 100 for wallet credit.

**Trade-offs & Decisions:**

- **List Rendering (FlatList vs. FlashList):** I chose to use React Native's standard `FlatList` rather than introducing Shopify's `FlashList`. While `FlashList` offers superior view recycling for complex screens, the datasets in this application (a handful of savings pots and recent transactions) are relatively small. Sticking with `FlatList` keeps the dependency tree lean and avoids the overhead of additional native modules for this specific task.
- **Universal Rehydration Gating:** To completely prevent a "Flash of Unhydrated State" (FOUC)—where default seeded balances or logged-out UI structures are briefly rendered before disk rehydration finishes—the Root Layout blocks the main application mounting screen until the Auth, Wallet, and Pots stores are fully loaded from `AsyncStorage`.
- **Local Persistence:** As per the brief, no external backend is used. All state mutations and mathematical integrity checks (preventing overdrawing, points math) are handled strictly on the client side via Zustand and persisted locally.

---

## 🛠 Tech Stack & Architecture

- **Framework:** React Native / Expo (SDK 56) with Expo Router for navigation.
- **Language:** TypeScript for strict type safety across state and UI components.
- **State Management:** **Zustand**. Chosen for its lightweight, boilerplate-free approach to global state compared to Redux Toolkit.
- **Authentication:** `@react-native-google-signin/google-signin` for native mobile builds, and `expo-auth-session` for the web target.
- **Icons & Web Compatibility:** `@react-native-vector-icons` implemented to ensure optimal bundle sizes and prevent common Expo Web missing-font bugs.
- **Package Manager:** `pnpm`

---

## 🚀 Setup Instructions

1. Clone the repository.
2. Run `pnpm install` to install dependencies.
3. **Environment Setup:** Copy the `.env.example` file to `.env` and add your Google OAuth Client IDs (or use .env file sent with the repo link).
4. Run `pnpm start` to open the Expo development server.

**Google OAuth Configuration:**
To run the authentication flow locally, you will need to provide Google Client IDs for the respective platforms.

1. Create a free project in the Google Cloud Console.
2. Configure the OAuth consent screen.
3. Create OAuth client IDs for **Web**, **iOS**, and **Android**.
4. Paste these IDs into your `.env` file matching the keys in `.env.example`.

---

## 🔮 What I'd do with more time

If I had additional time:
i would implement a CI/CD system to check for linting, testing and to deploy more easily.
I would set up e2e tests
