# Instruções de Deploy Permanente – Ninho do Dragão

## Opção 1: Deploy com Netlify (Recomendado - Gratuito)

O Netlify oferece alojamento gratuito com HTTPS automático, atualizações contínuas e excelente performance.

### Passos:

1. **Aceder ao Netlify:**
   - Vai para [https://www.netlify.com](https://www.netlify.com)
   - Clica em "Sign up" e escolhe "GitHub"
   - Autoriza o Netlify a aceder aos teus repositórios

2. **Conectar o Repositório:**
   - Clica em "New site from Git"
   - Seleciona "GitHub" como provider
   - Procura e seleciona o repositório `ninhododragao/ninho-do-dragao`

3. **Configurar o Build:**
   - **Build command:** `cd client && pnpm install && pnpm build`
   - **Publish directory:** `client/dist`
   - Clica em "Deploy site"

4. **Configurar Domínio (Opcional):**
   - Após o deploy, o Netlify atribui um domínio temporário (ex: `ninho-do-dragao-xxx.netlify.app`)
   - Para usar um domínio personalizado (ex: `ninhododragao.pt`):
     - Vai a "Site settings" → "Domain management"
     - Clica em "Add custom domain"
     - Segue as instruções para atualizar os DNS do teu registrador

---

## Opção 2: Deploy com Vercel (Alternativa)

1. **Aceder ao Vercel:**
   - Vai para [https://vercel.com](https://vercel.com)
   - Clica em "Sign Up" e escolhe "GitHub"

2. **Importar Projeto:**
   - Clica em "Add New" → "Project"
   - Seleciona o repositório `ninhododragao/ninho-do-dragao`

3. **Configurar:**
   - **Framework Preset:** Vite
   - **Build Command:** `cd client && pnpm install && pnpm build`
   - **Output Directory:** `client/dist`
   - Clica em "Deploy"

---

## Opção 3: Deploy Manual com GitHub Pages

1. **Criar um ficheiro `.github/workflows/deploy.yml`:**
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: pnpm/action-setup@v2
         - uses: actions/setup-node@v3
           with:
             node-version: '20'
             cache: 'pnpm'
         - run: cd client && pnpm install && pnpm build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./client/dist
   ```

2. **Ativar GitHub Pages:**
   - Vai a "Settings" → "Pages"
   - Em "Source", seleciona "Deploy from a branch"
   - Seleciona `gh-pages` como branch

---

## Após o Deploy

✅ **O site estará online e acessível 24/7**

✅ **Atualizações automáticas:** Cada vez que fazes push para o `main`, o site é redeployado automaticamente

✅ **HTTPS automático:** Todos os dados são encriptados

✅ **Monitorização:** Podes ver os logs de deploy na dashboard do Netlify/Vercel

---

## Próximos Passos

1. Escolhe uma das opções acima (Netlify é a mais simples)
2. Segue os passos de configuração
3. Partilha o URL do teu site com os clientes
4. Continua a atualizar o repositório conforme necessário

---

**Ninho do Dragão – by Makiwa**
*Clareza, Conformidade e Confiança.*
