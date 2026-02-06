import { FaArrowLeft } from "react-icons/fa6";
import { Button } from "primereact/button";

const Error = () => {
  return (
    <section className="" style={{ backgroundColor: "var(--primary-color)" }}>
      <div className="text-center flex flex-column justify-content-center align-items-center w-full h-screen">
        <h1 style={{ color: "var(--background-color)", fontSize: "10rem" }}>404</h1>
        <h1 style={{ color: "var(--background-color)", fontSize: "2rem" }}>Hmmmm...Não Encontramos o que Você está procurando</h1>
        <h1 style={{ color: "var(--background-color)", fontSize: "2rem" }}>Por favor, tente novamente em um outro momento</h1>
        <Button rounded text label="Voltar a Home" icon={() => <FaArrowLeft />} onClick={() => (window.location.href = "/")} className="text-white px-4 m-3 text-3xl flex gap-3" />
      </div>
    </section>
  );
};

export default Error;
