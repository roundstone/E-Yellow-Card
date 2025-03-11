import AdminStateListUpload from "@/components/pages/admin/dashboard/state-list";
import AdminStateList from "@/components/pages/admin/dashboard/state-list-";
import React from "react";

type Props = {};

const SuperadminStateListPage = (props: Props) => {
  return (
    <div>
      <AdminStateListUpload />
      <AdminStateList />
    </div>
  );
};

export default SuperadminStateListPage;
