
import React, { useState, useEffect } from "react";
import { 
  DollarSign, 
  Wrench, 
  Calendar, 
  AlertCircle,
  TrendingUp,
  ChevronRight,
  HomeIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import StatsCard from "@/components/StatsCard";
import ChartCard from "@/components/ChartCard";
import InfoCard from "@/components/InfoCard";
import { 
  statsData, 
  financialChartData, 
  maintenanceChartData, 
  spaceUsageChartData, 
  defaultRateChartData,
  maintenances,
  reservations,
  properties
} from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const getStatusColor = (status: string) => {
  switch (status) {
    case "1": return "bg-amber-500";
    case "2": return "bg-blue-500";
    case "3": return "bg-green-500";
    case "4": return "bg-red-500";
    default: return "bg-gray-500";
  }
};

const getReservationStatusColor = (status: "pending" | "approved" | "rejected") => {
  switch (status) {
    case "pending": return "bg-amber-500";
    case "approved": return "bg-green-500";
    case "rejected": return "bg-red-500";
    default: return "bg-gray-500";
  }
};

const Dashboard: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState("month");
  const [selectedProperty, setSelectedProperty] = useState(properties[0].id);
  const [userRole, setUserRole] = useState<"manager" | "resident" | "admin">("resident");

  useEffect(() => {
    // Get user role from localStorage
    const role = localStorage.getItem("userRole") as "manager" | "resident" | "admin";
    setUserRole(role || "resident");
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Dashboard do Síndico
  const ManagerDashboard = () => (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard do Síndico</h1>
          <p className="text-muted-foreground">Bem-vindo ao painel de controle</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Selecionar propriedade" />
            </SelectTrigger>
            <SelectContent>
              {properties.map(property => (
                <SelectItem key={property.id} value={property.id}>
                  {property.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Semana</SelectItem>
              <SelectItem value="month">Mês</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Saldo Atual"
          value={formatCurrency(statsData.financial.balance)}
          icon={<DollarSign className="h-10 w-10 text-condo-blue" />}
          description="vs mês anterior"
          trend={{ value: 5.2, isPositive: true }}
          variant="blue"
        />
        <StatsCard 
          title="Taxa de Inadimplência"
          value={`${statsData.financial.defaultRate}%`}
          icon={<AlertCircle className="h-10 w-10 text-amber-500" />}
          description="vs mês anterior"
          trend={{ value: 1.5, isPositive: true }}
          variant="orange"
        />
        <StatsCard 
          title="Manutenções"
          value={statsData.maintenance.pending}
          icon={<Wrench className="h-10 w-10 text-red-500" />}
          description="pendentes"
          variant="red"
        />
        <StatsCard 
          title="Reservas Próximas"
          value={statsData.reservations.pending}
          icon={<Calendar className="h-10 w-10 text-green-500" />}
          description="aguardando aprovação"
          variant="green"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard
          title="Visão Financeira"
          data={financialChartData}
          type="line"
          description="Comparativo entre receitas e despesas"
        />
        <ChartCard
          title="Evolução da Inadimplência"
          data={defaultRateChartData}
          type="area"
          description="Percentual de inadimplência ao longo do tempo"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard
          title="Manutenções por Categoria"
          data={maintenanceChartData}
          type="pie"
        />
        <ChartCard
          title="Uso de Espaços Comuns"
          data={spaceUsageChartData}
          type="bar"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <InfoCard 
          title="Manutenções Recentes" 
          action={{ 
            label: "Ver todas", 
            onClick: () => console.log("Ver todas as manutenções") 
          }}
        >
          <div className="space-y-4">
            {maintenances
              .filter(m => m.propertyId === selectedProperty)
              .slice(0, 4)
              .map(maintenance => (
                <Card key={maintenance.id} className="p-4 hover:bg-muted/50 cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${getStatusColor(maintenance.statusId)}`}></div>
                        <h3 className="font-medium">{maintenance.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{maintenance.description.substring(0, 60)}...</p>
                      <div className="text-xs text-muted-foreground mt-1">
                        {maintenance.statusId === "1" && "Pendente"}
                        {maintenance.statusId === "2" && `Em andamento · ${maintenance.assignedTo}`}
                        {maintenance.statusId === "3" && `Concluído · ${formatCurrency(maintenance.cost || 0)}`}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Card>
              ))}
          </div>
        </InfoCard>

        <InfoCard 
          title="Próximas Reservas" 
          action={{ 
            label: "Ver todas", 
            onClick: () => console.log("Ver todas as reservas") 
          }}
        >
          <div className="space-y-4">
            {reservations
              .filter(r => new Date(r.startTime) >= new Date())
              .slice(0, 4)
              .map(reservation => (
                <Card key={reservation.id} className="p-4 hover:bg-muted/50 cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${getReservationStatusColor(reservation.status)}`}></div>
                        <h3 className="font-medium">
                          {reservation.commonAreaId === "1" && "Salão de Festas"}
                          {reservation.commonAreaId === "2" && "Churrasqueira"}
                          {reservation.commonAreaId === "3" && "Academia"}
                          {reservation.commonAreaId === "4" && "Piscina"}
                        </h3>
                        <Badge variant="outline" className="ml-1">
                          {reservation.status === "pending" && "Pendente"}
                          {reservation.status === "approved" && "Aprovado"}
                          {reservation.status === "rejected" && "Recusado"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>
                            {reservation.residentId === "1" ? "CO" : 
                             reservation.residentId === "3" ? "RS" : "FL"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">
                          {reservation.residentId === "1" ? "Carlos Oliveira" : 
                           reservation.residentId === "3" ? "Ricardo Santos" : "Fernanda Lima"}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        {format(new Date(reservation.startTime), "dd 'de' MMMM', às' HH:mm", { locale: ptBR })}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Card>
              ))}
          </div>
        </InfoCard>
      </div>

      <div className="bg-muted/30 border border-border rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-condo-blue" />
              Insights & Sugestões
            </h3>
            <p className="text-muted-foreground">Baseados na análise dos dados do seu condomínio</p>
          </div>
          <Button variant="outline" size="sm">Atualizar</Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <Card className="p-4 bg-amber-50 border-amber-200">
            <h4 className="font-medium">Aumento nos gastos com água</h4>
            <p className="text-sm mt-1">Os gastos com água aumentaram 15% em relação à média dos últimos 3 meses. Verificar possíveis vazamentos.</p>
          </Card>
          <Card className="p-4 bg-green-50 border-green-200">
            <h4 className="font-medium">Salão de festas com alta ocupação</h4>
            <p className="text-sm mt-1">O salão de festas está com 95% de ocupação nos fins de semana. Considere revisar as regras de reserva.</p>
          </Card>
          <Card className="p-4 bg-blue-50 border-blue-200">
            <h4 className="font-medium">Redução na inadimplência</h4>
            <p className="text-sm mt-1">A taxa de inadimplência reduziu 3.5% após as novas medidas de cobrança implementadas no mês passado.</p>
          </Card>
        </div>
      </div>
    </div>
  );

  // Dashboard do Morador
  const ResidentDashboard = () => (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Olá, Morador</h1>
          <p className="text-muted-foreground">Bem-vindo ao seu painel</p>
        </div>
        
        <Button variant="outline" className="flex items-center gap-2">
          <HomeIcon className="h-4 w-4" />
          <span>Apto 303, Bloco B</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard 
          title="Próximo Vencimento"
          value={formatCurrency(550)}
          icon={<DollarSign className="h-10 w-10 text-condo-blue" />}
          description="Taxa de condomínio - 10/06/2025"
          variant="blue"
        />
        <StatsCard 
          title="Solicitações"
          value="2"
          icon={<Wrench className="h-10 w-10 text-amber-500" />}
          description="manutenções em andamento"
          variant="orange"
        />
        <StatsCard 
          title="Próximas Reservas"
          value="1"
          icon={<Calendar className="h-10 w-10 text-green-500" />}
          description="salão de festas - 15/06/2025"
          variant="green"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <InfoCard 
          title="Seus Pagamentos" 
          action={{ 
            label: "Ver todos", 
            onClick: () => console.log("Ver todos os pagamentos") 
          }}
        >
          <div className="space-y-4">
            <Card className="p-4 bg-red-50 border-red-200">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <h3 className="font-medium">Taxa de Condomínio - Maio/2025</h3>
                  </div>
                  <p className="text-sm mt-1">Vencimento: 10/05/2025</p>
                  <p className="font-medium mt-1">{formatCurrency(550)}</p>
                </div>
                <Badge variant="destructive">Vencido</Badge>
              </div>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="w-full">Gerar 2ª Via</Button>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                    <h3 className="font-medium">Taxa de Condomínio - Junho/2025</h3>
                  </div>
                  <p className="text-sm mt-1">Vencimento: 10/06/2025</p>
                  <p className="font-medium mt-1">{formatCurrency(550)}</p>
                </div>
                <Badge variant="outline">A vencer</Badge>
              </div>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="w-full">Visualizar Boleto</Button>
              </div>
            </Card>
          </div>
        </InfoCard>

        <InfoCard 
          title="Suas Manutenções" 
          action={{ 
            label: "Solicitar Nova", 
            onClick: () => console.log("Solicitar nova manutenção") 
          }}
        >
          <div className="space-y-4">
            <Card className="p-4 hover:bg-muted/50 cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <h3 className="font-medium">Vazamento na cozinha</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Solicitado em: 28/04/2025</p>
                  <div className="mt-1">
                    <Badge variant="outline">Em andamento</Badge>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Card>
            
            <Card className="p-4 hover:bg-muted/50 cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <h3 className="font-medium">Problema elétrico</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Solicitado em: 15/05/2025</p>
                  <div className="mt-1">
                    <Badge variant="outline">Em andamento</Badge>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Card>
          </div>
        </InfoCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <InfoCard 
          title="Reservar Espaços" 
          action={{ 
            label: "Ver Calendário Completo", 
            onClick: () => console.log("Ver calendário completo") 
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-4 hover:bg-muted/50 cursor-pointer flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Salão de Festas</h3>
              <p className="text-sm text-muted-foreground mt-1">Capacidade: 50 pessoas</p>
              <Button variant="outline" size="sm" className="mt-3 w-full">Reservar</Button>
            </Card>
            
            <Card className="p-4 hover:bg-muted/50 cursor-pointer flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Churrasqueira</h3>
              <p className="text-sm text-muted-foreground mt-1">Capacidade: 20 pessoas</p>
              <Button variant="outline" size="sm" className="mt-3 w-full">Reservar</Button>
            </Card>
          </div>
        </InfoCard>

        <InfoCard 
          title="Comunicados Recentes" 
          action={{ 
            label: "Ver Todos", 
            onClick: () => console.log("Ver todos os comunicados") 
          }}
        >
          <div className="space-y-4">
            <Card className="p-4 hover:bg-muted/50 cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Manutenção na Piscina</h3>
                  <p className="text-sm text-muted-foreground mt-1">A piscina ficará fechada para manutenção entre os dias 10 e 15 de junho.</p>
                  <p className="text-xs text-muted-foreground mt-2">Publicado em: 20/05/2025</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Card>
            
            <Card className="p-4 hover:bg-muted/50 cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Assembleia Geral</h3>
                  <p className="text-sm text-muted-foreground mt-1">Comunicamos a todos que haverá Assembleia Geral no dia 25/06/2025 às 19h no Salão de Festas.</p>
                  <p className="text-xs text-muted-foreground mt-2">Publicado em: 15/05/2025</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Card>
          </div>
        </InfoCard>
      </div>
    </div>
  );

  return userRole === "manager" ? <ManagerDashboard /> : <ResidentDashboard />;
};

export default Dashboard;
