import { regras, formatarDateParaIso, formatarIsoParaDate, formatarPreco, mascaraMoeda, horarioParaDate, dateParaHorario, formatarHorarioParaDate, formatarDateParaHorario } from "../../utilitarios/funcoes";
import { useEffect, useState, useId } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputSwitch } from "primereact/inputswitch";
import { MultiSelect } from "primereact/multiselect";
import { FileUpload } from "primereact/fileupload";
import { addLocale } from "primereact/api";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import Botao from "../designSystem/Botao";
import "../../recursos/css/formulario.css";

addLocale("br", {
  firstDayOfWeek: 0,
  showMonthAfterYear: false,
  dayNames: ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"],
  dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
  dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
  monthNames: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
  monthNamesShort: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
  today: "Hoje",
  clear: "Limpar",
});

const FormularioSupremo = ({ secoes = [], valoresIniciais = {}, onSubmit = null, desabilitarBotao = false, textoBotao = "", corBotao = "var(--primary-color)", corTexto = "#fff", modoExibicao = false }) => {
  const idBase = useId();
  const [valores, setValores] = useState(valoresIniciais);
  const [formEnviado, setFormEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erros, setErros] = useState({});
  let valido = true;

  const mudarCampo = (campo, valor, funcao) => {
    setValores((prev) => ({ ...prev, [campo]: valor }));
    setErros((prev) => {
      const novo = { ...prev };
      delete novo[campo];
      return novo;
    });
    if (funcao) funcao(valor);
  };

  const validarCampo = (chave, valor, regra) => {
    const validacao = regras[regra];
    if (typeof validacao !== "function") {
      console.warn(`Regra "${regra}" não encontrada para o campo "${chave}"`);
      return;
    }
    const resultado = validacao(valor);
    if (resultado !== true) valido = false;
    setErros((prev) => {
      const novo = { ...prev };
      if (resultado === true) {
        delete novo[chave];
      } else {
        novo[chave] = resultado;
      }
      return novo;
    });
  };

  const validar = () => {
    secoes.map((secao) => {
      secao.campos.map((campo) => {
        const { chave, regra } = campo;
        validarCampo(chave, valores[chave], regra);
      });
    });
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
    validar();
    setFormEnviado(true);
    if (valido && Object.keys(valores).length !== 0 && onSubmit) {
      setCarregando(true);
      await onSubmit(valores);
      setCarregando(false);
    }
  };

  useEffect(() => {
    setValores((prev) => ({ ...prev, ...valoresIniciais }));
  }, [JSON.stringify(valoresIniciais)]);

  const propsExtrasPorCampo = (campo) => {
    const { nome, chave, tipo, regra, mascara, layout, desabilitado, opcoes, funcao } = campo;
    const mapaProps = {
      texto: { value: valores[chave] || "", onChange: (e) => mudarCampo(chave, e.target.value, funcao) },
      selecionar: { value: valores[chave] || "", onChange: (e) => mudarCampo(chave, e.value, funcao), options: (opcoes ?? []).map((o) => (typeof o === "string" ? { label: o, value: o } : o)) },
      selecionarVarios: { value: valores[chave] || "", onChange: (e) => mudarCampo(chave, e.value, funcao), options: (opcoes ?? []).map((o) => (typeof o === "string" ? { label: o, value: o } : o)), showSelectAll: false },
      data: { value: formatarIsoParaDate(valores[chave]), onChange: (e) => mudarCampo(chave, formatarDateParaIso(e.value), funcao), dateFormat: "dd/mm/yy", locale: "br", minDate: new Date(), showIcon: false },
      horario: { value: formatarHorarioParaDate(valores[chave]), onChange: (e) => mudarCampo(chave, formatarDateParaHorario(e.value), funcao), timeOnly: true, hourFormat: "24", locale: "br" },
      moeda: { value: formatarPreco(valores[chave] || 0), onChange: (e) => mascaraMoeda(e, mudarCampo, chave, funcao) },
      senha: { value: valores[chave] || "", onChange: (e) => mudarCampo(chave, e.target.value, funcao), type: "password" },
      interruptor: { checked: !!valores[chave], onChange: (e) => mudarCampo(chave, e.value, funcao) },
      areaTexto: { value: valores[chave] || "", onChange: (e) => mudarCampo(chave, e.target.value, funcao), rows: 5, autoResize: false },
      arquivo: { customUpload: true, onSelect: (e) => mudarCampo(chave, e.files[0], funcao), mode: "basic", chooseLabel: "Selecionar arquivo", accept: ".pdf,.jpg,.png,.jpeg", maxFileSize: 10 * 1024 * 1024, invalidFileSizeMessageDetail: "O arquivo deve ter no máximo 10MB." },
    };
    const mapaPropsModoExibicao = {
      texto: { value: valores[chave] || "" },
      selecionar: { value: valores[chave] || "", options: (opcoes ?? []).map((o) => (typeof o === "string" ? { label: o, value: o } : o)) },
      selecionarVarios: { value: valores[chave] || "", options: (opcoes ?? []).map((o) => (typeof o === "string" ? { label: o, value: o } : o)), showSelectAll: false },
      data: { value: formatarIsoParaDate(valores[chave]), dateFormat: "dd/mm/yy", locale: "br" },
      horario: { value: formatarHorarioParaDate(valores[chave]), timeOnly: true, hourFormat: "24", locale: "br" },
      moeda: { value: formatarPreco(valores[chave] || 0) },
      senha: { value: valores[chave] || "", type: "password" },
      interruptor: { value: valores[chave] ? "Sim" : "Não" },
      areaTexto: { value: valores[chave] || "", rows: 5, autoResize: false },
      arquivo: { customUpload: true, mode: "basic", chooseLabel: "Selecionar arquivo", accept: ".pdf,.jpg,.png,.jpeg", maxFileSize: 10 * 1024 * 1024, invalidFileSizeMessageDetail: "O arquivo deve ter no máximo 10MB." },
    };
    return modoExibicao ? mapaPropsModoExibicao[tipo] : mapaProps[tipo];
  };

  const mapaComponentes = {
    texto: InputText,
    selecionar: Dropdown,
    selecionarVarios: MultiSelect,
    data: Calendar,
    horario: Calendar,
    moeda: InputText,
    senha: InputText,
    interruptor: InputSwitch,
    areaTexto: InputTextarea,
    arquivo: FileUpload,
  };

  const mapaComponentesModoExibicao = {
    texto: InputText,
    selecionar: Dropdown,
    selecionarVarios: MultiSelect,
    data: Calendar,
    horario: Calendar,
    moeda: InputText,
    senha: InputText,
    interruptor: InputText,
    areaTexto: InputTextarea,
    arquivo: FileUpload,
  };

  return (
    <form onSubmit={enviarFormulario}>
      {secoes.map((secao, idSecao) => (
        <div key={idSecao} className="grid px-3">
          <div className="col-12">
            <h2>{secao.titulo}</h2>
          </div>
          {secao.campos.map((campo, idCampo) => {
            const { nome, chave, tipo, regra, mascara, layout, desabilitado, opcoes, funcao } = campo;
            const baseClass = `col-${layout[0]} md:col-${layout[1]} lg:col-${layout[2]} xl:col-${layout[3]}`;
            const colClass = tipo === "interruptor" ? `${baseClass} flex align-items-center` : baseClass;
            const modoExibicaoClasse = modoExibicao ? "modo-exibicao" : "";
            const erroClasse = `${erros[nome] ? "p-invalid" : ""} ${modoExibicaoClasse}`;
            const exibicao = modoExibicao ? mapaComponentesModoExibicao : mapaComponentes;
            const Componente = mascara ? InputMask : exibicao[tipo];
            const propsExibicao = modoExibicao ? { readOnly: true } : { disabled: desabilitado };
            const propsMascara = mascara ? { mask: mascara } : "";
            const propsBase = { id: `${idBase}-${idSecao}-${idCampo}`, name: chave, className: `${erroClasse}`, onBlur: () => validarCampo(chave, valores[chave], regra) };
            const propsExtras = propsExtrasPorCampo(campo);
            const propsComponente = { ...propsBase, ...propsExtras, ...propsMascara, ...propsExibicao };
            return (
              <div className={`flex flex-column ${colClass}`} key={idCampo}>
                <label>{nome}</label>
                <Componente {...propsComponente} />
                <small className="p-error font-bold" style={{ display: "block", minHeight: "1rem", fontSize: "0.75rem", lineHeight: "1rem", visibility: erros[chave] ? "visible" : "hidden" }}>
                  {erros[chave] || ""}
                </small>
              </div>
            );
          })}
        </div>
      ))}
      {!modoExibicao && (
        <div className="col-12 px-3">
          <Botao disabled={desabilitarBotao} carregando={carregando} texto={formEnviado && Object.keys(erros).length > 0 ? "Erro de Preenchimento" : textoBotao} corBotao={formEnviado && Object.keys(erros).length > 0 ? "var(--red-600)" : corBotao} corTexto={corTexto} classes="w-full" type="submit" />
        </div>
      )}
    </form>
  );
};

export default FormularioSupremo;
