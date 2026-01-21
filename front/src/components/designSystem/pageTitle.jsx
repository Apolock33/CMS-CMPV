import { BreadCrumb } from "primereact/breadcrumb";
import Botao from "./Botao";

const PageTitle = ({ titulo = "", caminho = [], acoes = [] }) => {
  return (
    <div className="flex justify-content-between align-items-center sm:grid">
      <div>
        <BreadCrumb model={caminho} pt={{ root: { className: "bg-transparent border-none p-0 mt-3" } }} />
        <h1 className="my-2 text-4xl" style={{ color: "var(--primary-color)" }}>{titulo}</h1>
      </div>
      {(acoes || []).map((item) => (
        <div key={item.id} className="gap-3">
          <Botao icon="pi pi-plus" corIcon="var(--secondary-color)" onClick={item.onClick} outlined rounded botaoIcone />
        </div>
      ))}
    </div>
  );
};

export default PageTitle;