'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from "@emotion/react";
import theme from "@/theme";
import Navbar from "./_components/Navbar/Navbar";
import Container from '@mui/material/Container'
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>

          <ThemeProvider theme={theme}>

            <Provider store={store}>
              <Toaster/>
              <Navbar />
              <Container maxWidth="xl" sx={{ pt: 10 }} >

                {children}
              </Container>
            </Provider>

          </ThemeProvider>

        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
