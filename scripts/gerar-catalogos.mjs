/**
 * Corre no fim de cada publicação no Netlify (ver netlify.toml).
 * Pede os catálogos à Cifra e à Valento e guarda-os como ficheiros prontos em client/dist/catalogo/,
 * para o site os abrir logo (as APIs dos fornecedores demoram 15–20 s a responder).
 * Usa as mesmas funções do site, por isso os preços e os códigos ND- são exatamente os mesmos.
 * Se um fornecedor falhar, o site continua a funcionar: pergunta-lhe diretamente, como antes.
 */
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const raiz = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const destino = path.join(raiz, "client", "dist", "catalogo");
await mkdir(destino, { recursive: true });

for (const nome of ["cifra", "valento"]) {
  try {
    const { default: funcao } = await import(path.join(raiz, "netlify", "functions", `catalogo-${nome}.mjs`));
    const resposta = await funcao();
    if (!resposta.ok) throw new Error(`estado ${resposta.status}`);
    const dados = await resposta.json();
    await writeFile(path.join(destino, `${nome}.json`), JSON.stringify(dados));
    console.log(`Catálogo ${nome}: ${dados.total} artigos guardados.`);
  } catch (e) {
    console.warn(`Aviso: catálogo ${nome} não foi guardado (${e.message}). O site vai pedi-lo diretamente.`);
  }
}
