import { ProgressSpinner } from "primereact/progressspinner";

const Spinner = ({ carregando = false, children }) => {
  return carregando ? (
    <div className="flex justify-content-center align-items-center p-4 h-full">
      <ProgressSpinner style={{ width: "50px", height: "50px" }} strokeWidth="4" />
    </div>
  ) : (
    <>{children}</>
  );
};

export default Spinner;
