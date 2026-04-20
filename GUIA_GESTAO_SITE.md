# Guia de Gestão do Site Ninho do Dragão – by Makiwa

## 📋 Índice
1. [Acesso e Login](#acesso-e-login)
2. [Estrutura do Site](#estrutura-do-site)
3. [Como Atualizar Conteúdos](#como-atualizar-conteúdos)
4. [Gestão de Produtos](#gestão-de-produtos)
5. [Páginas Especiais](#páginas-especiais)
6. [Políticas Legais](#políticas-legais)
7. [Monitorização e Manutenção](#monitorização-e-manutenção)
8. [Troubleshooting](#troubleshooting)
9. [Contactos de Suporte](#contactos-de-suporte)

---

## Acesso e Login

### Plataformas Necessárias

#### 1. **GitHub** (Repositório do Código)
- **URL:** https://github.com/ninhododragao/ninho-do-dragao
- **Acesso:** Com a tua conta GitHub (ninhododragao)
- **Função:** Guardar e versionar o código do site

#### 2. **Netlify** (Hosting e Deploy)
- **URL:** https://app.netlify.com
- **Acesso:** Com a tua conta Netlify (makiwa.arts@gmail.com)
- **Função:** Publicar o site online e gerenciar deploys

#### 3. **Site Publicado**
- **URL:** https://ninho-do-dragao.netlify.app
- **Acesso:** Público (sem login necessário)

---

## Estrutura do Site

### Diretórios Principais

```
ninho-do-dragao/
├── client/                    # Código do site (React + Vite)
│   ├── src/
│   │   ├── pages/            # Páginas do site
│   │   │   ├── Home.tsx      # Página inicial
│   │   │   ├── Policies.tsx  # Políticas legais (Termos, Privacidade, etc.)
│   │   │   ├── CustomOrder.tsx # Formulário de encomenda
│   │   │   └── ...
│   │   ├── components/       # Componentes reutilizáveis
│   │   └── App.tsx           # Configuração de rotas
│   ├── dist/                 # Ficheiros compilados (gerado automaticamente)
│   └── package.json          # Dependências do projeto
├── docs/                     # Documentação
│   ├── termos_e_condicoes.md
│   ├── politica_privacidade.md
│   ├── politica_trocas_devolucoes.md
│   ├── garantia_falta_conformidade.md
│   ├── livro_reclamacoes_ral.md
│   └── resumo_encomenda_template.html
├── netlify.toml              # Configuração do deploy
└── GUIA_GESTAO_SITE.md       # Este ficheiro
```

### Páginas do Site

| Página | Ficheiro | Descrição |
|--------|----------|-----------|
| **Home** | `Home.tsx` | Página inicial com apresentação e produtos |
| **Termos e Condições** | `Policies.tsx` | Termos legais e identificação fiscal |
| **Privacidade** | `Policies.tsx` | Política de privacidade (RGPD) |
| **Devoluções** | `Policies.tsx` | Política de trocas e devoluções |
| **Garantia** | `Policies.tsx` | Garantia e falta de conformidade |
| **RAL** | `Policies.tsx` | Resolução Alternativa de Litígios |
| **Reclamações** | `Policies.tsx` | Livro de Reclamações Eletrónico |
| **Encomenda** | `CustomOrder.tsx` | Formulário de encomenda personalizada |

---

## Como Atualizar Conteúdos

### Passo 1: Clonar o Repositório (Primeira Vez)

Se ainda não tens o código localmente:

```bash
git clone https://github.com/ninhododragao/ninho-do-dragao.git
cd ninho-do-dragao
```

### Passo 2: Fazer Alterações

#### Exemplo 1: Atualizar Texto da Homepage

1. Abre o ficheiro: `client/src/pages/Home.tsx`
2. Localiza o texto que queres alterar
3. Edita o conteúdo
4. Guarda o ficheiro

#### Exemplo 2: Adicionar um Novo Produto

1. Abre `client/src/pages/Home.tsx`
2. Localiza a secção "Os nossos produtos"
3. Copia um bloco de produto existente
4. Modifica o nome, descrição e emoji
5. Guarda

### Passo 3: Testar Localmente (Opcional)

Para ver as alterações antes de publicar:

```bash
cd client
pnpm install
pnpm dev
```

Depois acede a `http://localhost:5173` no teu navegador.

### Passo 4: Fazer Commit e Push

```bash
# Adicionar ficheiros alterados
git add .

# Criar um commit com descrição
git commit -m "Atualizar descrição do produto X"

# Enviar para GitHub
git push origin main
```

### Passo 5: Deploy Automático

Após fazer push:
1. O Netlify deteta automaticamente a alteração
2. Compila o site
3. Publica online em 30-60 segundos
4. Podes verificar o status em https://app.netlify.com/projects/ninho-do-dragao

---

## Gestão de Produtos

### Adicionar um Novo Produto

**Ficheiro:** `client/src/pages/Home.tsx`

Localiza a secção e adiciona um novo bloco:

```jsx
<div className="product-card">
  <h3>📦 Nome do Produto</h3>
  <p>Descrição breve do produto.</p>
  <a href="https://wa.me/351935852703?text=Quero%20encomendar%20...">
    Pedir no WhatsApp
  </a>
</div>
```

### Atualizar Preços

Os preços não estão no website (por segurança). São comunicados via WhatsApp.

Se queres adicionar um preço indicativo:

1. Edita o ficheiro `Home.tsx`
2. Adiciona o preço junto ao produto
3. Faz commit e push

### Adicionar Imagens de Produtos

1. Coloca a imagem em `client/public/images/`
2. No ficheiro `Home.tsx`, adiciona:

```jsx
<img src="/images/nome-imagem.jpg" alt="Descrição" />
```

3. Faz commit e push

---

## Páginas Especiais

### Página "Dia da Mãe"

**Ficheiro:** `client/src/pages/Home.tsx`

Localiza a secção `💝 Dia da Mãe` e atualiza:
- Datas de encomenda
- Produtos disponíveis
- Imagens

### Página "Ovibeja"

**Ficheiro:** `client/src/pages/Home.tsx`

Localiza a secção `## Destaque Ovibeja 2026` e atualiza:
- Descrição do produto
- Imagem
- Data do evento

### Criar uma Nova Página

Para criar uma página completamente nova:

1. Cria um novo ficheiro em `client/src/pages/NovaPage.tsx`
2. Adiciona a rota em `client/src/App.tsx`:

```jsx
<Route path="/nova-pagina" element={<NovaPage />} />
```

3. Adiciona o link no menu em `Home.tsx`
4. Faz commit e push

---

## Políticas Legais

### Atualizar Termos e Condições

**Ficheiro:** `client/src/pages/Policies.tsx`

A página de políticas está estruturada em abas. Para atualizar:

1. Abre `Policies.tsx`
2. Localiza a aba "Termos e Condições"
3. Edita o conteúdo
4. Faz commit e push

### Adicionar Informação de Conformidade

Se precisas de adicionar informações legais:

1. Edita `Policies.tsx`
2. Adiciona o conteúdo na aba apropriada
3. Faz commit e push

### Atualizar Dados de Contacto

**Ficheiro:** `client/src/pages/Home.tsx`

Localiza a secção do rodapé e atualiza:
- Telefone
- Email
- Morada
- NIF

---

## Monitorização e Manutenção

### Verificar o Status do Site

1. Acede a https://app.netlify.com/projects/ninho-do-dragao
2. Verifica o estado do último deploy
3. Se houver erro, clica em "View deploy log" para ver detalhes

### Ver o Histórico de Deploys

1. Em Netlify, vai a **Deploys**
2. Vê a lista de todos os deploys anteriores
3. Clica num deploy para ver detalhes

### Reverter para uma Versão Anterior

Se algo correr mal:

1. Em Netlify, vai a **Deploys**
2. Encontra o deploy anterior que funcionava bem
3. Clica nos três pontos (...) e seleciona "Publish deploy"

### Monitorizar Erros

1. Em Netlify, vai a **Logs & metrics**
2. Verifica se há erros no site
3. Se houver, contacta o suporte técnico

---

## Troubleshooting

### O Site Não Aparece Online

**Solução:**
1. Verifica se o deploy foi bem-sucedido em Netlify
2. Aguarda 1-2 minutos (às vezes leva tempo a propagar)
3. Limpa o cache do navegador (Ctrl+Shift+Delete)
4. Tenta aceder novamente

### Alterações Não Aparecem no Site

**Solução:**
1. Verifica se fizeste `git push` (não apenas commit local)
2. Aguarda 30-60 segundos para o Netlify compilar
3. Limpa o cache do navegador
4. Se ainda não funcionar, verifica o deploy log em Netlify

### Imagens Não Aparecem

**Solução:**
1. Verifica se a imagem está em `client/public/images/`
2. Verifica se o caminho no código está correto: `/images/nome.jpg`
3. Verifica se o nome do ficheiro está exatamente igual (maiúsculas/minúsculas)
4. Faz commit e push

### Formulário Não Funciona

**Solução:**
1. Verifica se o link do WhatsApp está correto
2. Testa o link manualmente
3. Se o problema persistir, contacta o suporte

### Deploy Falha com Erro

**Solução:**
1. Clica em "View deploy log" em Netlify
2. Lê a mensagem de erro
3. Corrige o problema no código
4. Faz commit e push novamente

---

## Contactos de Suporte

### Para Questões Técnicas do Site

- **Email:** makiwa.arts@gmail.com
- **Telefone:** +351 935 852 703
- **WhatsApp:** +351 935 852 703

### Para Problemas de Hosting (Netlify)

- **Suporte Netlify:** https://support.netlify.com
- **Status Netlify:** https://www.netlify.com/status

### Para Problemas de Domínio

Se registares um domínio `.pt`:
- Contacta o registrador (ex: sapo.pt, dns.pt)
- Eles ajudam com configurações de DNS

---

## Dicas Importantes

### ✅ Boas Práticas

1. **Sempre faz backup:** Antes de fazer grandes alterações, cria um commit
2. **Testa antes de publicar:** Usa `pnpm dev` para testar localmente
3. **Escreve mensagens claras:** No commit, descreve o que alteraste
4. **Atualiza regularmente:** Revê o site mensalmente
5. **Monitora o tráfego:** Usa Netlify Analytics para ver quantas visitas tens

### ❌ Evita

1. Não edites ficheiros diretamente no GitHub (usa o teu computador)
2. Não apagues ficheiros importantes sem backup
3. Não deixes o site sem atualizar por muito tempo
4. Não publiques conteúdo sem verificar erros de digitação

---

## Próximos Passos

### 1. Registar um Domínio Personalizado (Opcional)

Se queres `ninhododragao.pt` em vez de `ninho-do-dragao.netlify.app`:

1. Vai a um registrador português (ex: sapo.pt, dns.pt)
2. Registra o domínio
3. Em Netlify, vai a **Domain management**
4. Adiciona o domínio personalizado
5. Segue as instruções de DNS

### 2. Adicionar Google Analytics (Opcional)

Para ver estatísticas de visitas:

1. Cria uma conta em https://analytics.google.com
2. Adiciona o código de rastreamento ao site
3. Começa a ver dados de tráfego

### 3. Configurar Email de Contacto (Opcional)

Para receber emails de contacto diretamente:

1. Usa um serviço como Formspree ou Netlify Forms
2. Configura o formulário de contacto
3. Recebe emails automaticamente

---

## Perguntas Frequentes

### P: Quanto custa manter o site online?

**R:** Nada! Netlify oferece hosting gratuito. Só pagarias se registasses um domínio personalizado (cerca de 10-15€/ano).

### P: Posso fazer alterações sem saber programação?

**R:** Sim! Basta editar o texto nos ficheiros `.tsx`. Não precisas de conhecer React para fazer alterações simples.

### P: Com que frequência devo atualizar o site?

**R:** Recomenda-se atualizar conteúdos sazonais (ex: Dia da Mãe, Natal) e adicionar novos produtos regularmente.

### P: E se estragar algo?

**R:** Sem problema! Podes sempre reverter para uma versão anterior em Netlify. Todos os commits estão guardados no GitHub.

### P: Posso adicionar um blog?

**R:** Sim! Seria preciso criar uma nova página e adicionar conteúdo. Contacta o suporte para ajuda.

---

## Resumo Rápido

| Tarefa | Como Fazer | Tempo |
|--------|-----------|-------|
| Atualizar texto | Editar ficheiro `.tsx` → Commit → Push | 5 min |
| Adicionar produto | Copiar bloco → Editar → Commit → Push | 10 min |
| Atualizar imagem | Colocar em `public/` → Referenciar → Commit → Push | 10 min |
| Reverter alteração | Netlify → Deploys → Publish anterior | 1 min |
| Registar domínio | Registrador → Netlify Domain Management | 30 min |

---

**Última atualização:** 20 de abril de 2026

**Versão:** 1.0

**Autor:** Manus AI Assistant

Para questões ou sugestões de melhorias, contacta makiwa.arts@gmail.com.
