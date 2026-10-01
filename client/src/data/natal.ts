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
    "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20viewBox%3D%270%200%20400%20400%27%3E%20%3Cdefs%3E%3CradialGradient%20id%3D%27bg%27%20cx%3D%2750%25%27%20cy%3D%2745%25%27%20r%3D%2770%25%27%3E%3Cstop%20offset%3D%270%27%20stop-color%3D%27%231d3b4f%27/%3E%3Cstop%20offset%3D%271%27%20stop-color%3D%27%230b1622%27/%3E%3C/radialGradient%3E%20%3CradialGradient%20id%3D%27halo%27%20cx%3D%2750%25%27%20cy%3D%2750%25%27%20r%3D%2750%25%27%3E%3Cstop%20offset%3D%270%27%20stop-color%3D%27%23b8ffd9%27%20stop-opacity%3D%27.55%27/%3E%3Cstop%20offset%3D%271%27%20stop-color%3D%27%23b8ffd9%27%20stop-opacity%3D%270%27/%3E%3C/radialGradient%3E%20%3CradialGradient%20id%3D%27ball%27%20cx%3D%2742%25%27%20cy%3D%2738%25%27%20r%3D%2765%25%27%3E%3Cstop%20offset%3D%270%27%20stop-color%3D%27%23f4fff8%27/%3E%3Cstop%20offset%3D%27.55%27%20stop-color%3D%27%23a6f5c9%27/%3E%3Cstop%20offset%3D%271%27%20stop-color%3D%27%234fc993%27/%3E%3C/radialGradient%3E%3C/defs%3E%20%3Crect%20width%3D%27400%27%20height%3D%27400%27%20fill%3D%27url%28%23bg%29%27/%3E%20%3Cg%20fill%3D%27%23fff%27%20opacity%3D%27.7%27%3E%3Ccircle%20cx%3D%2760%27%20cy%3D%2770%27%20r%3D%271.6%27/%3E%3Ccircle%20cx%3D%27330%27%20cy%3D%2752%27%20r%3D%271.2%27/%3E%3Ccircle%20cx%3D%27350%27%20cy%3D%27300%27%20r%3D%271.5%27/%3E%3Ccircle%20cx%3D%2748%27%20cy%3D%27320%27%20r%3D%271.1%27/%3E%3Ccircle%20cx%3D%27120%27%20cy%3D%27360%27%20r%3D%271.3%27/%3E%3Ccircle%20cx%3D%27300%27%20cy%3D%27370%27%20r%3D%271%27/%3E%3Ccircle%20cx%3D%27370%27%20cy%3D%27160%27%20r%3D%271.2%27/%3E%3C/g%3E%20%3Cpath%20d%3D%27M200%200%20V118%27%20stroke%3D%27%23c9a24a%27%20stroke-width%3D%273%27/%3E%20%3Cpath%20d%3D%27M200%20118%20c-30%20-26%20-52%20-6%20-28%206%20M200%20118%20c30%20-26%2052%20-6%2028%206%27%20stroke%3D%27%23e7f6ff%27%20stroke-width%3D%275%27%20fill%3D%27none%27%20stroke-linecap%3D%27round%27%20opacity%3D%27.85%27/%3E%20%3Ccircle%20cx%3D%27200%27%20cy%3D%27225%27%20r%3D%27150%27%20fill%3D%27url%28%23halo%29%27/%3E%20%3Ccircle%20cx%3D%27200%27%20cy%3D%27225%27%20r%3D%2796%27%20fill%3D%27url%28%23ball%29%27/%3E%20%3Cg%20fill%3D%27none%27%20stroke%3D%27%232f8f63%27%20stroke-width%3D%275%27%20stroke-linecap%3D%27round%27%20opacity%3D%27.75%27%3E%20%3Cpath%20d%3D%27M200%20180%20l0%2090%20M161%20202%20l78%2046%20M161%20248%20l78%20-46%27/%3E%3C/g%3E%20%3Cellipse%20cx%3D%27172%27%20cy%3D%27190%27%20rx%3D%2722%27%20ry%3D%2712%27%20fill%3D%27%23fff%27%20opacity%3D%27.55%27%20transform%3D%27rotate%28-30%20172%20190%29%27/%3E%20%3Ctext%20x%3D%27200%27%20y%3D%27372%27%20text-anchor%3D%27middle%27%20font-family%3D%27Georgia%2Cserif%27%20font-size%3D%2720%27%20fill%3D%27%23d9fbe8%27%20letter-spacing%3D%273%27%3EBRILHA%20NO%20ESCURO%3C/text%3E%20%3C/svg%3E"
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
