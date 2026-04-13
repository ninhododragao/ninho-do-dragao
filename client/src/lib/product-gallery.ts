/**
 * Design: Artesanal Mágico
 * Galeria de produtos com múltiplos ângulos para visualização completa
 */

export interface ProductImage {
  url: string;
  alt: string;
  angle: string;
}

export interface ProductGallery {
  productId: string;
  productName: string;
  images: ProductImage[];
}

export const productGalleries: ProductGallery[] = [
  {
    productId: "tshirt-1",
    productName: "T-shirt personalizada",
    images: [
      {
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/product-tshirt-front-j8bSoqUqq7B2MFXxgPdWEv.webp",
        alt: "T-shirt vista frontal com dragão azul",
        angle: "Frontal",
      },
      {
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/product-tshirt-back-Z2bsR8VSbibbakiASLbas2.webp",
        alt: "T-shirt vista traseira com dragão azul",
        angle: "Traseira",
      },
    ],
  },
  {
    productId: "hoodie-1",
    productName: "Hoodie personalizado",
    images: [
      {
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/product-hoodie-front-33rBAhuX9aQFTLEJfF3jhz.webp",
        alt: "Hoodie vista frontal com dragão",
        angle: "Frontal",
      },
      {
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/product-hoodie-side-SwCTLUuANgwD7chn5oxmV8.webp",
        alt: "Hoodie vista lateral mostrando capuz",
        angle: "Lateral",
      },
    ],
  },
  {
    productId: "caneca",
    productName: "Caneca personalizada",
    images: [
      {
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/product-caneca-front-WJWPLQaGwWwphmsyZGnxjB.webp",
        alt: "Caneca vista frontal com dragão",
        angle: "Frontal",
      },
      {
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/product-caneca-side-2FtMXorE8oLwn5XfZp3een.webp",
        alt: "Caneca vista lateral girada",
        angle: "Lateral",
      },
    ],
  },
  {
    productId: "almofada",
    productName: "Almofada",
    images: [
      {
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/product-almofada-front-hqHzKN8qNUKAxcprp5CUnT.webp",
        alt: "Almofada vista frontal com dragão",
        angle: "Frontal",
      },
      {
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/product-almofada-angle-TwNipRxZKXMuJHpmED7nxT.webp",
        alt: "Almofada vista em ângulo 3D",
        angle: "Ângulo 3D",
      },
    ],
  },
  {
    productId: "manta",
    productName: "Manta",
    images: [
      {
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/product-manta-flat-KSWWhKZHCAnS5xhKqbZAeN.webp",
        alt: "Manta vista de cima com dragão",
        angle: "Flat Lay",
      },
      {
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/5iNtTsVwzUbYMuyWAEy2Mu/product-manta-folded-24qhomcoNJZJHxvzdQMbUb.webp",
        alt: "Manta parcialmente dobrada mostrando textura",
        angle: "Dobrada",
      },
    ],
  },
];

export const getProductGallery = (productId: string): ProductGallery | undefined => {
  return productGalleries.find((g) => g.productId === productId);
};
