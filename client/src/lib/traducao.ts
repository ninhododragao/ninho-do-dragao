/**
 * Tradução ES → PT dos nomes de artigos que vêm em espanhol de alguns fornecedores
 * (ex.: "Adare – Mochila Viaje PU" → "Adare – Mochila de viagem PU").
 * Para corrigir uma tradução, basta mudar/acrescentar aqui. Palavras que não estão na lista ficam como estão.
 */

// Expressões de várias palavras (aplicadas primeiro)
const EXPRESSOES: [RegExp, string][] = [
  [/\bbater[ií]a externa\b/gi, "power bank"],
  [/\bbloc de notas\b/gi, "bloco de notas"],
  [/\bjuegos? de habilidad\b/gi, "jogos de habilidade"],
  [/\bpap[aá] noel\b/gi, "Pai Natal"],
  [/\bacero inoxidable\b/gi, "aço inoxidável"],
  [/\bgafas de sol\b/gi, "óculos de sol"],
  [/\btabla de cortar\b/gi, "tábua de corte"],
  [/\bestaci[oó]n metereol[oó]gica\b/gi, "estação meteorológica"],
  [/\bpuerto usb\b/gi, "hub USB"],
  [/\balta visibilidad\b/gi, "alta visibilidade"],
  [/\bcuerda de salto\b/gi, "corda de saltar"],
  [/\bmarco de fotos\b/gi, "moldura"],
  [/\bportafotos\b/gi, "moldura"],
  [/\bbandas el[aá]sticas\b/gi, "bandas elásticas"],
  [/\bmochila viaje\b/gi, "mochila de viagem"],
  [/\bcepillo dental\b/gi, "escova de dentes"],
  [/\bcepillo de dientes\b/gi, "escova de dentes"],
  [/\bb[aá]lsamo labial\b/gi, "bálsamo labial"],
  [/\bjuego de parch[ií]s\b/gi, "jogo de ludo"],
  [/\brascador de hielo\b/gi, "raspador de gelo"],
  [/\bnivel de burbuja\b/gi, "nível de bolha"],
  [/\bset de cubiertos\b/gi, "conjunto de talheres"],
  [/\bset de vino\b/gi, "conjunto de vinho"],
  [/\bcaja de vino\b/gi, "caixa de vinho"],
  [/\bcaja de presentaci[oó]n\b/gi, "caixa de apresentação"],
  [/\bbolsa de regalo\b/gi, "saco de oferta"],
  [/\bbolsa de la compra\b/gi, "saco de compras"],
  [/\bmanta de forro polar\b/gi, "manta polar"],
  [/\bforro polar\b/gi, "polar"],
  [/\bfuera de\b/gi, "fora de"],
  [/\bbid[oó]n t[eé]rmico\b/gi, "garrafa térmica"],
  [/\bpa[ñn]o (de )?cocina\b/gi, "pano de cozinha"],
  [/\bsoporte de coche\b/gi, "suporte para carro"],
];

const PALAVRAS: Record<string, string> = {
  abanico: "leque", abridor: "abre-garrafas", adorno: "enfeite", adornos: "enfeites", ajedrez: "xadrez",
  algodon: "algodão", alfombrilla: "tapete", almohada: "almofada", almohadilla: "almofada", altavoz: "coluna",
  animales: "animais", anillas: "argolas", antiestres: "anti-stress", antirobo: "antirroubo", arbol: "árvore",
  aromatica: "aromática", asa: "pega", auriculares: "auriculares", balon: "bola", bambu: "bambu", baraja: "baralho de cartas",
  barbacoa: "churrasco", bascula: "balança", bateria: "bateria", baeria: "bateria", bicicleta: "bicicleta", bidon: "garrafa",
  boligrafo: "esferográfica", bolsa: "saco", bolsas: "sacos", bolso: "bolsa", botella: "garrafa", botellas: "garrafas",
  botellero: "porta-garrafas", brillante: "brilhante", cable: "cabo", cables: "cabos", cafetera: "cafeteira", caja: "caixa",
  calcetin: "meia", calcetines: "meias", calentador: "aquecedor", calor: "calor", camara: "câmara", candado: "cadeado",
  cañamo: "cânhamo", carton: "cartão", cargador: "carregador", carpeta: "pasta", cartera: "carteira", cascos: "auscultadores",
  cenicero: "cinzeiro", ceramica: "cerâmica", cepillo: "escova", cierre: "fecho", cinta: "fita", cinturon: "cinto",
  cocina: "cozinha", coctel: "cocktail", coctelera: "coqueteleira", collar: "coleira", colorear: "colorir", colores: "cores",
  compra: "compras", con: "com", corcho: "cortiça", cortador: "cortador", cristal: "vidro", cuchara: "colher",
  cuerda: "corda", cuerdas: "cordas", cuerpo: "corpo", cubiertos: "talheres", cubo: "balde", delantal: "avental",
  deportiva: "desportiva", deportivo: "desportivo", despertador: "despertador", destornilladores: "chaves de fendas",
  difusor: "difusor", digital: "digital", domino: "dominó", doble: "duplo", ejecutiva: "executiva", electrico: "elétrico",
  en: "em", enfriador: "refrigerador", escritorio: "secretária", escritura: "escrita", espejo: "espelho", especial: "especial",
  esterilla: "esteira", estuche: "estojo", externa: "externa", extensible: "extensível", fieltro: "feltro", flexometro: "fita métrica",
  forma: "forma", frio: "frio", funda: "capa", futbol: "futebol", gorra: "boné", gorro: "gorro", grande: "grande",
  guantes: "luvas", herramientas: "ferramentas", hielo: "gelo", holder: "suporte", identificador: "etiqueta de identificação",
  iman: "íman", impermeable: "impermeável", inalambrico: "sem fios", inalambricos: "sem fios", inalambrica: "sem fios",
  infantil: "infantil", infinito: "infinito", inoxidable: "inoxidável", inteligente: "inteligente", jabon: "sabão",
  jardineria: "jardinagem", jarra: "jarro", juego: "jogo", juegos: "jogos", laminas: "lâminas", lampara: "candeeiro",
  lapicero: "porta-lápis", lapiz: "lápis", lapices: "lápis", laser: "laser", libreta: "caderno", linterna: "lanterna",
  llavero: "porta-chaves", localizador: "localizador", luz: "luz", madera: "madeira", magnetico: "magnético",
  maleta: "mala", maletero: "organizador de bagageira", maletin: "pasta", mano: "mão", manopla: "luva de cozinha",
  manicura: "manicure", marcador: "marcador", marcadores: "marcadores", marmol: "mármore", mascara: "máscara",
  mascotas: "animais", medalla: "medalha", medidor: "medidor", metalica: "metálica", microfibra: "microfibra",
  monedero: "porta-moedas", moneda: "moeda", mosqueton: "mosquetão", multiherramienta: "multiferramenta",
  multiherramientas: "multiferramentas", multifuncion: "multifunções", multiusos: "multiusos", navaja: "canivete",
  navidad: "de Natal", navideño: "de Natal", navideña: "de Natal", negra: "preta", neceser: "necessaire", nevera: "saco térmico",
  niños: "criança", ninos: "criança", notas: "notas", organico: "orgânico", organizador: "organizador", oso: "urso",
  pajaro: "pássaro", pala: "pá", palas: "raquetes de praia", pantalla: "ecrã", pañoleta: "lenço", pañuelo: "lenço",
  paño: "pano", papel: "papel", paraguas: "guarda-chuva", pared: "parede", parasol: "para-sol", parche: "adesivo",
  pareo: "pareo", pasaporte: "passaporte", pastillero: "caixa de comprimidos", peine: "pente", pelota: "bola",
  peluche: "peluche", perpetuo: "perpétuo", perro: "cão", peto: "colete", plegable: "dobrável", portadocumentos: "porta-documentos",
  portalapices: "porta-lápis", portamovil: "suporte de telemóvel", portanotas: "porta-notas", portatil: "portátil",
  portatodo: "estojo", portavasos: "base para copos", portabotellas: "porta-garrafas", posavasos: "bases para copos",
  presentacion: "apresentação", pulsador: "botão", pulsera: "pulseira", puzle: "puzzle", radio: "rádio", raton: "rato",
  raya: "riscas", reciclado: "reciclado", reciclada: "reciclada", reflectante: "refletor", regalo: "oferta", reloj: "relógio",
  retornable: "reutilizável", reutilizable: "reutilizável", reutilzable: "reutilizável", reversible: "reversível",
  riñonera: "bolsa de cintura", rompecabezas: "quebra-cabeças", salto: "saltar", sin: "sem", sobre: "envelope",
  sobremesa: "de mesa", sol: "sol", sombrero: "chapéu", soporte: "suporte", sublimacion: "sublimação", sublimable: "para sublimação",
  tabla: "tábua", tablero: "tabuleiro", tapa: "tampa", tapon: "tampa", tapones: "tampões", tarjetero: "porta-cartões",
  taza: "caneca", tazas: "canecas", tejido: "tecido", termico: "térmico", termica: "térmica", termo: "termo",
  tinta: "tinta", tintas: "tintas", toalla: "toalha", transparente: "transparente", triangular: "triangular",
  vaquero: "ganga", vaso: "copo", vasos: "copos", venta: "venda", ventilador: "ventoinha", viaje: "viagem", viajes: "viagens",
  vino: "vinho", set: "conjunto", coche: "carro", fiambrera: "lancheira", rpet: "RPET", eco: "eco", y: "e", yute: "juta", zapatillero: "saco para calçado", chanclas: "chinelos", chubasquero: "impermeável",
  silbato: "apito", pedernal: "pederneira", citronela: "citronela", paja: "palha", silla: "cadeira", colchoneta: "colchão",
  maceta: "vaso", puerto: "porta", base: "base", alum: "alumínio", aluminio: "alumínio", poliester: "poliéster",
  acero: "aço", fibra: "fibra", goma: "borracha", denim: "ganga", escalimetro: "escalímetro", baliza: "sinalizador",
  cubrevolante: "capa de volante", calendario: "calendário", agenda: "agenda", lanyard: "fita porta-crachá",
  trofeo: "troféu", vela: "vela", manta: "manta", polar: "polar", poncho: "poncho", braga: "gola", chapas: "crachás",
  abrebotellas: "abre-garrafas", sacacorchos: "saca-rolhas", quesos: "queijos", magica: "mágica", mágica: "mágica",
};

const MATERIAIS = ["algodão", "papel", "juta", "cortiça", "bambu", "vidro", "cerâmica", "madeira", "feltro", "alumínio", "aço", "cartão", "cânhamo", "ganga", "mármore", "microfibra", "poliéster", "palha"];

const semAcentos = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const DICIONARIO: Record<string, string> = Object.fromEntries(
  Object.entries(PALAVRAS).map(([k, v]) => [semAcentos(k), v])
);

function traduzirTexto(t: string): string {
  let s = t;
  for (const [re, pt] of EXPRESSOES) s = s.replace(re, pt);
  s = s.replace(/[A-Za-zÀ-ÿñÑ]+/g, (w) => {
    const pt = DICIONARIO[semAcentos(w)];
    if (!pt) return w;
    return w === w.toUpperCase() && w.length > 1 ? pt.toUpperCase() : pt; // siglas como "PU", "RPET" ficam
  });
  // "Saco algodão" → "Saco de algodão" (em português o material leva "de")
  s = s.replace(new RegExp(`(\\S)\\s+(${MATERIAIS.join("|")})\\b`, "gi"), (m, antes, mat) =>
    /\b(de|em|e)$/i.test(s.slice(0, s.indexOf(m) + 1)) ? m : `${antes} de ${mat}`);
  s = s.replace(/\bde de\b/gi, "de").replace(/\s+/g, " ").trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Traduz só a parte do tipo: "Modelo – Tipo em espanhol" → "Modelo – Tipo em português". */
export function traduzirNome(nome: string): string {
  if (!nome.includes(" – ")) return nome;
  const [modelo, ...resto] = nome.split(" – ");
  return `${modelo} – ${traduzirTexto(resto.join(" – "))}`;
}
