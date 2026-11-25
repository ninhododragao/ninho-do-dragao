/*
 * Loja do Ninho do Dragão — áreas e produtos em destaque.
 *
 * PARA MUDAR UM PREÇO OU PRODUTO: edita só este ficheiro.
 * - precoDesde: preço de venda mais baixo (do sistema de gestão em Excel). null = "Preço sob orçamento".
 * - imagem: ficheiro em /public/loja (imagens próprias, nunca fotos de fornecedores). Sem imagem = ícone.
 * - codigo: código ND- (o mesmo do Excel). Nunca pôr a referência do fornecedor.
 */

export type AreaId = "bebe" | "festas" | "presentes" | "empresas" | "casa";

export interface Area {
  id: AreaId;
  nome: string;
  icone: string;
  frase: string;
  cor: string; // fundo do cartão
  imagem?: string;
}

export interface ProdutoLoja {
  codigo: string;
  nome: string;
  area: AreaId;
  descricao: string;
  precoDesde: number | null;
  nota?: string; // ex.: "por unidade", "pack de 4"
  icone: string;
  imagem?: string;
}

export const AREAS: Area[] = [
  { id: "bebe", nome: "Bebé e criança", icone: "🧸", frase: "Babetes, bibes, bodies, etiquetas e roupa com nome", cor: "#FDF2F8", imagem: "/loja/area-bebe.webp" },
  { id: "festas", nome: "Festas e eventos", icone: "🎉", frase: "Batizados, casamentos, aniversários e lembranças", cor: "#FEF3C7", imagem: "/loja/area-festas.webp" },
  { id: "presentes", nome: "Presentes personalizados", icone: "🎁", frase: "Canecas, azulejos, mantas e copos com nome ou foto", cor: "#EEF2FF", imagem: "/loja/area-presentes.webp" },
  { id: "empresas", nome: "Empresas e brindes", icone: "💼", frase: "T-shirts com logótipo, brindes, sacos e fardamento", cor: "#ECFDF5", imagem: "/loja/area-empresas.webp" },
  { id: "casa", nome: "Escritório, lar e têxtil", icone: "🏡", frase: "T-shirts, sweats, aventais, sacos e papelaria", cor: "#F5F5F4", imagem: "/loja/area-casa.webp" },
];

export const PRODUTOS: ProdutoLoja[] = [
  // ── Bebé e criança
  { codigo: "ND-BB-01", area: "bebe", icone: "👕", nome: "T-shirt de criança personalizada", descricao: "Com nome, desenho ou frase. Tamanhos dos 6 meses aos 14 anos.", precoDesde: 10.9, imagem: "/loja/tshirt-crianca.webp" },
  { codigo: "ND-BB-02", area: "bebe", icone: "🍼", nome: "Babete com nome", descricao: "Para o dia a dia ou para oferecer no nascimento.", precoDesde: null, imagem: "/loja/babete.webp" },
  { codigo: "ND-BB-03", area: "bebe", icone: "🎽", nome: "Bibe escolar com nome", descricao: "Para a creche e o pré-escolar, com nome bordado ou estampado.", precoDesde: null },
  { codigo: "ND-BB-04", area: "bebe", icone: "👶", nome: "Body de bebé personalizado", descricao: "Com nome, data de nascimento ou frase.", precoDesde: null, imagem: "/loja/body-bebe.webp" },
  { codigo: "ND-BB-05", area: "bebe", icone: "🏷️", nome: "Etiquetas com nome", descricao: "Para roupa, garrafas e material escolar.", precoDesde: null },
  { codigo: "ND-BB-06", area: "bebe", icone: "🧑‍🍳", nome: "Avental de criança", descricao: "Com nome, para a cozinha ou para pintar.", precoDesde: 9.9 },
  { codigo: "ND-BB-07", area: "bebe", icone: "🛏️", nome: "Manta polar com nome", descricao: "Macia e quentinha, com nome ou fotografia.", precoDesde: 24.9, imagem: "/loja/manta.webp" },

  // ── Festas e eventos
  { codigo: "ND-FE-01", area: "festas", icone: "💌", nome: "Convites personalizados", descricao: "Batizado, casamento, aniversário ou festa temática.", precoDesde: null, imagem: "/loja/convites.webp" },
  { codigo: "ND-FE-02", area: "festas", icone: "🎀", nome: "Lembranças de batizado e casamento", descricao: "Pequenas lembranças com nome e data para os convidados.", precoDesde: null, imagem: "/loja/lembrancas.webp" },
  { codigo: "ND-FE-03", area: "festas", icone: "🎂", nome: "Topo de bolo personalizado", descricao: "Com nome, idade e tema da festa.", precoDesde: null },
  { codigo: "ND-FE-04", area: "festas", icone: "📦", nome: "Caixas e sacos de lembrança", descricao: "Para guloseimas e lembranças, com o tema da festa.", precoDesde: null },
  { codigo: "ND-FE-05", area: "festas", icone: "🥳", nome: "Kit festa temático", descricao: "Convites, topos, caixas e decoração a combinar.", precoDesde: null },
  { codigo: "ND-FE-06", area: "festas", icone: "👨‍👩‍👧‍👦", nome: "T-shirts a combinar (pack de 4)", descricao: "Para a família, despedidas e grupos, com o mesmo tema.", precoDesde: 45, nota: "pack de 4" },

  // ── Presentes personalizados
  { codigo: "ND-PR-01", area: "presentes", icone: "☕", nome: "Caneca personalizada", descricao: "Com foto, nome ou frase. Personalização incluída.", precoDesde: 10.9, imagem: "/loja/caneca.webp" },
  { codigo: "ND-PR-02", area: "presentes", icone: "✨", nome: "Caneca mágica", descricao: "A imagem aparece quando se põe a bebida quente.", precoDesde: 13.9 },
  { codigo: "ND-PR-03", area: "presentes", icone: "🎁", nome: "Caneca com embalagem de oferta", descricao: "Pronta a oferecer.", precoDesde: 12.9 },
  { codigo: "ND-PR-04", area: "presentes", icone: "🥤", nome: "Copo térmico personalizado", descricao: "Mantém a bebida quente ou fria, com nome ou desenho.", precoDesde: 15.9, imagem: "/loja/copo-termico.webp" },
  { codigo: "ND-PR-05", area: "presentes", icone: "🖼️", nome: "Azulejo com foto", descricao: "Com fotografia, frase ou arte.", precoDesde: 11.9, imagem: "/loja/azulejo.webp" },
  { codigo: "ND-PR-06", area: "presentes", icone: "🧲", nome: "Íman personalizado", descricao: "Com foto ou frase, para o frigorífico.", precoDesde: 4.99 },
  { codigo: "ND-PR-07", area: "presentes", icone: "🛋️", nome: "Almofada personalizada", descricao: "Com fotografia ou frase especial.", precoDesde: null, imagem: "/loja/almofada.webp" },
  { codigo: "ND-PR-08", area: "presentes", icone: "🛏️", nome: "Manta polar personalizada", descricao: "Com nome ou fotografia.", precoDesde: 24.9 },

  // ── Empresas e brindes
  { codigo: "ND-EM-01", area: "empresas", icone: "👕", nome: "T-shirts com logótipo", descricao: "Para equipas, eventos e fardamento. Preço especial por quantidade.", precoDesde: 12.9, imagem: "/loja/tshirt-logo.webp" },
  { codigo: "ND-EM-02", area: "empresas", icone: "🧥", nome: "Sweats e hoodies com logótipo", descricao: "Para equipas, escolas e associações.", precoDesde: 22.9 },
  { codigo: "ND-EM-03", area: "empresas", icone: "👜", nome: "Sacos de algodão com logótipo", descricao: "Brinde útil para eventos e lojas.", precoDesde: 6.9, imagem: "/loja/saco.webp" },
  { codigo: "ND-EM-04", area: "empresas", icone: "☕", nome: "Canecas com logótipo", descricao: "Para oferta a clientes e para a equipa.", precoDesde: 10.9 },
  { codigo: "ND-EM-05", area: "empresas", icone: "🖊️", nome: "Canetas, porta-chaves e pequenos brindes", descricao: "Centenas de artigos com o logótipo da tua empresa.", precoDesde: null },
  { codigo: "ND-EM-06", area: "empresas", icone: "🧑‍🍳", nome: "Aventais e fardamento", descricao: "Para restauração, comércio e serviços.", precoDesde: 12.9 },

  // ── Escritório, lar e têxtil
  { codigo: "ND-CA-01", area: "casa", icone: "👕", nome: "T-shirt de adulto personalizada", descricao: "Estampa à frente, atrás ou dos dois lados.", precoDesde: 12.9, imagem: "/loja/tshirt-adulto.webp" },
  { codigo: "ND-CA-02", area: "casa", icone: "🧥", nome: "Sweatshirt personalizada", descricao: "Com nome, frase ou desenho.", precoDesde: 22.9 },
  { codigo: "ND-CA-03", area: "casa", icone: "🧥", nome: "Hoodie com capuz personalizado", descricao: "Com nome, frase ou desenho.", precoDesde: 27.9, imagem: "/loja/hoodie.webp" },
  { codigo: "ND-CA-04", area: "casa", icone: "🧑‍🍳", nome: "Avental de adulto", descricao: "Com nome ou frase divertida.", precoDesde: 12.9 },
  { codigo: "ND-CA-05", area: "casa", icone: "👜", nome: "Saco de algodão personalizado", descricao: "Para as compras, a praia ou a escola.", precoDesde: 6.9 },
  { codigo: "ND-CA-06", area: "casa", icone: "📓", nome: "Cadernos e agendas personalizados", descricao: "Com nome, foto ou logótipo na capa.", precoDesde: null, imagem: "/loja/caderno.webp" },
];

export const euro = (v: number) => v.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

export const areaPorId = (id: string) => AREAS.find(a => a.id === id);
export const produtoPorCodigo = (c: string) => PRODUTOS.find(p => p.codigo === c);
