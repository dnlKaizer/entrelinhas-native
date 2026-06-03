import { IBook } from "@/types/book.types";

export const readBooks: IBook[] = [
    {
        "idLivro": 47,
        "nome": "Clean Code",
        "numPag": 464,
        "status": "Lido",
        "autor": "Robert C. Martin",
        "ano": 2008,
        "text": "Guia essencial sobre boas práticas de programação, focando em código limpo, legível e sustentável.",
        "dtInicial": "2025-01-01",
        "dtFinal": "2025-03-01",
        "numPagRead": 464,
        "img": "51511986-9897-4fe6-bcd0-f0eb6ad4f061/mnw4n5e3-kcz0zn.jpg",
        "idUsuario": "51511986-9897-4fe6-bcd0-f0eb6ad4f061"
    },
    {
        "idLivro": 48,
        "nome": "Code Complete",
        "numPag": 960,
        "status": "Lido",
        "autor": "Steve McConnell",
        "ano": 2004,
        "text": "Guia abrangente sobre construção de software com foco em qualidade e produtividade.",
        "dtInicial": "2025-03-02",
        "dtFinal": "2025-05-31",
        "numPagRead": 960,
        "img": "51511986-9897-4fe6-bcd0-f0eb6ad4f061/mnw4prbl-z39xik.jpg",
        "idUsuario": "51511986-9897-4fe6-bcd0-f0eb6ad4f061"
    }
];

export const readingBooks: IBook[] = [
    {
        "idLivro": 51,
        "nome": "Introduction to Algorithms",
        "numPag": 1312,
        "status": "Lendo",
        "autor": "Thomas H. Cormen",
        "ano": 2009,
        "text": "Referência completa sobre algoritmos, estruturas de dados e análise de complexidade.",
        "dtInicial": "2026-02-02",
        "dtFinal": null,
        "numPagRead": 456,
        "img": "51511986-9897-4fe6-bcd0-f0eb6ad4f061/mnw4ulpn-3ve8xk.jpg",
        "idUsuario": "51511986-9897-4fe6-bcd0-f0eb6ad4f061"
    },
    {
        "idLivro": 52,
        "nome": "Design Patterns: Elements of Reusable Object-Oriented Software",
        "numPag": 395,
        "status": "Lendo",
        "autor": "Erich Gamma",
        "ano": 1994,
        "text": "Clássico que define padrões de projeto reutilizáveis em programação orientada a objetos.",
        "dtInicial": "2026-03-28",
        "dtFinal": null,
        "numPagRead": 144,
        "img": "51511986-9897-4fe6-bcd0-f0eb6ad4f061/mnw4wypm-ouipcy.jpg",
        "idUsuario": "51511986-9897-4fe6-bcd0-f0eb6ad4f061"
    }
]

export const wishedBooks: IBook[] = [
    {
        "idLivro": 50,
        "nome": "Structure and Interpretation of Computer Programs",
        "numPag": 657,
        "status": "Desejado",
        "autor": "Harold Abelson",
        "ano": 1996,
        "text": "Livro profundo sobre fundamentos da computação usando programação funcional.",
        "dtInicial": null,
        "dtFinal": null,
        "numPagRead": 0,
        "img": "51511986-9897-4fe6-bcd0-f0eb6ad4f061/mnw4stst-vbaonx.jpg",
        "idUsuario": "51511986-9897-4fe6-bcd0-f0eb6ad4f061"
    },
    {
        "idLivro": 49,
        "nome": "O Programador Pragmático",
        "numPag": 352,
        "status": "Desejado",
        "autor": "Andrew Hunt",
        "ano": 1999,
        "text": "Livro sobre mentalidade e boas práticas para desenvolvedores, indo além do código.",
        "dtInicial": null,
        "dtFinal": null,
        "numPagRead": 0,
        "img": "51511986-9897-4fe6-bcd0-f0eb6ad4f061/mnw4r2w1-f3jccd.jpg",
        "idUsuario": "51511986-9897-4fe6-bcd0-f0eb6ad4f061"
    }
]
