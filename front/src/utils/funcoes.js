export function formatarDataHora(dataIso) {
  if (!dataIso) return "";
  const data = new Date(dataIso);
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  const hora = String(data.getHours()).padStart(2, "0");
  const minutos = String(data.getMinutes()).padStart(2, "0");
  const segundos = String(data.getSeconds()).padStart(2, "0");
  return `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;
}

export function formatarData(dataISO) {
  if (!dataISO) return "00/00/0000";
  let date;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dataISO)) {
    date = new Date(`${dataISO}T00:00:00`);
  } else {
    date = new Date(dataISO);
  }
  if (isNaN(date.getTime())) {
    return "00/00/0000";
  }
  return date.toLocaleDateString("pt-BR");
}

export function formatarDateParaIso(date) {
  if (!(date instanceof Date) || isNaN(date)) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatarIsoParaDate(isoDate) {
  if (!isoDate) return null;
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(isoDate)) {
    const [day, month, year] = isoDate.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    const [year, month, day] = isoDate.split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
  return null;
}

export function formatarPreco(valor) {
  if (valor === null || valor === undefined || valor === "") return "R$ 0,00";
  const strValor = String(valor);
  try {
    if (!/^-?\d+(\.\d+)?$/.test(strValor)) {
      return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
    }
    const parts = strValor.split(".");
    let integerPart = parts[0];
    let decimalPart = parts[1] || "00";
    if (decimalPart.length < 2) decimalPart = decimalPart.padEnd(2, "0");
    if (decimalPart.length > 2) decimalPart = decimalPart.substring(0, 2);
    const bigIntVal = BigInt(integerPart);
    const formattedInt = new Intl.NumberFormat("pt-BR").format(bigIntVal);
    return `R$ ${formattedInt},${decimalPart}`;
  } catch (e) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(valor);
  }
}

export function dataBRparaBanco(dataStr) {
  if (!dataStr) return null;
  if (dataStr instanceof Date) {
    return dataStr.toISOString().split("T")[0];
  }
  const str = String(dataStr).trim();
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(str)) {
    const [dia, mes, ano] = str.split("/");
    return `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    return str;
  }
  return null;
}

const parseData = dataStr => {
  if (!dataStr) return null;
  if (dataStr instanceof Date) {
    return dataStr.toISOString().split("T")[0];
  }
  const str = String(dataStr).trim();
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(str)) {
    const [dia, mes, ano] = str.split("/");
    return `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    return str;
  }
  return null;
};

export function limparNumero(valor, tipoFinal) {
  if (!valor) return "";
  return tipoFinal == "string" ? String(valor).replace(/\D+/g, "") : Number(valor.replace(/\D+/g, ""));
}

export const filtrarProcessos = (processos, filtros) => {
  return processos.filter(p => {
    const dataProcesso = parseData(p.data_autuacao);
    const filtroData = parseData(filtros.data);

    const classeProcesso = (p.classe_judicial || "").toLowerCase().trim();
    const estadoProcesso = p.estado;
    const valorProcesso = Number(p.valor_causa);
    const numeroProcesso = (p.numero_processo || "").toLowerCase().trim();
    const nomeProcesso = (p.polos_passivos?.[0]?.nome || "").toLowerCase().trim();
    const cpfCnpjProcesso = (p.polos_passivos?.[0]?.cpf_cnpj || "").toLowerCase().trim();
    const todosTelefones = (p.polos_passivos || []).flatMap(pp => pp.telefones || []).map(t => (t.numero || "").toLowerCase().trim());
    const atendeNome = !filtros.nome || nomeProcesso.includes((filtros.nome || "").toLowerCase().trim());
    const atendeCpfCnpj = !filtros.cpf_cnpj || cpfCnpjProcesso.includes((filtros.cpf_cnpj || "").toLowerCase().trim());
    const atendeData = !filtros.data || dataProcesso === filtroData;
    const atendeClasse = !filtros.classe_judicial || classeProcesso.includes((filtros.classe_judicial || "").toUpperCase().trim());
    const atendeEstado = !filtros.estado || estadoProcesso === filtros.estado;
    const atendeValor = (!filtros.valorMinimo || valorProcesso >= Number(filtros.valorMinimo)) && (!filtros.valorMaximo || valorProcesso <= Number(filtros.valorMaximo));
    const atendeNumero = !filtros.numero_processo || numeroProcesso.includes((filtros.numero_processo || "").toLowerCase().trim());
    const atendeTelefone = !filtros.telefone || todosTelefones.some(num => num.includes((filtros.telefone || "").toLowerCase().trim()));
    return atendeData && atendeClasse && atendeEstado && atendeValor && atendeNumero && atendeNome && atendeCpfCnpj && atendeTelefone;
  });
};

export const filtrarUsuarios = (usuarios, termoBusca) => {
  if (!termoBusca) return usuarios;
  return usuarios.filter(u => (u.nome || "").toLowerCase().includes(termoBusca.toLowerCase().trim()));
};

export function copiarFallback(texto) {
  const input = document.createElement("textarea");
  input.value = texto;
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}

const opcional = validacao => value => {
  if (value === null || value === undefined || value === "") return true;
  return validacao(value);
};

export const regras = {
  palavra: value => {
    if (!value) return "Campo obrigatório";
    if (value.length >= 250) return "Máximo de 250 caracteres";
    return true;
  },
  palavra_opcional: opcional(value => {
    if (value.length >= 250) return "Máximo de 250 caracteres";
    return true;
  }),
  texto: value => {
    if (!value) return "Campo obrigatório";
    if (value.length >= 5000) return "Máximo de 5000 caracteres";
    return true;
  },
  entrada: value => {
    if (value === null || value === undefined || value === "") return "Campo obrigatório";
    const numero = Number(value);
    if (isNaN(numero)) {
      return "O valor deve ser numérico";
    }
    if (numero < 500) {
      return "O valor mínimo é R$ 500,00";
    }
    return true;
  },
  decimal: value => {
    if (!value) return "Campo obrigatório";
    const regex = /^\d+(,\d+)?$/;
    return regex.test(value) || "Valor inválido. Use apenas números e vírgula (ex: 10,50)";
  },
  decimal_opcional: opcional(value => {
    const regex = /^\d+(,\d+)?$/;
    return regex.test(value) || "Valor inválido. Use apenas números e vírgula (ex: 10,50)";
  }),
  requerido: value => (value !== null && value !== undefined && value !== "" && !(Array.isArray(value) && value.length === 0)) || "Campo obrigatório",
  telefone: value => /^(\(\d{2}\))\s(\d{4,5})-(\d{4})$/.test(value) || "Telefone deve estar no formato (XX) XXXXX-XXXX",
  email: value => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "E-mail inválido",
  cpf: value => /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/.test(value) || "CPF deve estar no formato XXX.XXX.XXX-XX",
  cpf_opcional: opcional(value => /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/.test(value) || "CPF deve estar no formato XXX.XXX.XXX-XX"),
  rg: value => /^\d{2}\.\d{3}\.\d{3}-\d{1}$/.test(value) || "RG deve estar no formato XX.XXX.XXX-X",
  cnpj: value => /^(?:\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/.test(value) || "CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX",
  senha: value => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{8,250}$/.test(value) || "A senha deve ter no mínimo 8 e no máximo 250 caracteres, incluindo uma letra, um número e um caractere especial",
  url: v => /^(https?|ftp):\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([\/?].*)?$/.test(v) || "URL inválida",
  data: v => /^\d{4}-\d{2}-\d{2}$/.test(v) || "Data deve estar no formato DD/MM/YYYY",
  cep: v => /^\d{5}-\d{3}$/.test(v) || "CEP deve estar no formato XXXXX-XXX",
  uf: v => /^[A-Z]{2}$/.test(v) || "UF deve conter exatamente 2 letras maiúsculas",
  cartao: value => /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(value) || "Número de cartão inválido",
  numero: value => /^[1-9]\d*$/.test(value) || "O valor deve ser um número",
  numero_processo: value => /^\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}$/.test(value) || "Número do processo deve estar no formato XXXXXXX-XX.XXXX.X.XX.XXXX",
  oab: value => /^[A-Z]{2}\d{4,6}$/.test(value) || "OAB deve estar no formato XXxxxx (2 letras maiúsculas + 4 a 6 números)",
  numero_opcional: opcional(value => /^[1-9]\d*$/.test(value) || "O valor deve ser um número"),
  cpf_cnpj: value => /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11}|(?:\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})|\d{14})$/.test(value) || "CPF ou CNPJ inválido",
  complemento_opcional: opcional(value => {
    if (value.length >= 250) return "Máximo de 250 caracteres";
    return true;
  }),
  cep_opcional: opcional(value => {
    if (value.length >= 250) return "Máximo de 250 caracteres";
    return true;
  }),
  opcional: opcional(() => true)
};

export const mascaraMoeda = (e, mudarCampo, chave, funcaoExtra) => {
  let valorLimpo = limparNumero(e.target.value, "string");
  if (!valorLimpo) {
    mudarCampo(chave, "", funcaoExtra);
    return;
  }
  valorLimpo = valorLimpo.replace(/^0+/, "");
  if (valorLimpo === "") valorLimpo = "0";
  const padded = valorLimpo.padStart(3, "0");
  const intPart = padded.slice(0, -2);
  const decPart = padded.slice(-2);
  const finalValor = `${BigInt(intPart).toString()}.${decPart}`;
  mudarCampo(chave, finalValor, funcaoExtra);
};

export function formatarCpfCnpj(valor) {
  if (!valor || typeof valor !== "string") return null;
  if (/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(valor)) {
    return valor;
  }
  if (/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(valor)) {
    return valor;
  }
  const numeros = valor.replace(/\D/g, "");
  if (numeros.length === 11) {
    return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  if (numeros.length === 14) {
    return numeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }
  return null;
}
