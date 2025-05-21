
import { 
  User, Property, Unit, Resident, Maintenance, 
  CommonArea, Reservation, FinancialTransaction,
  MaintenanceStatus, StatsData, ChartData
} from "@/types";

// Mock Users
export const currentUser: User = {
  id: "1",
  name: "Eduardo Silva",
  email: "eduardo@example.com",
  role: "manager",
  avatar: "https://i.pravatar.cc/150?img=12"
};

// Mock Properties
export const properties: Property[] = [
  {
    id: "1",
    name: "Residencial Bosque Verde",
    address: "Rua das Palmeiras, 1000, São Paulo - SP",
    units: 120
  },
  {
    id: "2",
    name: "Condomínio Vista Mar",
    address: "Av. Beira Mar, 500, Rio de Janeiro - RJ",
    units: 80
  },
  {
    id: "3",
    name: "Edifício Central Park",
    address: "Rua dos Ipês, 250, Belo Horizonte - MG",
    units: 60
  }
];

// Mock Units
export const units: Unit[] = [
  {
    id: "1",
    propertyId: "1",
    block: "A",
    number: "101",
    residents: []
  },
  {
    id: "2",
    propertyId: "1",
    block: "A",
    number: "102",
    residents: []
  },
  {
    id: "3",
    propertyId: "1",
    block: "B",
    number: "201",
    residents: []
  },
  {
    id: "4",
    propertyId: "2",
    block: "A",
    number: "101",
    residents: []
  }
];

// Mock Residents
export const residents: Resident[] = [
  {
    id: "1",
    name: "Carlos Oliveira",
    email: "carlos@example.com",
    phone: "(11) 98765-4321",
    unitId: "1",
    isOwner: true
  },
  {
    id: "2",
    name: "Ana Souza",
    email: "ana@example.com",
    phone: "(11) 91234-5678",
    unitId: "1",
    isOwner: false
  },
  {
    id: "3",
    name: "Ricardo Santos",
    email: "ricardo@example.com",
    phone: "(11) 99876-5432",
    unitId: "2",
    isOwner: true
  },
  {
    id: "4",
    name: "Fernanda Lima",
    email: "fernanda@example.com",
    phone: "(21) 98765-4321",
    unitId: "4",
    isOwner: true
  }
];

// Assigning residents to units
units[0].residents = residents.filter(resident => resident.unitId === "1");
units[1].residents = residents.filter(resident => resident.unitId === "2");
units[3].residents = residents.filter(resident => resident.unitId === "4");

// Mock Maintenance Status
export const maintenanceStatuses: MaintenanceStatus[] = [
  { id: "1", name: "Pendente", color: "#f59e0b" },
  { id: "2", name: "Em Andamento", color: "#2563eb" },
  { id: "3", name: "Concluído", color: "#22c55e" },
  { id: "4", name: "Cancelado", color: "#ef4444" }
];

// Mock Maintenance
export const maintenances: Maintenance[] = [
  {
    id: "1",
    propertyId: "1",
    title: "Vazamento na piscina",
    description: "Vazamento identificado na área da piscina, próximo ao filtro",
    statusId: "1",
    reportDate: "2025-05-10",
    estimatedDate: "2025-05-25"
  },
  {
    id: "2",
    propertyId: "1",
    title: "Troca de lâmpadas no hall",
    description: "Diversas lâmpadas queimadas no hall de entrada",
    statusId: "2",
    reportDate: "2025-05-08",
    estimatedDate: "2025-05-20",
    assignedTo: "Eletricista João"
  },
  {
    id: "3",
    propertyId: "1",
    title: "Pintura da fachada",
    description: "Renovação da pintura da fachada principal",
    statusId: "3",
    reportDate: "2025-04-15",
    estimatedDate: "2025-05-15",
    completionDate: "2025-05-12",
    cost: 15000,
    assignedTo: "Empresa Pinta Bem"
  },
  {
    id: "4",
    propertyId: "2",
    title: "Reparo no portão eletrônico",
    description: "Portão da garagem com falha intermitente",
    statusId: "2",
    reportDate: "2025-05-05",
    estimatedDate: "2025-05-22",
    assignedTo: "Técnico Roberto"
  }
];

// Mock Common Areas
export const commonAreas: CommonArea[] = [
  {
    id: "1",
    propertyId: "1",
    name: "Salão de Festas",
    capacity: 50,
    rules: "Disponível das 12h às 22h. Proibido som alto após 20h."
  },
  {
    id: "2",
    propertyId: "1",
    name: "Churrasqueira",
    capacity: 20,
    rules: "Disponível das 10h às 22h. Limpeza por conta do usuário."
  },
  {
    id: "3",
    propertyId: "1",
    name: "Academia",
    capacity: 15,
    rules: "Disponível das 6h às 22h. Uso de toalha obrigatório."
  },
  {
    id: "4",
    propertyId: "2",
    name: "Piscina",
    capacity: 30,
    rules: "Disponível das 9h às 21h. Crianças somente acompanhadas."
  }
];

// Mock Reservations
export const reservations: Reservation[] = [
  {
    id: "1",
    commonAreaId: "1",
    residentId: "1",
    startTime: "2025-05-25T14:00:00",
    endTime: "2025-05-25T20:00:00",
    guestCount: 25,
    status: "approved"
  },
  {
    id: "2",
    commonAreaId: "2",
    residentId: "3",
    startTime: "2025-05-26T12:00:00",
    endTime: "2025-05-26T17:00:00",
    guestCount: 10,
    status: "pending"
  },
  {
    id: "3",
    commonAreaId: "1",
    residentId: "4",
    startTime: "2025-06-05T15:00:00",
    endTime: "2025-06-05T21:00:00",
    guestCount: 40,
    status: "approved"
  },
  {
    id: "4",
    commonAreaId: "4",
    residentId: "4",
    startTime: "2025-05-28T10:00:00",
    endTime: "2025-05-28T18:00:00",
    guestCount: 15,
    status: "rejected"
  }
];

// Mock Financial Transactions
export const financialTransactions: FinancialTransaction[] = [
  {
    id: "1",
    propertyId: "1",
    date: "2025-05-01",
    amount: 12000,
    type: "revenue",
    category: "Condomínio",
    description: "Taxa de condomínio - Maio 2025"
  },
  {
    id: "2",
    propertyId: "1",
    date: "2025-05-05",
    amount: 3500,
    type: "expense",
    category: "Manutenção",
    description: "Reparo no sistema hidráulico"
  },
  {
    id: "3",
    propertyId: "1",
    date: "2025-05-10",
    amount: 2800,
    type: "expense",
    category: "Serviços",
    description: "Serviço de limpeza - Maio 2025"
  },
  {
    id: "4",
    propertyId: "1",
    date: "2025-05-15",
    amount: 1500,
    type: "revenue",
    category: "Aluguel",
    description: "Aluguel do espaço comercial - Maio 2025"
  },
  {
    id: "5",
    propertyId: "1",
    date: "2025-05-20",
    amount: 5000,
    type: "expense",
    category: "Manutenção",
    description: "Pintura da área comum"
  }
];

// Mock Stats Data
export const statsData: StatsData = {
  financial: {
    totalRevenue: 13500,
    totalExpenses: 11300,
    balance: 2200,
    defaultRate: 8.5
  },
  maintenance: {
    total: 12,
    pending: 5,
    inProgress: 4,
    completed: 3,
    averageCost: 3850
  },
  reservations: {
    total: 15,
    pending: 4,
    approved: 9,
    rejected: 2,
    mostPopularArea: "Salão de Festas"
  }
};

// Mock Chart Data for Financial Overview
export const financialChartData: ChartData = {
  labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
  datasets: [
    {
      label: "Receitas",
      data: [12000, 12500, 12300, 13000, 13500, 13800],
      backgroundColor: "rgba(37, 99, 235, 0.2)",
      borderColor: "rgba(37, 99, 235, 1)",
      borderWidth: 2
    },
    {
      label: "Despesas",
      data: [10500, 11000, 10800, 10900, 11300, 11800],
      backgroundColor: "rgba(239, 68, 68, 0.2)",
      borderColor: "rgba(239, 68, 68, 1)",
      borderWidth: 2
    }
  ]
};

// Mock Chart Data for Maintenance by Category
export const maintenanceChartData: ChartData = {
  labels: ["Hidráulica", "Elétrica", "Estrutural", "Pintura", "Elevadores", "Outros"],
  datasets: [
    {
      label: "Número de Manutenções",
      data: [8, 5, 3, 7, 2, 4],
      backgroundColor: [
        "rgba(37, 99, 235, 0.6)",
        "rgba(245, 158, 11, 0.6)",
        "rgba(16, 185, 129, 0.6)",
        "rgba(239, 68, 68, 0.6)",
        "rgba(139, 92, 246, 0.6)",
        "rgba(75, 85, 99, 0.6)"
      ]
    }
  ]
};

// Mock Chart Data for Space Usage
export const spaceUsageChartData: ChartData = {
  labels: ["Salão de Festas", "Churrasqueira", "Academia", "Piscina"],
  datasets: [
    {
      label: "Reservas nos últimos 3 meses",
      data: [24, 18, 30, 15],
      backgroundColor: [
        "rgba(37, 99, 235, 0.6)",
        "rgba(245, 158, 11, 0.6)",
        "rgba(16, 185, 129, 0.6)",
        "rgba(139, 92, 246, 0.6)"
      ]
    }
  ]
};

// Mock Chart Data for Default Rate Trend
export const defaultRateChartData: ChartData = {
  labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
  datasets: [
    {
      label: "Taxa de Inadimplência (%)",
      data: [12.5, 11.8, 10.3, 9.5, 8.5, 7.9],
      backgroundColor: "rgba(239, 68, 68, 0.2)",
      borderColor: "rgba(239, 68, 68, 1)",
      borderWidth: 2
    }
  ]
};
