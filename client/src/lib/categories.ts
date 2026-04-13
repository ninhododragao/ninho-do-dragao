/**
 * Categorias e Produtos - Ninho do Dragão
 * Dados estruturados para a nova versão do site
 */

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  priceFrom: boolean;
  image: string;
}

export const categories: Category[] = [
  {
    id: "texteis",
    name: "Têxteis Personalizados",
    description: "T-shirts, sweats, hoodies e muito mais com o teu design",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/textiles-personalizados-cVTgr5WV4QWDKQNWmLsWWP.webp",
    slug: "texteis",
  },
  {
    id: "presentes",
    name: "Presentes Personalizados",
    description: "Canecas, almofadas, mantas e artigos de presente únicos",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/presentes-personalizados-oD4Pof25ZANUmCMwCVCEni.webp",
    slug: "presentes",
  },
  {
    id: "papelaria",
    name: "Papelaria Personalizada",
    description: "Convites, cartões, cadernos e agendas com o teu toque pessoal",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/papelaria-personalizada-eScgxKVibdJvUFLfwZswb6.webp",
    slug: "papelaria",
  },
  {
    id: "festas",
    name: "Festas Temáticas",
    description: "Decoração e artigos personalizados para as tuas celebrações",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/festas-tematicas-6bN5ZV8Ao36besQDgXfqXS.webp",
    slug: "festas",
  },
];

export const products: Product[] = [
  // Têxteis
  {
    id: "tshirt-1",
    name: "T-shirt Personalizada",
    category: "Têxteis Personalizados",
    description: "T-shirt de qualidade premium com o teu design personalizado",
    price: 12.99,
    priceFrom: true,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/textiles-personalizados-cVTgr5WV4QWDKQNWmLsWWP.webp",
  },
  {
    id: "sweat-1",
    name: "Sweat Personalizado",
    category: "Têxteis Personalizados",
    description: "Sweat confortável e quente com personalização à tua escolha",
    price: 24.99,
    priceFrom: true,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/textiles-personalizados-cVTgr5WV4QWDKQNWmLsWWP.webp",
  },
  {
    id: "hoodie-1",
    name: "Hoodie Personalizado",
    category: "Têxteis Personalizados",
    description: "Hoodie premium com capuz e o teu design exclusivo",
    price: 29.99,
    priceFrom: true,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/textiles-personalizados-cVTgr5WV4QWDKQNWmLsWWP.webp",
  },

  // Presentes
  {
    id: "caneca-1",
    name: "Caneca Personalizada",
    category: "Presentes Personalizados",
    description: "Caneca de cerâmica com o teu design ou foto favorita",
    price: 8.99,
    priceFrom: true,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/presentes-personalizados-oD4Pof25ZANUmCMwCVCEni.webp",
  },
  {
    id: "almofada-1",
    name: "Almofada Personalizada",
    category: "Presentes Personalizados",
    description: "Almofada confortável com o teu design personalizado",
    price: 18.99,
    priceFrom: true,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/presentes-personalizados-oD4Pof25ZANUmCMwCVCEni.webp",
  },
  {
    id: "manta-1",
    name: "Manta Personalizada",
    category: "Presentes Personalizados",
    description: "Manta aconchegante com o teu design exclusivo",
    price: 34.99,
    priceFrom: true,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/presentes-personalizados-oD4Pof25ZANUmCMwCVCEni.webp",
  },

  // Papelaria
  {
    id: "convite-1",
    name: "Convites Personalizados",
    category: "Papelaria Personalizada",
    description: "Convites digitais ou impressos para os teus eventos",
    price: 0.5,
    priceFrom: true,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/papelaria-personalizada-eScgxKVibdJvUFLfwZswb6.webp",
  },
  {
    id: "cartao-1",
    name: "Cartões Personalizados",
    category: "Papelaria Personalizada",
    description: "Cartões de visita ou de felicitações com o teu design",
    price: 0.3,
    priceFrom: true,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/papelaria-personalizada-eScgxKVibdJvUFLfwZswb6.webp",
  },
  {
    id: "caderno-1",
    name: "Cadernos Personalizados",
    category: "Papelaria Personalizada",
    description: "Cadernos com capa personalizada e páginas de qualidade",
    price: 9.99,
    priceFrom: true,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/papelaria-personalizada-eScgxKVibdJvUFLfwZswb6.webp",
  },

  // Festas
  {
    id: "topo-bolo-1",
    name: "Topos de Bolo Personalizados",
    category: "Festas Temáticas",
    description: "Topos de bolo personalizados para as tuas celebrações",
    price: 4.99,
    priceFrom: true,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/festas-tematicas-6bN5ZV8Ao36besQDgXfqXS.webp",
  },
  {
    id: "bandeirolas-1",
    name: "Bandeirolas Personalizadas",
    category: "Festas Temáticas",
    description: "Bandeirolas decorativas com o teu design temático",
    price: 14.99,
    priceFrom: true,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/festas-tematicas-6bN5ZV8Ao36besQDgXfqXS.webp",
  },
  {
    id: "saquinhos-festa-1",
    name: "Saquinhos de Festa Personalizados",
    category: "Festas Temáticas",
    description: "Saquinhos decorativos para ofertas e lembranças",
    price: 1.99,
    priceFrom: true,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/festas-tematicas-6bN5ZV8Ao36besQDgXfqXS.webp",
  },
];

export function getProductsByCategory(categoryId: string): Product[] {
  const category = categories.find((c) => c.id === categoryId);
  if (!category) return [];
  return products.filter((p) => p.category === category.name);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
