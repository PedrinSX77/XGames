# 📋 Backlog Oficial — Projeto XGames

---

## 🟡 SPRINT 2: Autenticação Ponta a Ponta e Donos dos Posts (Fase 2)

### ✅ [TASK-2.1] Criar Middleware de Proteção JWT (Backend) — _Concluída_

- [x] Ler o cabeçalho `Authorization` da requisição (`Bearer <token>`).
- [x] Caso não exista cabeçalho ou token, encaminhar erro com status `401` para o `errorHandler.js`.
- [x] Validar o token usando `jsonwebtoken` e `JWT_SECRET`.
- [x] Anexar o payload decodificado (`id` e `username`) em `req.user` e avançar o fluxo.

---

### ✅ [TASK-2.2] Refatorar Módulo de Posts para Usar o Autor Real (Backend) — _Concluída_

- [x] Na validação Zod do Post (`postSchema.js`), remover a exigência de `authorName` (validar apenas `content`).
- [x] No `setCreatePost`, extrair `req.user.id` e repassar para `createPost` gravar na coluna `authorId`.
- [x] Na busca `collectAllPosts` e no retorno do `createPost`, incluir os dados públicos do relacionamento `author` (`id`, `name` e `username`, sem `password`).

---

### ✅ [TASK-2.3] Retornar Dados do Usuário no Login e Rota `/me` (Backend)

- **Contexto:** Atualmente a função `login` retorna apenas a string pura do token. O Frontend vai precisar saber o nome, `@username` e ID do usuário logado.
- **Onde atuar:** `backend/src/service/authService.js`, `backend/src/controllers/authController.js` e `backend/src/routes/authRouter.js`.
- **Requisitos Técnicos:**
  - [x] Padronizar o retorno de `POST /login` para um objeto JSON contendo `{ token, user: { id, name, username, email } }`.
  - [x] _(Opcional, mas recomendado)_ Criar uma rota protegida `GET /me` que usa o middleware de autenticação JWT e devolve os dados públicos atualizados do usuário logado.
- **Critério de Aceite:** Ao logar no Insomnia, a resposta traz o objeto com `token` e `user` sem o campo `password`.

---

### ✅ [TASK-2.4] Roteamento e Páginas de Login e Cadastro (Frontend)

- **Contexto:** O Frontend hoje só tem uma tela única em `App.tsx`. Precisamos de navegação entre páginas.
- **Onde atuar:** `frontend/package.json`, `frontend/src/pages/`, `frontend/src/routes/` e `frontend/src/App.tsx`.
- **Requisitos Técnicos:**
  - [x] Instalar `react-router-dom` no frontend.
  - [x] Criar a página de **Cadastro (`/register`)** com inputs controlados para `name`, `username`, `email` e `password`, consumindo `POST /register` e redirecionando para `/login` em caso de sucesso. Exibir mensagem de erro da API na tela se falhar.
  - [x] Criar a página de **Login (`/login`)** consumindo `POST /login`.
  - [x] Criar a página principal do **Feed (`/`)**.
- **Critério de Aceite:** Navegar entre `/login`, `/register` e `/` funcionando pelo navegador.

---

### ✅ [TASK-2.5] Estado Global de Autenticação e Persistência (Frontend)

- **Contexto:** Quando o usuário faz login e dá F5 na página, ele não pode ser deslogado.
- **Onde atuar:** `frontend/src/contexts/` e `frontend/src/types/type.ts`.
- **Requisitos Técnicos:**
  - [x] Definir a `interface User` em `frontend/src/types/type.ts`.
  - [x] Guardar o `token` (e dados básicos do usuário) no `localStorage` ao fazer login.
  - [x] Criar um `AuthContext` que disponibilize: `user`, `token`, `isAuthenticated`, função `signIn` e função `signOut` (logout) para toda a aplicação.
  - [x] Criar um cabeçalho (Navbar) exibindo o `@username` do usuário logado e um botão de "Sair".
- **Critério de Aceite:** Ao logar, o usuário vai para `/`, vê seu `@username` no topo, dá F5 na página e continua logado. Ao clicar em "Sair", o `localStorage` é limpo e ele volta para `/login`.

---

### ⏳ [TASK-2.6] Integrar `<Form />`, `<Feed />` e `<PostCard />` com Auth (Frontend)

- **Contexto:** Atualizar os componentes da Fase 1 para o novo modelo com usuário autenticado e atualizar a lista sem precisar recarregar a página.
- **Onde atuar:** `frontend/src/types/type.ts`, `frontend/src/components/Form/index.tsx`, `frontend/src/components/Feed/index.tsx` e `frontend/src/components/PostCard/index.tsx`.
- **Requisitos Técnicos:**
  - [x] Atualizar a `interface Post` em `type.ts` trocando `authorName: string` por `author: { id: string; name: string; username: string }`.
  - [x] No `Form`: remover completamente o input de "Nome do Autor". Enviar apenas `content` no body e incluir o header `Authorization: Bearer <token>` na requisição `POST /posts`.
  - [ ] **Comunicação Pai-Filho (Elevação de Estado / Callback):** Quando o `Form` criar um post com sucesso, o `Feed` deve exibir o novo post imediatamente no topo da lista sem o usuário precisar dar F5.
  - [ ] No `PostCard`: exibir o nome real (`post.author.name`) e o `@username` (`@post.author.username`) ao lado.

---

## 🟠 SPRINT 3: Interações Sociais — Likes, Comentários e Exclusão (Fase 3)

### ⏳ [TASK-3.1] Modelagem de `Like` e `Comment` no Banco (Backend)

- **Onde atuar:** `backend/prisma/schema.prisma`.
- **Requisitos Técnicos:**
  - [ ] Criar model `Like` relacionando `userId` (`User`) e `postId` (`Post`) com `onDelete: Cascade`.
  - [ ] Adicionar restrição composta única (`@@unique([userId, postId])`) no model `Like` para impedir curtidas duplicadas do mesmo usuário no mesmo post.
  - [ ] Criar model `Comment` com `id`, `content` (máx 280 chars), `createdAt`, `authorId` (`User`) e `postId` (`Post`) com `onDelete: Cascade`.
  - [ ] Rodar a migration.

---

### ⏳ [TASK-3.2] Sistema de Toggle Like e Contagem no Feed (Backend)

- **Requisitos Técnicos:**
  - [ ] Criar endpoint protegido `POST /posts/:id/like`.
  - [ ] **Lógica de Toggle:** Verificar se já existe um `Like` daquele `req.user.id` naquele `postId`. Se existir, deleta o registro (descurtir). Se não existir, cria o registro (curtir).
  - [ ] Atualizar a listagem de posts (`GET /posts`) para retornar a contagem total de likes e de comentários de cada post (usando `_count` do Prisma) e se o usuário atual já curtiu aquele post.

---

### ⏳ [TASK-3.3] Endpoints de Comentários e Exclusão de Post (Backend)

- **Requisitos Técnicos:**
  - [ ] `POST /posts/:id/comments` (protegido): cria um comentário em um post (validado via Zod).
  - [ ] `GET /posts/:id/comments`: lista os comentários de um post específico com os dados do `author`, ordenados por data.
  - [ ] `DELETE /posts/:id` (protegido): busca o post pelo `id`. Verifica se `post.authorId === req.user.id`. Se não for o dono, retorna erro **`403 Forbidden`** (proteção anti-IDOR). Se for o dono, deleta do banco.

---

### ⏳ [TASK-3.4] UI de Curtidas, Comentários e Lixeira no `<PostCard />` (Frontend)

- **Requisitos Técnicos:**
  - [ ] Botão de coração no `PostCard` dispara `POST /posts/:id/like` e atualiza o contador e a cor do ícone na tela instantaneamente.
  - [ ] Se o post pertencer ao usuário logado (`post.author.id === user.id`), exibir botão de excluir post.
  - [ ] Ao clicar no ícone de comentário do card, expandir uma seção abaixo do post que carrega os comentários daquele post e exibe um mini-input para enviar uma resposta.

---

## 🔴 SPRINT 4: Conexões — Seguidores e Feed Personalizado (Fase 4)

### ⏳ [TASK-4.1] Auto-Relacionamento `Follow` no Prisma (Backend)

- **Requisitos Técnicos:**
  - [ ] Criar model `Follow` com `followerId` (quem segue) e `followingId` (quem é seguido), ambos apontando para `User`, com `@@unique([followerId, followingId])`.
  - [ ] Impedir na regra de negócio que um usuário siga a si mesmo (`followerId === followingId` deve retornar erro `400`).
  - [ ] Criar endpoint `POST /users/:id/follow` (toggle: se já segue, deixa de seguir; se não segue, passa a seguir).

---

### ⏳ [TASK-4.2] O Algoritmo do Feed "Seguindo" vs "Explorar" (Backend + Frontend)

- **Requisitos Técnicos:**
  - [ ] No Backend, permitir filtrar os posts (`GET /posts/following` ou `GET /posts?filter=following`).
  - [ ] Na busca filtrada, retornar apenas posts cujo `authorId` esteja na lista de pessoas que o usuário logado segue.
  - [ ] No Frontend (`Feed/index.tsx`), criar duas abas no topo: **"Explorar (Global)"** e **"Seguindo"**, alternando a busca da API.

---

## 🟣 SPRINT 5: Página de Perfil e Polimento de Portfólio (Fase 5)

### ⏳ [TASK-5.1] Página de Perfil Público `/@username` (Full Stack)

- **Requisitos Técnicos:**
  - [ ] **Backend (`GET /users/:username`):** Retornar dados públicos do usuário (`id`, `name`, `username`, `bio` opcional), contadores (`_count` de posts, seguidores e seguindo), booleano `isFollowing` (se o usuário logado já segue esse perfil) e a lista de posts criados exclusivamente por ele.
  - [ ] **Frontend (`/profile/:username`):** Ao clicar no nome ou `@username` em qualquer `PostCard`, navegar para a página de perfil daquele autor, exibindo cabeçalho com avatar, contadores, botão de "Seguir / Deixar de seguir" e a lista de posts dele.
