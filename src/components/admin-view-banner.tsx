import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminViewBanner() {
  const navigate = useNavigate();
  const adminViewData = sessionStorage.getItem("adminViewStudent");

  if (!adminViewData) return null;

  const handleReturn = () => {
    sessionStorage.removeItem("adminViewStudent");
    navigate("/admin");
  };

  return (
    <div className="bg-accent text-accent-foreground px-6 py-3 flex items-center justify-between gap-4 border-b border-accent/20">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">
          Admin View: You are currently viewing Olivier's portal.
        </span>
      </div>
      <Button
        onClick={handleReturn}
        variant="ghost"
        size="sm"
        className="gap-2 h-8 px-3 text-accent-foreground hover:bg-accent/80"
      >
        Return to Command Center
        <X className="size-4" />
      </Button>
    </div>
  );
}
