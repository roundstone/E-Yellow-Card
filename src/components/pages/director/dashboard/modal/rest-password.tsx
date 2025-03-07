import React from "react";
import ChangePasswordForm from "../../forms/change-password-form";

export default function ResetPassword({ onClose }: { onClose: () => void }) {
  return (
    <div className="-6">
      <h2 className="text-lg font-semibold text-center">Reset Your Password</h2>
      <p className="text-sm text-gray-500 text-center">
        Create a new password to secure your account.
      </p>

      <div className="mt-3 w-full">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
