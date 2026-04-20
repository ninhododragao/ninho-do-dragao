# Script de Tutorial em Vídeo - Gestão do Site Ninho do Dragão

## 📹 Vídeo 1: Introdução e Acesso (3 minutos)

### Cena 1: Abertura
**Duração:** 15 segundos

**Narração:**
"Olá! Bem-vinda ao tutorial de gestão do site Ninho do Dragão – by Makiwa. Neste vídeo, vamos aprender como manter o teu site online atualizado e funcional, sem precisar de conhecimentos técnicos avançados."

**Visual:**
- Mostrar o site em https://ninho-do-dragao.netlify.app
- Fazer scroll pela homepage

---

### Cena 2: Plataformas Necessárias
**Duração:** 1 minuto

**Narração:**
"Para gerir o site, precisas de acesso a três plataformas principais:

1. **GitHub** - Onde guardamos o código
2. **Netlify** - Onde publicamos o site online
3. **O site publicado** - Que está acessível a todos

Vamos começar por abrir cada uma."

**Visual:**
- Abrir GitHub: https://github.com/ninhododragao/ninho-do-dragao
- Abrir Netlify: https://app.netlify.com
- Abrir o site: https://ninho-do-dragao.netlify.app

---

### Cena 3: Estrutura do Repositório
**Duração:** 1 minuto 45 segundos

**Narração:**
"O repositório GitHub tem esta estrutura:

- **client/** - Aqui está todo o código do site
  - **src/pages/** - As páginas do site (Home, Políticas, etc.)
  - **public/** - Imagens e ficheiros estáticos
- **docs/** - Documentação das políticas legais
- **netlify.toml** - Configuração de publicação

Os ficheiros que vamos editar com mais frequência estão em `client/src/pages/`."

**Visual:**
- Mostrar a estrutura de pastas no GitHub
- Expandir as pastas principais
- Mostrar o ficheiro `Home.tsx`

---

## 📹 Vídeo 2: Atualizar a Homepage (5 minutos)

### Cena 1: Abrir o Ficheiro
**Duração:** 1 minuto

**Narração:**
"Para atualizar o texto da homepage, precisas de editar o ficheiro `Home.tsx`. Vou mostrar-te como fazer isto de forma simples."

**Visual:**
- Ir a GitHub
- Navegar para `client/src/pages/Home.tsx`
- Clicar no ícone de edição (lápis)

---

### Cena 2: Editar Conteúdo
**Duração:** 2 minutos

**Narração:**
"Agora estamos no editor do GitHub. Podes ver o código da página. Para atualizar um texto:

1. Procura o texto que queres mudar
2. Clica no texto para editar
3. Faz as alterações
4. Rola para baixo e clica em 'Commit changes'"

**Visual:**
- Mostrar o editor
- Procurar uma secção de texto (ex: "Peças personalizadas que guardam momentos únicos")
- Editar o texto
- Mostrar o botão "Commit changes"

---

### Cena 3: Fazer Commit
**Duração:** 1 minuto

**Narração:**
"Quando clicas em 'Commit changes', aparece uma caixa de diálogo. Aqui, podes escrever uma mensagem descrevendo o que alteraste. Isto ajuda a manter um histórico de todas as mudanças."

**Visual:**
- Mostrar a caixa de diálogo de commit
- Escrever uma mensagem (ex: "Atualizar descrição da homepage")
- Clicar em "Commit changes"

---

### Cena 4: Deploy Automático
**Duração:** 1 minuto

**Narração:**
"Depois de fazer commit, o Netlify deteta automaticamente a mudança. Em poucos segundos, o site é compilado e publicado. Podes ver o progresso em https://app.netlify.com/projects/ninho-do-dragao"

**Visual:**
- Ir a Netlify
- Mostrar o deploy em progresso
- Mostrar o deploy concluído
- Atualizar o site publicado e mostrar a alteração

---

## 📹 Vídeo 3: Adicionar um Novo Produto (4 minutos)

### Cena 1: Localizar a Secção de Produtos
**Duração:** 1 minuto

**Narração:**
"Para adicionar um novo produto, vamos editar o ficheiro `Home.tsx` novamente. Desta vez, vamos localizar a secção 'Os nossos produtos' e adicionar um novo bloco."

**Visual:**
- Abrir `Home.tsx` em GitHub
- Procurar a secção "Os nossos produtos"
- Mostrar os produtos existentes

---

### Cena 2: Copiar um Bloco de Produto
**Duração:** 1 minuto

**Narração:**
"Vou copiar um dos blocos de produto existentes. Isto é mais fácil do que criar um do zero. Basta clicar, copiar e depois colar."

**Visual:**
- Selecionar um bloco de produto (ex: T-shirts)
- Copiar (Ctrl+C)
- Colar abaixo (Ctrl+V)

---

### Cena 3: Editar o Novo Produto
**Duração:** 1 minuto

**Narração:**
"Agora vou editar o novo bloco. Vou mudar:
- O emoji (ex: 👜 em vez de 👕)
- O nome do produto
- A descrição"

**Visual:**
- Editar o emoji
- Editar o nome
- Editar a descrição
- Mostrar o resultado

---

### Cena 4: Fazer Commit e Deploy
**Duração:** 1 minuto

**Narração:**
"Depois de editar, fazemos commit com uma mensagem descritiva. O Netlify vai compilar e publicar automaticamente. Em poucos segundos, o novo produto aparece no site!"

**Visual:**
- Fazer commit
- Ir a Netlify e mostrar o deploy
- Atualizar o site e mostrar o novo produto

---

## 📹 Vídeo 4: Atualizar Políticas Legais (3 minutos)

### Cena 1: Abrir o Ficheiro de Políticas
**Duração:** 1 minuto

**Narração:**
"As políticas legais (Termos, Privacidade, Devoluções, etc.) estão no ficheiro `Policies.tsx`. Este ficheiro tem várias abas, cada uma com uma política diferente."

**Visual:**
- Abrir `Policies.tsx` em GitHub
- Mostrar a estrutura de abas

---

### Cena 2: Editar uma Política
**Duração:** 1 minuto

**Narração:**
"Para editar uma política, basta procurar o texto que queres mudar e fazer a alteração. Por exemplo, se o teu NIF muda, podes atualizar aqui."

**Visual:**
- Procurar a secção de identificação legal
- Mostrar o NIF
- Editar (sem fazer realmente, apenas mostrar)

---

### Cena 3: Fazer Commit
**Duração:** 1 minuto

**Narração:**
"Depois de editar, fazemos commit. O site é atualizado automaticamente em poucos segundos."

**Visual:**
- Fazer commit
- Mostrar o deploy em Netlify
- Mostrar a página de políticas atualizada

---

## 📹 Vídeo 5: Reverter Alterações (2 minutos)

### Cena 1: Situação de Erro
**Duração:** 30 segundos

**Narração:**
"E se algo correr mal? Sem problema! O Netlify guarda um histórico de todas as versões do site. Podes reverter para uma versão anterior em segundos."

**Visual:**
- Mostrar um site com erro (simulado)

---

### Cena 2: Ir a Netlify
**Duração:** 1 minuto

**Narração:**
"Vai a https://app.netlify.com/projects/ninho-do-dragao e clica em 'Deploys'. Aqui, vês o histórico de todas as publicações. Procura a versão anterior que funcionava bem."

**Visual:**
- Ir a Netlify
- Clicar em "Deploys"
- Mostrar o histórico de deploys

---

### Cena 3: Publicar Versão Anterior
**Duração:** 30 segundos

**Narração:**
"Clica nos três pontos (...) ao lado do deploy anterior e seleciona 'Publish deploy'. O site volta ao estado anterior em segundos!"

**Visual:**
- Clicar nos três pontos
- Selecionar "Publish deploy"
- Mostrar o site revertido

---

## 📹 Vídeo 6: Adicionar Imagens (3 minutos)

### Cena 1: Preparar a Imagem
**Duração:** 1 minuto

**Narração:**
"Para adicionar uma imagem ao site, primeiro precisas de a colocar na pasta correta. As imagens devem ir em `client/public/images/`."

**Visual:**
- Mostrar a estrutura de pastas
- Mostrar a pasta `public/images/`

---

### Cena 2: Fazer Upload da Imagem
**Duração:** 1 minuto

**Narração:**
"Em GitHub, podes fazer upload de ficheiros diretamente. Vai a `client/public/images/`, clica em 'Add file' e depois 'Upload files'. Seleciona a tua imagem e faz upload."

**Visual:**
- Navegar para `client/public/images/`
- Clicar em "Add file"
- Clicar em "Upload files"
- Selecionar uma imagem
- Fazer upload

---

### Cena 3: Referenciar a Imagem no Código
**Duração:** 1 minuto

**Narração:**
"Depois de fazer upload, precisas de referenciar a imagem no código. Abre o ficheiro `Home.tsx` e adiciona uma linha como esta:

`<img src=\"/images/nome-da-imagem.jpg\" alt=\"Descrição\" />`

Depois faz commit e o site é atualizado!"

**Visual:**
- Abrir `Home.tsx`
- Adicionar a linha de imagem
- Fazer commit
- Mostrar a imagem no site publicado

---

## 📹 Vídeo 7: Monitorização e Manutenção (2 minutos)

### Cena 1: Ver Estatísticas
**Duração:** 1 minuto

**Narração:**
"Em Netlify, podes ver quantas pessoas visitaram o teu site. Vai a 'Web Analytics' para ver estatísticas de tráfego."

**Visual:**
- Ir a Netlify
- Clicar em "Web Analytics"
- Mostrar gráficos de tráfego

---

### Cena 2: Verificar Erros
**Duração:** 1 minuto

**Narração:**
"Se algo correr mal, podes ver os erros em 'Logs & metrics'. Isto ajuda a identificar e corrigir problemas rapidamente."

**Visual:**
- Ir a "Logs & metrics"
- Mostrar exemplos de logs

---

## 📹 Vídeo Bónus: Perguntas Frequentes (3 minutos)

### P1: Quanto custa manter o site?
**Duração:** 30 segundos

**Resposta:**
"Nada! Netlify oferece hosting gratuito. Só pagarias se registasses um domínio personalizado (cerca de 10-15€/ano)."

---

### P2: Preciso de saber programação?
**Duração:** 30 segundos

**Resposta:**
"Não! Para fazer alterações simples de texto, basta editar os ficheiros. Não precisas de conhecer React ou JavaScript."

---

### P3: E se estragar algo?
**Duração:** 30 segundos

**Resposta:**
"Sem problema! Podes sempre reverter para uma versão anterior em Netlify. Todos os commits estão guardados no GitHub."

---

### P4: Com que frequência devo atualizar?
**Duração:** 30 segundos

**Resposta:**
"Recomenda-se atualizar conteúdos sazonais (ex: Dia da Mãe, Natal) e adicionar novos produtos regularmente."

---

### P5: Como registar um domínio personalizado?
**Duração:** 1 minuto

**Resposta:**
"1. Vai a um registrador português (ex: sapo.pt, dns.pt)
2. Registra o domínio
3. Em Netlify, vai a 'Domain management'
4. Adiciona o domínio personalizado
5. Segue as instruções de DNS"

**Visual:**
- Mostrar o processo passo a passo

---

## 📊 Resumo dos Vídeos

| Vídeo | Duração | Tema |
|-------|---------|------|
| 1 | 3 min | Introdução e Acesso |
| 2 | 5 min | Atualizar Homepage |
| 3 | 4 min | Adicionar Produto |
| 4 | 3 min | Atualizar Políticas |
| 5 | 2 min | Reverter Alterações |
| 6 | 3 min | Adicionar Imagens |
| 7 | 2 min | Monitorização |
| Bónus | 3 min | Perguntas Frequentes |
| **Total** | **25 min** | **Curso Completo** |

---

## 🎬 Dicas de Produção

### Ferramentas Recomendadas
- **Gravação de Ecrã:** OBS Studio (gratuito) ou Camtasia
- **Edição:** DaVinci Resolve (gratuito) ou Adobe Premiere
- **Áudio:** Audacity (gratuito) para melhorar qualidade

### Configuração Recomendada
- **Resolução:** 1920x1080 (Full HD)
- **Frame Rate:** 30 fps
- **Qualidade de Áudio:** 128 kbps ou superior
- **Legenda:** Ativa (para acessibilidade)

### Estrutura de Cada Vídeo
1. **Introdução** (10-15 segundos)
2. **Conteúdo Principal** (90% do vídeo)
3. **Conclusão** (10-15 segundos)
4. **Call-to-Action** (5-10 segundos)

---

## 📝 Notas Finais

- Fala de forma clara e pausada
- Usa exemplos práticos e reais
- Mostra o resultado final de cada ação
- Oferece alternativas quando possível
- Encoraja perguntas e feedback

---

**Última atualização:** 20 de abril de 2026

**Duração Total Estimada:** 25 minutos

Para mais informações, consulta `GUIA_GESTAO_SITE.md`
