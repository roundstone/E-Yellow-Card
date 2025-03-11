import AuthHeader from "@/components/pages/user/header/auth-header";
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
    <div className="min-h-screen bg-background">
      {hasHeader && <AuthHeader />}
      <div className="flex flex-col  app-container">
        {children}
      </div>
    </div>
  );
};

export default UserAuthLayout;
