import DashboardHeader from "@/components/common/DashboardHeader";
import MainProductDetails from "@/components/common/MainProductDetails";
import { ThreeDotsIcon } from "@/lib/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MoreOptionsModal() {
  return (
    <div className="absolute top-0 right-0 rounded-2xl bg-white p-4 shadow-card">
      <p>More Options</p>
    </div>
  );
}

const HistoryDetailsPage = () => {
  const navigate = useNavigate();
  const [isMoreOptionsModalOpen, setIsMoreOptionsModalOpen] = useState(false);

  return (
    <div className="mobile-screen h-dvh overflow-scroll safe-top safe-bottom bg-background px-2 py-4">
      <DashboardHeader
        headerTitle="History Details"
        showBackButton={true}
        rightComponents={
          <div className="relative flex items-center gap-2">
            <ThreeDotsIcon
              size={24}
              onClick={() => setIsMoreOptionsModalOpen(true)}
            />
          </div>
        }
        onBack={() => navigate("/history")}
      />

      {isMoreOptionsModalOpen && <MoreOptionsModal />}

      <MainProductDetails />
    </div>
  );
};

export default HistoryDetailsPage;
