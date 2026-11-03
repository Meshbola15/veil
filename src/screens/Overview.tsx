import DashboardNavigation from "@/components/common/DashboardNavigation";

const Overview = () => {
  return (
    <div className="mobile-screen safe-top h-dvh overflow-y-auto bg-background px-5">
      <h1 className="py-8 font-bricolage text-2xl font-semibold text-text-primary">
        Overview
      </h1>
      <DashboardNavigation />
    </div>
  );
};

export default Overview;
