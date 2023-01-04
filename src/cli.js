import listaValidada from "./http-validacao.js";
import chalk from "chalk";
import fs from "fs";
import pegaArquivo from "./index.js";

const argumentos = process.argv;

function imprimeResultado(valida, resultado, nomeDoArquivo = "") {
  if (valida) {
    console.log(
      charlk.yellow(`Lista validada - ${nomeDoArquivo}`),
      listaValidada(resultado)
    );
  }
  console.log(chalk.yellow(`Lista de links - ${nomeDoArquivo}`), resultado);
}

async function processaArquivo(argumentos) {
  const caminho = argumentos[2];
  const valida = argumentos[3];
  console.log(valida);

  try {
    fs.lstatSync(caminho);
  } catch (erro) {
    if (erro.code === "ENOENT") {
      console.log("Diretório ou arquivo não existe.");
      return;
    }
  }

  if (fs.lstatSync(caminho).isFile()) {
    const links = await pegaArquivo(caminho);
    imprimeResultado(links);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho);
    arquivos.forEach(async (arquivo) => {
      const links = await pegaArquivo(`${caminho}/${arquivo}`);
      imprimeResultado(links, arquivo);
    });
  }
}

processaArquivo(argumentos);
