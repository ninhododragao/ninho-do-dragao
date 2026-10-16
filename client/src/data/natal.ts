/**
 * Coleção Natal 2026 — dados públicos (sem preços nem fornecedor).
 * Para mudar textos ou fotos, edita este ficheiro.
 */
export type NatalGrupo = "arvore" | "advento" | "decor" | "textil";

export interface NatalProduto {
  ref: string;
  grupo: NatalGrupo;
  nome: string;
  desc: string;
  opcoes: string[];
  novo?: boolean;
  img: string;
}

export const NATAL_PRAZO = "30 de novembro";
export const NATAL_PRAZO_ADVENTO = "15 de novembro";

export const NATAL_GRUPOS: { id: NatalGrupo; titulo: string; texto: string }[] = [
  {
    "id": "arvore",
    "titulo": "Enfeites para a árvore",
    "texto": "Enfeites com foto, nome ou data, para pendurar na árvore e guardar de ano para ano."
  },
  {
    "id": "advento",
    "titulo": "Contagem do Advento",
    "texto": "Para contar os dias até à noite de 24. Encomendas até 15 de novembro, para estar pronto a 1 de dezembro."
  },
  {
    "id": "decor",
    "titulo": "Molduras e decoração",
    "texto": "Peças para a sala, a secretária ou a mesa de Natal."
  },
  {
    "id": "textil",
    "titulo": "Têxtil",
    "texto": "Para vestir o espírito de Natal."
  }
];

export const NATAL_PRODUTOS: NatalProduto[] = [
  {
    "ref": "ND-NAT-01",
    "grupo": "arvore",
    "nome": "Bola que Brilha no Escuro",
    "desc": "Enfeite redondo de 8 cm que guarda a luz do dia e brilha à noite, sem pilhas. Com a tua foto, nome ou desenho e fita de organza.",
    "opcoes": [
      "8 cm",
      "Brilha no escuro",
      "Fita de organza"
    ],
    "novo": true,
    "img": "/natal/bola-brilha.jpg"
  },
  {
    "ref": "ND-NAT-02",
    "grupo": "arvore",
    "nome": "Enfeite Duplo com Acrílico",
    "desc": "Duas camadas — base personalizada e frente em acrílico — com cordão de cetim, pérola e laço. Um enfeite com ar de joia.",
    "opcoes": [
      "Dupla face",
      "Cetim + pérola + laço"
    ],
    "novo": false,
    "img": "https://cc77b35e42.clvaw-cdnwnd.com/e5e7bed16151ce2732e00e1d9935f2ac/200004310-e07c9e07ca/700/A5-9.png?ph=cc77b35e42"
  },
  {
    "ref": "ND-NAT-03",
    "grupo": "arvore",
    "nome": "Casinha de Natal 3D",
    "desc": "Uma casinha em madeira para pendurar na árvore, com a fotografia da família ou o nome de cada um. Para montar em casa — um miminho para fazer com os mais pequenos.",
    "opcoes": [
      "Kit para montar",
      "Madeira de choupo",
      "Cordão de linho"
    ],
    "novo": false,
    "img": "https://cc77b35e42.clvaw-cdnwnd.com/e5e7bed16151ce2732e00e1d9935f2ac/200004280-f14a5f14a7/700/CASA4.png?ph=cc77b35e42"
  },
  {
    "ref": "ND-NAT-04",
    "grupo": "arvore",
    "nome": "Enfeite Asa de Anjo",
    "desc": "Uma asa com uma foto e um nome, para lembrar quem nos faz falta neste Natal.",
    "opcoes": [
      "Acrílico",
      "Madeira brilho"
    ],
    "novo": false,
    "img": "https://cc77b35e42.clvaw-cdnwnd.com/e5e7bed16151ce2732e00e1d9935f2ac/200003344-3193b3193d/700/NAT_AC04%20-%20A.png?ph=cc77b35e42"
  },
  {
    "ref": "ND-NAT-05",
    "grupo": "arvore",
    "nome": "Enfeite Clássico com Fita",
    "desc": "O enfeite de sempre, com o teu toque: foto, nome ou data, e fita de organza. Fica bem nas lembranças para turmas, equipas e famílias.",
    "opcoes": [
      "Brilho",
      "Glitter",
      "Mate",
      "Prateado",
      "Acrílico"
    ],
    "novo": false,
    "img": "https://cc77b35e42.clvaw-cdnwnd.com/e5e7bed16151ce2732e00e1d9935f2ac/200003328-3fe773fe79/700/NAT_AC03%20-%20A.png?ph=cc77b35e42"
  },
  {
    "ref": "ND-NAT-06",
    "grupo": "arvore",
    "nome": "Bola com Laço e Pérola",
    "desc": "Uma bola com laço e pérola, personalizada com uma imagem tua. Dá para fazer uma série com o nome de cada pessoa da família.",
    "opcoes": [
      "Brilho",
      "Glitter",
      "Mate",
      "Prateado",
      "Acrílico"
    ],
    "novo": false,
    "img": "https://cc77b35e42.clvaw-cdnwnd.com/e5e7bed16151ce2732e00e1d9935f2ac/200003349-9144b9144e/700/NAT_AC02%20-%20A.png?ph=cc77b35e42"
  },
  {
    "ref": "ND-NAT-07",
    "grupo": "arvore",
    "nome": "Enfeite Lua",
    "desc": "Uma lua em acrílico transparente com a tua foto. É o primeiro Natal do bebé? Fica com o nome e a data de nascimento.",
    "opcoes": [
      "Acrílico 3 mm"
    ],
    "novo": false,
    "img": "https://cc77b35e42.clvaw-cdnwnd.com/e5e7bed16151ce2732e00e1d9935f2ac/200003315-1ba841ba87/700/NAT_AC01%20-%20A-4.png?ph=cc77b35e42"
  },
  {
    "ref": "ND-NAT-08",
    "grupo": "advento",
    "nome": "Enfeite do Advento",
    "desc": "Um enfeite com laço e pérola para contar os dias até ao Natal, personalizado com o nome de quem espera pelo Pai Natal.",
    "opcoes": [
      "Laço + pérola"
    ],
    "novo": false,
    "img": "https://cc77b35e42.clvaw-cdnwnd.com/e5e7bed16151ce2732e00e1d9935f2ac/200003393-e48b5e48b7/700/NAT_AC06%20-%20B.png?ph=cc77b35e42"
  },
  {
    "ref": "ND-NAT-09",
    "grupo": "advento",
    "nome": "Árvore do Advento",
    "desc": "Uma árvore de madeira para contar os dias de 1 a 24 de dezembro, com nome ou foto. Volta a sair da caixa em todos os Natais.",
    "opcoes": [
      "Madeira",
      "Peça de mesa"
    ],
    "novo": false,
    "img": "https://cc77b35e42.clvaw-cdnwnd.com/e5e7bed16151ce2732e00e1d9935f2ac/200003387-adca9adcab/700/NAT_AC05%20-%20B.png?ph=cc77b35e42"
  },
  {
    "ref": "ND-NAT-10",
    "grupo": "decor",
    "nome": "Árvore de Natal Verde",
    "desc": "Uma pequena árvore de mesa, com um enfeite personalizado à frente. Fica bem num móvel, numa secretária ou como lembrança de empresa.",
    "opcoes": [
      "Enfeite em acrílico",
      "Enfeite em madeira brilho"
    ],
    "novo": false,
    "img": "https://cc77b35e42.clvaw-cdnwnd.com/e5e7bed16151ce2732e00e1d9935f2ac/200003438-d8620d8622/700/NAT_AC10%20-%20A.png?ph=cc77b35e42"
  },
  {
    "ref": "ND-NAT-11",
    "grupo": "decor",
    "nome": "Árvore de Natal Vermelha",
    "desc": "A mesma árvore de mesa, em vermelho, com um enfeite personalizado à frente.",
    "opcoes": [
      "Enfeite em acrílico",
      "Enfeite em madeira brilho"
    ],
    "novo": false,
    "img": "https://cc77b35e42.clvaw-cdnwnd.com/e5e7bed16151ce2732e00e1d9935f2ac/200003429-4c9d94c9de/700/NAT_AC09%20-%20A.png?ph=cc77b35e42"
  },
  {
    "ref": "ND-NAT-12",
    "grupo": "decor",
    "nome": "Moldura Feliz Natal com Rena",
    "desc": "Uma moldura de madeira com uma rena em madeira maciça, para a foto de família deste Natal.",
    "opcoes": [
      "Rena em madeira maciça",
      "Tom carvalho"
    ],
    "novo": false,
    "img": "https://cc77b35e42.clvaw-cdnwnd.com/e5e7bed16151ce2732e00e1d9935f2ac/200004290-3c8133c815/700/A3-8.png?ph=cc77b35e42"
  },
  {
    "ref": "ND-NAT-13",
    "grupo": "decor",
    "nome": "Molduras de Natal",
    "desc": "Três modelos de moldura com motivos de Natal, em madeira tom carvalho. Para a foto do ano ou um postal que não vai para o lixo.",
    "opcoes": [
      "3 modelos",
      "Tom carvalho"
    ],
    "novo": false,
    "img": "https://cc77b35e42.clvaw-cdnwnd.com/e5e7bed16151ce2732e00e1d9935f2ac/200003415-432d9432db/700/NAT_AC08%20-%20A.png?ph=cc77b35e42"
  },
  {
    "ref": "ND-NAT-14",
    "grupo": "textil",
    "nome": "Meias de Natal Personalizadas",
    "desc": "Meias estampadas a toda a volta com a tua imagem: a cara do avô, o cão da família ou um padrão só vosso. Boas para a troca de presentes.",
    "opcoes": [
      "S/M",
      "L/XL",
      "Impressão integral"
    ],
    "novo": false,
    "img": "https://cc77b35e42.clvaw-cdnwnd.com/e5e7bed16151ce2732e00e1d9935f2ac/200004319-11a8211a84/700/A3-3.png?ph=cc77b35e42"
  }
];
