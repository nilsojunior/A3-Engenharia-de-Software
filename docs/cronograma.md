# Cronograma Kanban - Projeto Site de Adoção de Pets (Sem Login/Cadastro)

## Informações Gerais

- **Equipes**: Frontend (3 pessoas), Backend (3 pessoas)
- **Duração**: 5 semanas
- **Tecnologias**: Frontend (React + Tailwind), Backend (Node.js + Express + MySQL)
- **Colunas Kanban**: Backlog, To Do, In Progress, Review, Done

## Quadro Kanban por Semana

### Semana 1: Planejamento e Configuração

| Tarefa | Descrição                                                | Equipe             | Dependências | Status  |
| ------ | -------------------------------------------------------- | ------------------ | ------------ | ------- |
| T1     | Definir requisitos do site (funcionalidades, wireframes) | Frontend + Backend | Nenhuma      | Backlog |
| T2     | Configurar ambiente React + Tailwind via CDN             | Frontend           | Nenhuma      | Backlog |
| T3     | Configurar servidor Node.js + Express                    | Backend            | Nenhuma      | Backlog |
| T4     | Modelar banco de dados (tabelas: Pets, Solicitações)     | Backend            | T1           | Backlog |
| T5     | Criar repositório Git e configurar CI/CD básico          | Backend            | Nenhuma      | Backlog |

### Semana 2: Backend Inicial e Componentes Frontend

| Tarefa | Descrição                                                  | Equipe   | Dependências | Status  |
| ------ | ---------------------------------------------------------- | -------- | ------------ | ------- |
| T6     | Criar API de gerenciamento de Pets (CRUD, upload de fotos) | Backend  | T4           | Backlog |
| T7     | Criar API de filtros de busca (espécie, localização)       | Backend  | T4           | Backlog |
| T8     | Desenvolver componente de Header e Footer                  | Frontend | T2           | Backlog |
| T9     | Desenvolver página inicial (Home) com Tailwind             | Frontend | T2           | Backlog |
| T10    | Configurar rotas no React (React Router)                   | Frontend | T2           | Backlog |

### Semana 3: APIs e Páginas Principais

| Tarefa | Descrição                                       | Equipe   | Dependências | Status  |
| ------ | ----------------------------------------------- | -------- | ------------ | ------- |
| T11    | Criar API de solicitações de adoção             | Backend  | T4           | Backlog |
| T12    | Desenvolver página de lista de pets com filtros | Frontend | T10, T6, T7  | Backlog |
| T13    | Desenvolver página de detalhes do pet           | Frontend | T10, T6      | Backlog |
| T14    | Desenvolver formulário de solicitação de adoção | Frontend | T10, T11     | Backlog |

### Semana 4: Integração e Ajustes

| Tarefa | Descrição                                                    | Equipe             | Dependências | Status  |
| ------ | ------------------------------------------------------------ | ------------------ | ------------ | ------- |
| T15    | Integrar frontend com API de pets (listagem e detalhes)      | Frontend           | T6, T12, T13 | Backlog |
| T16    | Integrar frontend com API de solicitações de adoção          | Frontend           | T11, T14     | Backlog |
| T17    | Testar fluxos de busca, visualização e solicitação de adoção | Frontend + Backend | T15, T16     | Backlog |
| T18    | Ajustar UI/UX com base em feedback                           | Frontend           | T17          | Backlog |

### Semana 5: Finalização e Deploy

| Tarefa | Descrição                                       | Equipe             | Dependências | Status  |
| ------ | ----------------------------------------------- | ------------------ | ------------ | ------- |
| T19    | Testar responsividade do site                   | Frontend           | T18          | Backlog |
| T20    | Otimizar performance das APIs                   | Backend            | T17          | Backlog |
| T21    | Corrigir bugs identificados nos testes          | Frontend + Backend | T17          | Backlog |
| T22    | Configurar deploy do frontend (ex.: Netlify)    | Frontend           | T19          | Backlog |
| T23    | Configurar deploy do backend (ex.: Render)      | Backend            | T20          | Backlog |
| T24    | Documentar APIs e fluxo do site                 | Backend            | T23          | Backlog |
| T25    | Entregar projeto e apresentar para stakeholders | Frontend + Backend | T22, T23     | Backlog |

## Não Feito

### Semana 1

- [x] Modelar banco de dados (tabelas: Pets, Solicitações)

### Semana 2

- Criar API de gerenciamento de Pets (CRUD, upload de fotos)
- Criar API de filtros de busca (espécie, localização)
- Configurar rotas no React (React Router)
