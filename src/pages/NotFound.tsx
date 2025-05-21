
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, Home } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
      <div className="bg-primary/10 p-3 rounded-full mb-4">
        <Building2 className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl text-muted-foreground mt-2 mb-6">
        Página não encontrada
      </p>
      <p className="text-muted-foreground max-w-md mb-8">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Button asChild size="lg">
        <Link to="/" className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          Voltar para o Dashboard
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
