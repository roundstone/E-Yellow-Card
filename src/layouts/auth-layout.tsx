import React from "react";

interface UserAuthLayoutProps {
  children: React.ReactNode;
  hasHeader?: boolean;
}

const UserAuthLayout = ({
  children,
  hasHeader = false,
}: UserAuthLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background app-container">
      {hasHeader && (
        <header className="bg-primary text-white p-4">
          <h1 className="text-xl">Header Content</h1>
        </header>
      )}
      {children}
    </div>
  );
};

export default UserAuthLayout;
