import fs from "fs";
export default pegaArquivo;

function extraiLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const links = capturas.map((captura) => ({
    [captura[1]]: captura[2],
  }));
  return links;
}

async function pegaArquivo(caminhoDoArquivo) {
  const encoding = "UTF-8";
  const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
  return extraiLinks(texto);
}
