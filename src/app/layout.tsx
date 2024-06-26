"use client";

import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import NavBar from "@/components/global/NavBar";
import Sidebar from "@/components/global/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { createWeb3Modal } from "@web3modal/wagmi/react";

import { WagmiProvider } from "wagmi";
import { Metadata } from "next";
import { WagmaMetaData } from "@/types";
import {
  arbitrum,
  avalanche,
  bsc,
  fantom,
  gnosis,
  mainnet,
  optimism,
  polygon,
  sepolia,
  shardeumSphinx,
} from "wagmi/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";


const inter = Inter({ subsets: ["latin"] });

// 1. Get projectID at https://cloud.walletconnect.com

const projectId =
  process.env.NEXT_PUBLIC_PROJECT_ID || "";
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_ClIENT_ID || "";

const metadata: Metadata = {
  title: "ChainTube",
  description: "A decentralized live streaming platform",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const metadataWagmi: WagmaMetaData = {
  name: "ChainTube",
  description: "A decentralized live streaming platform",
  url: "https://ChainTube.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, sepolia] as const;

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: metadataWagmi,
});

createWeb3Modal({
  wagmiConfig: wagmiConfig,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

// 0. Setup queryClient
const queryClient = new QueryClient();


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ThirdwebProvider
          clientId={clientId} // You can get a client id from dashboard settings
          activeChain="sepolia"
        >
          <html lang="en">
            <head>
              <link rel="icon" href="images/favicon.ico" sizes="any" />
              <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon-32x32.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon-16x16.png"
              />
              <link rel="manifest" href="/site.webmanifest" />
              <title>Chain Tube</title>
            </head>
            <body className={inter.className}>
              <ThemeProvider>
                {/* Navbar */}
                <NavBar />
                <div className="w-full flex h-full pt-20">
                  {/* Left Sidebar */}
                  <Sidebar className="w-72 bg-customLightPurple dark:bg-customPurple-foreground hidden lg:block border-r border-gray-600 p-2 overflow-y-auto" />

                  {/* Main Body */}
                  <main className="bg-customLightPurple-foreground dark:bg-customPurple w-full h-full overflow-y-auto">
                    {children}
                  </main>
                </div>
              </ThemeProvider>
            </body>
          </html>
        </ThirdwebProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

