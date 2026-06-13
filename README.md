# aslan. Smart Wallet

A mobile-first wallet application built with React Native and Expo for the Aslan Engineering take-home task. This app allows users to authenticate via Google, view their main wallet balance, and manage dedicated savings pots.

**🌐 Live Web Demo:** [\[Insert your Vercel/Netlify URL here\]](http://zingy-marigold-82763f.netlify.app/)

---

## 🎯 Scope & Trade-offs

The brief allowed for scoping decisions to prioritize quality over quantity. I chose to implement **three out of the five** requested features to a high standard:

**Completed:**

1. **Google Sign-In:** Complete OAuth 2.0 implementation with persistence. Handles both Native (via `@react-native-google-signin`) and Web (via `expo-auth-session`). Includes a mock-profile fallback for easy local testing.
2. **Main Wallet:** Displays a seeded running balance (£500.00) and a transaction ledger. Includes strict business logic to prevent the balance from ever dropping below zero.
3. **Savings Pots:** Users can create named pots, transfer funds between the main wallet and pots, and delete pots (returning funds to the wallet).

**Omitted (Voucher Shop & Loyalty Points):**

- **Reasoning:** I opted to cut these features to dedicate more time to the core architectural setup, clean UI/UX, and robust state management. Ensuring the mathematical integrity of the wallet-to-pot transfers (e.g., preventing overdrawing, handling insufficient funds gracefully) was prioritized over adding additional features that would largely replicate similar state-mutation patterns.

---

## 🛠 Tech Stack & Architecture

- **Framework:** React Native / Expo (SDK 56) with Expo Router for navigation.
- **Language:** TypeScript for strict type safety across state and UI components.
- **State Management:** **Zustand**.
  - _Why Zustand?_ It provides a lightweight, boilerplate-free way to manage global state compared to Redux Toolkit. It integrates seamlessly with `@react-native-async-storage/async-storage` via middleware to persist the user's session, wallet balance, and pots between app launches.
- **Authentication:** `@react-native-google-signin/google-signin` for native mobile builds, and `expo-auth-session` for the web target.
- **=List Rendering (FlatList vs. FlashList):**: I chose to use React Native's standard FlatList rather than introducing Shopify's FlashList. While FlashList offers superior view recycling and progressive rendering for complex screens, the datasets in this application (a handful of savings pots and recent transactions) are very small. Sticking with FlatList keeps the dependency tree lean, avoids the overhead of additional native modules for the take-home task, and still delivers a perfectly smooth experience for this specific use case.
- **Package Manager:** `pnpm`


## What I'd do with more time
If I had an additional week to work on this project, I would focus on:

**Voucher & Loyalty Implementation:** Implement the remaining features, using a similar Zustand slice pattern to manage voucher inventory and calculate loyalty points securely.

**Comprehensive Test Coverage:** While core functions were tested, I would add comprehensive unit tests (using Jest and React Native Testing Library) specifically targeting the edge cases in the Zustand store (e.g., rapid consecutive transfers, extreme numeric values).

**Animations & Polish:** Add micro-interactions using react-native-reanimated, such as smooth layout transitions when adding or deleting a savings pot, or a number-ticker animation for the main balance.

**Backend Migration Prep:** Abstract the Zustand persistence layer behind a service interface, making it trivial to swap out AsyncStorage for real REST/GraphQL API calls in the future.
---

## 🚀 Local Setup Instructions

### Prerequisites

- Node.js installed
- `pnpm` installed (`npm install -g pnpm`)
- Expo CLI
- iOS Simulator or Android Emulator (optional, can run on Web)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd smart-wallet
   ```
