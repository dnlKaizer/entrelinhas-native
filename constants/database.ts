// Este arquivo mapeia a estrutura do banco de dados, facilitando o acesso aos nomes das tabelas e colunas em todo o projeto.
// Ele é especialmente útil para evitar erros de digitação e para manter a consistência ao acessar o banco de dados.
// Além disso, ele pode ser facilmente atualizado caso haja mudanças na estrutura do banco de dados, centralizando as alterações em um único local.

export const DB_SCHEMA = {
    BOOKS: {
        TABLE: 'Livro',
        COLUMNS: {
            ID: 'idLivro',
            USER_ID: 'idUsuario',
            NAME: 'nome',
            NUM_PAG: 'numPag',
            STATUS: 'status',
            AUTHOR: 'autor',
            YEAR: 'ano',
            TEXT: 'text',
            DT_INICIAL: 'dtInicial',
            DT_FINAL: 'dtFinal',
            NUM_PAG_READ: 'numPagRead',
            IMG: 'img',
        }
    },
    LEITURA: {
        TABLE: 'Leitura',
        COLUMNS: {
            ID: 'idLeitura',
            LIVRO_ID: 'idLivro',
            PAG_INICIAL: 'pagInicial',
            PAG_FINAL: 'pagFinal',
            START: 'start',
            END: 'end',
        }
    },
    PROFILE: {
        TABLE: 'profile',
        COLUMNS: {
            ID: 'id',
            IS_ADMIN: 'is_admin'
        }
    }
} as const;