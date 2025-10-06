# 📈 Modern Crypto Dashboard (Trade-App)
This project is a functional dashboard designed to mimic a modern trading application interface, displaying live cryptocurrency data (such as Bitcoin, Ethereum, etc.).

It is built on a foundation of Vite, React, and TypeScript, utilizing Tailwind CSS and shadcn/ui for the interface. Data fetching is performed using the native Fetch API coupled with a Vite Proxy to ensure a modern, lightweight, and efficient architecture.

## ✨ Features Overview
Live Data Integration: Fetches real-time crypto prices from the FreeCryptoAPI / CoinGecko public endpoints.

Modern Tech Stack: Built with React, TypeScript, and styled using Tailwind CSS and shadcn/ui.

Lightweight API Management: Uses the native Fetch API for data retrieval, eliminating the need for bulky external libraries like Axios.

Dynamic Visualization: The Watchlist displays dynamic colors and symbolic chart representations based on the 24-hour price change.

Reactive Form Control: Features an interactive "Stock Control" section managed by React Hook Form and Zod for robust validation.

Dark Mode Design: A sleek, eye-friendly dark theme optimized for trading environments.

## 🛠️ Technologies Used
Category	Technology	Purpose
Framework	React	Component-based UI development
Build Tool	Vite	Fast development and bundling
Language	TypeScript	Type safety and enhanced developer experience
Styling	Tailwind CSS	Utility-first CSS framework
UI Library	shadcn/ui	Pre-styled, accessible UI components
Form Management	React Hook Form + Zod	Form state and schema validation
API Client	Fetch API (Native)	Zero-dependency HTTP requests

E-Tablolar'a aktar
🚀 Setup and Run
Follow these steps to get the project running on your local machine.

1. Install Dependencies
Navigate to the project's root directory and install all necessary packages:

Bash

# Navigate to your project folder
cd my-crypto-dashboard 

# Install dependencies

npm install


2. Configure API Proxy (Crucial Step!)

To bypass CORS (Cross-Origin Resource Sharing) restrictions imposed by the CoinGecko API and prevent the common TypeError: Failed to fetch, a Vite Proxy is essential for development.

Ensure your vite.config.ts file is configured as follows:

TypeScript

// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Direct all requests starting with /api to the CoinGecko endpoint
      '/api': {
        target: 'https://api.coingecko.com/api/v3',
        changeOrigin: true, // Makes the request look like it came from the target
        rewrite: (path) => path.replace(/^\/api/, ''), // Removes the '/api' prefix
      },
    },
  },
});


3. Start the Application

Once setup is complete, launch the development server:

Bash

npm run dev

The application will be accessible at the address displayed in your console, usually http://localhost:5173.

## 📂 Project Structure
The project's main components and API layer are structured as follows:

src/
├── api/
│   └── cryptoService.ts    # Data fetching logic using Fetch API
├── hooks/
│   └── useCryptoData.ts    # Custom React Hook for state management (loading, error, data)
├── components/
│   ├── Watchlist.tsx       # Main table listing component
│   ├── StockMarketList.tsx # Side panel list component
│   └── StockControl.tsx    # Buy/Sell form component
├── lib/
│   └── utils.ts            # Utility functions (cn for Tailwind merging)
└── main.tsx                # Application entry point
⚠️ Known Limitations
Symbolic Charting: The "Chart" column in the Watchlist is purely symbolic. It uses the 24-hour change to decide between a rising (green) or falling (red) SVG path, as historical data fetching was not implemented.

Rate Limiting: As a public API, CoinGecko's endpoint has rate limits. Frequent refreshing during development may temporarily block data access.

