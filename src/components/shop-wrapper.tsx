import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HomeschoolShop } from "@/components/homeschool-shop";
import { useAuth } from "@/contexts/auth-context";

export function ShopWrapper() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleReturn = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else if (user?.role === "student") {
      navigate("/student");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="px-6 py-4 flex items-center gap-4">
          <Button
            onClick={handleReturn}
            variant="ghost"
            size="sm"
            className="gap-2 text-foreground hover:bg-muted"
          >
            <ArrowLeft className="size-4" />
            Return to Dashboard
          </Button>
        </div>
      </header>
      <main>
        <HomeschoolShop />
      </main>
    </div>
  );
}
