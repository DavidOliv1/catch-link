import chalk from "chalk";

function extraiLinks(arrLinks) {
  return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

function manejaErros(erro) {
  if (erro.cause.code === "ENOTFOUND") {
    return "Link não encontrado.";
  } else {
    return "Ocorreu um erro.";
  }
}

async function validaLinks(listaURLs) {
  const arrStatus = Promise.all(
    listaURLs.map(async (url) => {
      try {
        const response = await fetch(url);
        return `${response.status} - ${response.statusText}`;
      } catch (erro) {
        return manejaErros(erro);
      }
    })
  );
  return arrStatus;
}

export default async function listaValidada(listaDeLinks) {
  const links = extraiLinks(listaDeLinks);
  const status = await validaLinks(links);

  return listaDeLinks.map((objeto, indice) => ({
    ...objeto,
    status: status[indice],
  }));
}
