# Guia Rápido - Ninho do Dragão – by Makiwa

## 🚀 Acesso Rápido

| Recurso | URL |
|---------|-----|
| **Site Online** | https://ninho-do-dragao.netlify.app |
| **Repositório GitHub** | https://github.com/ninhododragao/ninho-do-dragao |
| **Painel Netlify** | https://app.netlify.com/projects/ninho-do-dragao |
| **Documentação Completa** | `GUIA_GESTAO_SITE.md` |

---

## 📝 Tarefas Comuns

### 1. Atualizar Texto da Homepage

```bash
# Editar o ficheiro
nano client/src/pages/Home.tsx

# Depois de editar, fazer commit
git add .
git commit -m "Atualizar descrição da homepage"
git push origin main
```

**Resultado:** Site atualizado em 30-60 segundos

---

### 2. Adicionar um Novo Produto

1. Abre `client/src/pages/Home.tsx`
2. Localiza a secção "Os nossos produtos"
3. Copia um bloco de produto
4. Modifica o nome, emoji e descrição
5. Faz commit e push

```bash
git add .
git commit -m "Adicionar novo produto: [Nome]"
git push origin main
```

---

### 3. Atualizar Políticas Legais

```bash
# Editar ficheiro de políticas
nano client/src/pages/Policies.tsx

# Fazer commit
git add .
git commit -m "Atualizar políticas legais"
git push origin main
```

---

### 4. Adicionar Imagem

1. Coloca a imagem em `client/public/images/`
2. No código, usa: `<img src="/images/nome.jpg" alt="Descrição" />`
3. Faz commit e push

---

### 5. Reverter Alterações

Se algo correr mal:

1. Vai a https://app.netlify.com/projects/ninho-do-dragao/deploys
2. Encontra o deploy anterior que funcionava
3. Clica em "Publish deploy"

**Resultado:** Site volta ao estado anterior em segundos

---

## 🔧 Comandos Essenciais

### Clonar o Repositório (Primeira Vez)
```bash
git clone https://github.com/ninhododragao/ninho-do-dragao.git
cd ninho-do-dragao
```

### Testar Localmente
```bash
cd client
pnpm install
pnpm dev
# Acede a http://localhost:5173
```

### Fazer Alterações e Publicar
```bash
# Editar ficheiros...

git add .
git commit -m "Descrição da alteração"
git push origin main
```

### Ver Status do Git
```bash
git status
```

### Ver Histórico de Commits
```bash
git log --oneline
```

---

## 📊 Monitorização

### Verificar Status do Deploy

1. Vai a https://app.netlify.com/projects/ninho-do-dragao
2. Vê o estado do último deploy
3. Se houver erro, clica em "View deploy log"

### Ver Estatísticas de Visitas

1. Em Netlify, vai a **Web Analytics**
2. Vê quantas visitas o site teve

---

## ⚠️ Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| **Alterações não aparecem** | Aguarda 1 min, limpa cache (Ctrl+Shift+Delete) |
| **Deploy falha** | Verifica o deploy log em Netlify |
| **Imagens não aparecem** | Verifica o caminho: `/images/nome.jpg` |
| **Quero reverter** | Netlify → Deploys → Publish anterior |
| **Não consigo fazer push** | Verifica se tens permissões no GitHub |

---

## 📞 Contactos

- **Email:** makiwa.arts@gmail.com
- **Telefone:** +351 935 852 703
- **WhatsApp:** +351 935 852 703

---

## 📚 Ficheiros Importantes

| Ficheiro | Função |
|----------|--------|
| `client/src/pages/Home.tsx` | Homepage e produtos |
| `client/src/pages/Policies.tsx` | Políticas legais |
| `client/src/pages/CustomOrder.tsx` | Formulário de encomenda |
| `client/src/App.tsx` | Rotas do site |
| `netlify.toml` | Configuração de deploy |

---

## ✅ Checklist Mensal

- [ ] Verificar se o site está online
- [ ] Atualizar conteúdos sazonais
- [ ] Adicionar novos produtos
- [ ] Verificar estatísticas de visitas
- [ ] Testar links e formulários
- [ ] Fazer backup do código (já está no GitHub)

---

## 🎯 Próximos Passos

1. **Registar domínio `.pt`** (opcional)
2. **Adicionar Google Analytics** (opcional)
3. **Criar blog** (futuro)
4. **Adicionar pagamento online** (futuro)

---

**Última atualização:** 20 de abril de 2026

Para mais detalhes, consulta `GUIA_GESTAO_SITE.md`
