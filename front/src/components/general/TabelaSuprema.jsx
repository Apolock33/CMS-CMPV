import { formatarDataHora, formatarPreco } from "../../utilitarios/funcoes";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Spinner from "../designSystem/Spinner";
import "../../recursos/css/tabelaGeral.css";

const TabelaSuprema = ({ colunas = [], dados = [], carregando = false, renderAcoes, linhas }) => {
  const { height } = useWindowDimensions();

  const regrasFormat = {
    valorMonetario: formatarPreco,
    data: formatarDataHora
  };

  const regrasSort = {
    data: campo => (a, b) => {
      const parse = obj => {
        const val = obj?.[campo];
        if (!val) return 0;
        if (typeof val === "string" && val.includes("/")) {
          const [dia, mes, ano] = val.split("/");
          return new Date(`${ano}-${mes}-${dia}`);
        }
        return new Date(val);
      };
      const d1 = parse(a);
      const d2 = parse(b);
      return d1 - d2;
    }
  };

  const colunasBase = (colunas || []).map(col => ({
    campo: col.campo,
    titulo: col.titulo,
    sortable: col.hasOwnProperty("sortable") ? col.sortable : false,
    corpo: col.corpo ? col.corpo : regrasFormat[col.formatador] ? dado => regrasFormat[col.formatador](dado[col.campo], dado) : undefined,
    tipo: col.tipo
  }));

  const colunasFinais = typeof renderAcoes === "function" ? [...colunasBase, {
    campo: "",
    titulo: "Ações",
    sortable: false,
    corpo: dado => renderAcoes(dado)
  }] : colunasBase;

  const scrollHeight = `${Math.max(300, height - 250)}px`;
  const EST_ROW_HEIGHT = 52;
  const RESERVED_HEIGHT = 200;
  const availableHeight = Math.max(300, height - RESERVED_HEIGHT);
  const linhasDinamicas = Math.max(5, Math.floor(availableHeight / EST_ROW_HEIGHT));
  const rowsToShow = linhas ? linhas : linhasDinamicas;

  return (
    <Spinner carregando={carregando}>
      <DataTable value={dados} rows={rowsToShow} scrollable scrollHeight={scrollHeight} paginator removableSort emptyMessage="Nenhum dado encontrado" className=" border-round-3xl">
        {colunasFinais.map(col => (
          <Column key={col.campo} field={col.campo} header={col.titulo} body={col.corpo ?? (row => row[col.campo])} sortable={!!col.sortable} sortFunction={col.tipo && (dado => regrasSort[col.tipo](dado))} />
        ))}
      </DataTable>
    </Spinner>
  );
};

export default TabelaSuprema;
