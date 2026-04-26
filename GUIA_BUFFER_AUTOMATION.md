# 🚀 Guia de Automação - Buffer + Ovibeja 2026

## O que é isto?

Um script Python que **automatiza completamente** o agendamento de todos os 10 posts no Buffer em menos de 1 minuto.

**Sem clicks, sem formulários, sem complicações.**

---

## ⚙️ Configuração (5 minutos)

### Passo 1: Criar Conta no Buffer (se ainda não tiveres)

1. Vai a https://buffer.com
2. Clica em "Sign up"
3. Cria uma conta com email
4. Conecta o teu Instagram/Facebook

### Passo 2: Obter o Token de API

1. Vai a https://buffer.com/app/settings/apps
2. Clica em "Create New App"
3. Preenche os dados:
   - **App Name:** Ninho do Dragão Automation
   - **Description:** Automação de posts Ovibeja
4. Clica em "Create"
5. **Copia o token** (algo como: `abc123xyz...`)

### Passo 3: Obter o ID do Perfil

1. Vai a https://buffer.com/app/dashboard
2. Clica no teu perfil Instagram/Facebook
3. Na URL, procura o ID (ex: `profile_id=123456`)
4. **Copia o ID**

### Passo 4: Configurar Variáveis de Ambiente

**No terminal, executa:**

```bash
export BUFFER_API_TOKEN='seu_token_aqui'
export BUFFER_PROFILE_ID='seu_profile_id_aqui'
```

**Exemplo:**
```bash
export BUFFER_API_TOKEN='abc123xyz789'
export BUFFER_PROFILE_ID='123456789'
```

---

## 🚀 Executar o Script

### Opção 1: Linha de Comando (Recomendado)

```bash
python3 /home/ubuntu/buffer_automation.py
```

**Resultado esperado:**
```
============================================================
🔥 AUTOMATIZADOR DE POSTS - OVIBEJA 2026
============================================================

📁 Ficheiro CSV: /home/ubuntu/ninho-do-dragao/OVIBEJA_POSTS_AGENDADOS.csv
🖼️  Imagem: https://ninho-do-dragao.netlify.app/ovibeja-2026.png
📱 Perfil: 123456789

🚀 Iniciando agendamento de posts...
------------------------------------------------------------

📅 Agendando post 1...
   Data/Hora: 2026-04-22T19:00:00Z
   Texto: 💚 "Adorei! Ficou PERFEITO! Vou...

✅ Post agendado com sucesso!

[... continua para os 10 posts ...]

============================================================
✅ RESUMO: 10 posts agendados com sucesso!
============================================================
```

### Opção 2: Com Imagem Personalizada

Se quiseres usar uma imagem diferente:

```bash
python3 /home/ubuntu/buffer_automation.py --image 'https://tua-imagem.com/ovibeja.png'
```

---

## 📊 O que Acontece?

1. ✅ Script lê o CSV com os 10 posts
2. ✅ Converte datas de português para ISO
3. ✅ Envia cada post para o Buffer via API
4. ✅ Buffer agenda automaticamente
5. ✅ Posts publicam nos horários definidos

**Tempo total:** ~30 segundos para os 10 posts

---

## ❌ Troubleshooting

### Erro: "Token não configurado"
**Solução:** Executa os comandos de configuração de variáveis de ambiente

### Erro: "Profile ID inválido"
**Solução:** Verifica o ID no dashboard do Buffer

### Erro: "Ficheiro CSV não encontrado"
**Solução:** Verifica se o ficheiro está em `/home/ubuntu/ninho-do-dragao/OVIBEJA_POSTS_AGENDADOS.csv`

### Posts não aparecem no Buffer
**Solução:** Aguarda 30 segundos e recarrega o dashboard do Buffer

---

## 📝 Ficheiros Necessários

- ✅ `OVIBEJA_POSTS_AGENDADOS.csv` (já criado)
- ✅ `buffer_automation.py` (script)
- ✅ Imagem Ovibeja (URL pública)

---

## 🎯 Resultado Final

Depois de executar o script:

1. Vai a https://buffer.com/app/dashboard
2. Verás todos os 10 posts agendados
3. Clica em "Publish" para publicar imediatamente
4. Ou deixa agendados para as datas definidas

---

## 💡 Dicas

✅ **Executa o script uma vez** - Todos os posts são agendados de uma vez
✅ **Podes modificar o CSV** - Se quiseres mudar textos, edita o ficheiro
✅ **Podes cancelar posts** - No Buffer, clica em "Delete" para remover
✅ **Podes reagendar** - No Buffer, clica em "Reschedule" para mudar data/hora

---

## 📞 Suporte

Se tiveres problemas:

1. Verifica se o token está correto
2. Verifica se o profile ID está correto
3. Verifica se o CSV tem dados válidos
4. Tenta executar novamente

---

**Pronto! Agora tens automação completa! 🚀**
