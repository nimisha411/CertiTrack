"use client";
import "../globals.css";
import Header from "@/Components/Header";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/context/UserContext";

const Component = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>
          CertiTrack - Real-Time Certificate Monitoring & Issuance System
        </title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="CertiTrack is a real-time certificate issuance monitoring system designed for governments & local authorities to track, allocate, and optimize resources for document processing. Reduce backlogs, improve efficiency, and streamline certificate approvals."
        />
      </head>
      <body className={`antialiased`}>
        <Header />
        <Toaster />
        {children}
      </body>
    </html>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <Component>{children}</Component>
    </UserProvider>
  );
}
