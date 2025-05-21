
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  LayoutDashboard, 
  Home, 
  Users, 
  Settings, 
  Calendar, 
  Wrench, 
  DollarSign,
  MessageSquare,
  Menu,
  X,
  Bell,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<"manager" | "resident" | "admin">("resident");
  const [userName, setUserName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get user role from localStorage
    const role = localStorage.getItem("userRole") as "manager" | "resident" | "admin";
    setUserRole(role || "resident");
    
    // Set user name based on role for demo
    if (role === "manager") {
      setUserName("Maria Silva");
    } else if (role === "resident") {
      setUserName("João Pereira");
    } else {
      setUserName("Usuário");
    }
  }, []);

  // Diferentes menus para síndico e morador
  const managerNavItems = [
    { 
      path: "/", 
      label: "Dashboard", 
      icon: <LayoutDashboard className="w-5 h-5" /> 
    },
    { 
      path: "/properties", 
      label: "Propriedades", 
      icon: <Home className="w-5 h-5" /> 
    },
    { 
      path: "/residents", 
      label: "Moradores", 
      icon: <Users className="w-5 h-5" /> 
    },
    { 
      path: "/finances", 
      label: "Financeiro", 
      icon: <DollarSign className="w-5 h-5" /> 
    },
    { 
      path: "/maintenance", 
      label: "Manutenções", 
      icon: <Wrench className="w-5 h-5" /> 
    },
    { 
      path: "/reservations", 
      label: "Reservas", 
      icon: <Calendar className="w-5 h-5" /> 
    },
    { 
      path: "/messages", 
      label: "Mensagens", 
      icon: <MessageSquare className="w-5 h-5" /> 
    },
    { 
      path: "/settings", 
      label: "Configurações", 
      icon: <Settings className="w-5 h-5" /> 
    },
  ];

  const residentNavItems = [
    { 
      path: "/", 
      label: "Dashboard", 
      icon: <LayoutDashboard className="w-5 h-5" /> 
    },
    { 
      path: "/my-unit", 
      label: "Meu Apartamento", 
      icon: <Home className="w-5 h-5" /> 
    },
    { 
      path: "/finances", 
      label: "Meus Pagamentos", 
      icon: <DollarSign className="w-5 h-5" /> 
    },
    { 
      path: "/maintenance", 
      label: "Solicitar Manutenção", 
      icon: <Wrench className="w-5 h-5" /> 
    },
    { 
      path: "/reservations", 
      label: "Reservar Espaços", 
      icon: <Calendar className="w-5 h-5" /> 
    },
    { 
      path: "/messages", 
      label: "Mensagens", 
      icon: <MessageSquare className="w-5 h-5" /> 
    },
  ];

  const navItems = userRole === "manager" ? managerNavItems : residentNavItems;

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    
    toast({
      title: "Logout realizado com sucesso",
      description: "Redirecionando para a página de login..."
    });
    
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar for desktop */}
      <div 
        className={`bg-sidebar hidden md:flex flex-col border-r border-sidebar-border transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          {!collapsed && <h1 className="font-bold text-xl text-sidebar-foreground">CondoManager</h1>}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </Button>
        </div>
        
        <nav className="flex-1 py-4 px-3">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
                >
                  {item.icon}
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          {collapsed ? (
            <Avatar>
              <AvatarFallback>{userName.substring(0, 2)}</AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{userName.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sidebar-foreground">{userName}</p>
                <p className="text-xs text-sidebar-foreground/80">
                  {userRole === "manager" ? "Síndico" : userRole === "admin" ? "Administrador" : "Morador"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
        onClick={toggleMobileMenu}
      />

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-sidebar transform transition-transform duration-300 z-50 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <h1 className="font-bold text-xl text-sidebar-foreground">CondoManager</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu}
            className="text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <nav className="py-4 px-3">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
                  onClick={toggleMobileMenu}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{userName.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sidebar-foreground">{userName}</p>
              <p className="text-xs text-sidebar-foreground/80">
                {userRole === "manager" ? "Síndico" : userRole === "admin" ? "Administrador" : "Morador"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-border h-16 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h2 className="text-lg font-medium hidden sm:block">
              {navItems.find(item => item.path === location.pathname)?.label || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-60 overflow-auto">
                  <div className="p-3 border-b hover:bg-muted cursor-pointer">
                    <p className="font-medium">Nova reserva pendente</p>
                    <p className="text-sm text-muted-foreground">Salão de Festas para 25/05/2025</p>
                    <p className="text-xs text-muted-foreground mt-1">Há 2 horas</p>
                  </div>
                  <div className="p-3 border-b hover:bg-muted cursor-pointer">
                    <p className="font-medium">Manutenção concluída</p>
                    <p className="text-sm text-muted-foreground">Reparo na piscina foi finalizado</p>
                    <p className="text-xs text-muted-foreground mt-1">Há 5 horas</p>
                  </div>
                </div>
                <DropdownMenuItem className="cursor-pointer justify-center text-primary">
                  Ver todas as notificações
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full" size="icon">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{userName.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuItem className="cursor-pointer">Perfil</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Preferências</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
