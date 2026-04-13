export interface Product {
  id: string;
  name: string;
  category: string;
  price?: number;
  priceFrom?: number;
  description: string;
  image?: string;
  featured?: boolean;
}

export const products: Product[] = [
  // Têxteis Personalizados
  {
    id: "tshirt-1",
    name: "T-shirt personalizada",
    category: "Têxteis",
    price: 19.99,
    description: "T-shirt com 1 estampa personalizada",
    featured: true,
  },
  {
    id: "tshirt-2",
    name: "T-shirt personalizada",
    category: "Têxteis",
    price: 24.99,
    description: "T-shirt com 2 estampas personalizadas",
  },
  {
    id: "sweat-1",
    name: "Sweat personalizado",
    category: "Têxteis",
    price: 29.99,
    description: "Sweat com 1 estampa personalizada",
  },
  {
    id: "sweat-2",
    name: "Sweat personalizado",
    category: "Têxteis",
    price: 34.99,
    description: "Sweat com 2 estampas personalizadas",
  },
  {
    id: "hoodie-1",
    name: "Hoodie personalizado",
    category: "Têxteis",
    price: 34.99,
    description: "Hoodie com 1 estampa personalizada",
    featured: true,
  },
  {
    id: "hoodie-2",
    name: "Hoodie personalizado",
    category: "Têxteis",
    price: 39.99,
    description: "Hoodie com 2 estampas personalizadas",
  },

  // Presentes Personalizados
  {
    id: "caneca",
    name: "Caneca personalizada",
    category: "Presentes",
    price: 12.99,
    description: "Caneca de cerâmica com design personalizado",
    featured: true,
  },
  {
    id: "chavena",
    name: "Chávena café",
    category: "Presentes",
    price: 9.99,
    description: "Chávena de café personalizada",
  },
  {
    id: "copo-termico",
    name: "Copo térmico",
    category: "Presentes",
    price: 18.99,
    description: "Copo térmico com design personalizado",
  },
  {
    id: "garrafa",
    name: "Garrafa",
    category: "Presentes",
    price: 16.99,
    description: "Garrafa reutilizável com design personalizado",
  },
  {
    id: "azulejo",
    name: "Azulejo",
    category: "Presentes",
    price: 14.99,
    description: "Azulejo decorativo com design personalizado",
  },
  {
    id: "almofada",
    name: "Almofada",
    category: "Presentes",
    price: 19.99,
    description: "Almofada com design personalizado",
  },
  {
    id: "manta",
    name: "Manta",
    category: "Presentes",
    price: 29.99,
    description: "Manta confortável com design personalizado",
    featured: true,
  },
  {
    id: "porta-chaves",
    name: "Porta-chaves",
    category: "Presentes",
    price: 6.99,
    description: "Porta-chaves com design personalizado",
  },
  {
    id: "iman",
    name: "Íman",
    category: "Presentes",
    price: 4.99,
    description: "Íman decorativo com design personalizado",
  },

  // Festas Temáticas
  {
    id: "convite-digital",
    name: "Convite digital",
    category: "Festas",
    price: 15,
    description: "Convite digital personalizado para envio por email",
  },
  {
    id: "convite-impresso",
    name: "Convite impresso",
    category: "Festas",
    priceFrom: 20,
    description: "Convite impresso personalizado (desde 20€)",
  },
  {
    id: "topo-bolo",
    name: "Topo de bolo",
    category: "Festas",
    price: 10,
    description: "Topo de bolo personalizado",
  },
  {
    id: "toppers-cupcake",
    name: "Toppers cupcake",
    category: "Festas",
    price: 12,
    description: "Toppers para cupcakes personalizados",
  },
  {
    id: "bandeirolas",
    name: "Bandeirolas",
    category: "Festas",
    price: 10,
    description: "Bandeirolas decorativas personalizadas",
  },
  {
    id: "caixas-lembranca",
    name: "Caixas lembrança",
    category: "Festas",
    price: 2,
    priceFrom: 2,
    description: "Caixas de lembrança personalizadas (desde 2€/un)",
  },
  {
    id: "saquinhos-festa",
    name: "Saquinhos festa",
    category: "Festas",
    price: 1.8,
    priceFrom: 1.8,
    description: "Saquinhos para festa personalizados (desde 1,80€/un)",
  },

  // Kits Festa
  {
    id: "kit-essencial",
    name: "Kit Essencial",
    category: "Kits Festa",
    price: 35,
    priceFrom: 35,
    description: "Kit completo essencial para festa (desde 35€)",
    featured: true,
  },
  {
    id: "kit-plus",
    name: "Kit Plus",
    category: "Kits Festa",
    price: 75,
    priceFrom: 75,
    description: "Kit completo plus para festa (desde 75€)",
  },
  {
    id: "festa-completa",
    name: "Festa completa",
    category: "Kits Festa",
    price: 0,
    description: "Festa completa personalizada (sob orçamento)",
  },

  // Papelaria Personalizada
  {
    id: "cartoes",
    name: "Cartões",
    category: "Papelaria",
    price: 2,
    description: "Cartões personalizados",
  },
  {
    id: "marcadores",
    name: "Marcadores",
    category: "Papelaria",
    price: 3.5,
    description: "Marcadores personalizados",
  },
  {
    id: "autocolantes",
    name: "Autocolantes",
    category: "Papelaria",
    price: 4,
    priceFrom: 4,
    description: "Autocolantes personalizados (desde 4€)",
  },
  {
    id: "etiquetas",
    name: "Etiquetas",
    category: "Papelaria",
    price: 3,
    priceFrom: 3,
    description: "Etiquetas personalizadas (desde 3€)",
  },
  {
    id: "caderno",
    name: "Caderno",
    category: "Papelaria",
    price: 12.99,
    description: "Caderno personalizado",
  },
  {
    id: "agenda",
    name: "Agenda",
    category: "Papelaria",
    price: 16.99,
    description: "Agenda personalizada",
  },
  {
    id: "calendario",
    name: "Calendário",
    category: "Papelaria",
    price: 14.99,
    description: "Calendário personalizado",
  },

  // Encomendas de Grupo
  {
    id: "tshirt-grupo",
    name: "T-shirt personalizada (Grupo)",
    category: "Encomendas de Grupo",
    price: 23,
    priceFrom: 23,
    description: "T-shirt personalizada para encomendas de grupo (desde 23€)",
  },
  {
    id: "sweat-grupo",
    name: "Sweat personalizado (Grupo)",
    category: "Encomendas de Grupo",
    price: 35,
    priceFrom: 35,
    description: "Sweat personalizado para encomendas de grupo (desde 35€)",
  },
];

export const categories = [
  "Têxteis",
  "Presentes",
  "Festas",
  "Kits Festa",
  "Papelaria",
  "Encomendas de Grupo",
];

export const getProductsByCategory = (category: string) => {
  return products.filter((p) => p.category === category);
};

export const getFeaturedProducts = () => {
  return products.filter((p) => p.featured);
};
