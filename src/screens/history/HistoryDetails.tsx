import DashboardHeader from "@/components/common/DashboardHeader";
import MainProductDetails from "@/components/common/MainProductDetails";
import { useNavigate } from "react-router-dom";

const HistoryDetailsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-screen safe-top safe-bottom h-dvh overflow-y-auto overscroll-contain bg-background px-4">
      <DashboardHeader
        headerTitle="Product details"
        showBackButton
        onBack={() => navigate("/history")}
      />
      <div className="pb-4">
        <MainProductDetails />
      </div>
    </div>
  );
};

export default HistoryDetailsPage;
