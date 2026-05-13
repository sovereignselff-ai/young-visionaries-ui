import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  Store,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TutorCommandCenter } from "@/components/tutor-command-center";
import { StudentPortal } from "@/components/student-portal";
import { ShopWrapper } from "@/components/shop-wrapper";
import { LoginPage } from "@/components/login-page";
import { useTheme } from "@/components/theme-provider";
import { AuthProvider, useAuth } from "@/contexts/auth-context";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </Button>
  );
}

function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Role-based navigation items
  const navItems = user?.role === "admin"
    ? [
        { path: "/admin", label: "Tutor Command Center", icon: LayoutDashboard },
        { path: "/student", label: "Student Portal", icon: GraduationCap },
        { path: "/shop", label: "Homeschool Shop", icon: Store },
      ]
    : [
        { path: "/student", label: "Student Portal", icon: GraduationCap },
      ];

  // Role-based profile display
  const profileDisplay = user?.role === "admin"
    ? {
        name: "Anna Pierre",
        role: "Admin",
        initials: "AP",
      }
    : {
        name: "Olivier",
        role: `${user?.grade} Grade`,
        initials: "OL",
      };

  return (
    <Sidebar>
      <SidebarHeader className="p-3">
        <div className="flex items-center gap-3">
          <img
            src="/81EA8C97-52C0-4868-B1B4-22CBF0244BFF.png"
            alt="Young Visionaries Logo"
            className="h-10 w-auto object-contain"
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-sidebar-foreground leading-tight">
              Young Visionaries
            </span>
            <span className="text-xs font-semibold text-sidebar-primary leading-tight">
              Future Readiness
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                  >
                    <a href={item.path} className="cursor-pointer">
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center gap-2 flex-1">
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                {profileDisplay.initials}
              </AvatarFallback>
            </Avatar>
            <div className="text-xs">
              <div className="font-semibold text-sidebar-foreground">
                {profileDisplay.name}
              </div>
              <div className="text-sidebar-foreground/60">{profileDisplay.role}</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={handleLogout}
            title="Sign out"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

function ProtectedAdminRoute() {
  const { user } = useAuth();

  if (user?.role === "student") {
    return <Navigate to="/student" replace />;
  }

  return <TutorCommandCenter />;
}


function MainLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-6">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/admin" element={<ProtectedAdminRoute />} />
            <Route path="/student" element={<StudentPortal student="olivier" />} />
            <Route
              path="*"
              element={<Navigate to={user?.role === "admin" ? "/admin" : "/student"} replace />}
            />
          </Routes>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/shop" element={<ShopWrapper />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
