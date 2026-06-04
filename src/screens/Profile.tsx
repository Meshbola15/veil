import DashboardNavigation from '@/components/common/DashboardNavigation';
import React from "react";

type Props = {};

const Profile = (props: Props) => {
  return (
    <div className="mobile-screen h-[100dvh] overflow-hidden bg-background">
      <div className="safe-top safe-bottom h-full overflow-y-auto px-5 py-8">
        <h1 className="font-fraunces text-2xl font-semibold text-text-primary">
          Profile
        </h1>
      </div>
      <DashboardNavigation />
    </div>
  );
};

export default Profile;
