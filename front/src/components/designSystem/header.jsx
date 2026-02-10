import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/globalContext";
import { TiThMenu } from "react-icons/ti";
import { Button } from "primereact/button";
import { motion } from "motion/react";
import { api } from "../../services/api";
import GeneralDrawer from "../generalDrawer";
import Logo from "../../assets/imgs/logos/logo.png";
import "../../assets/css/header.css";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const [links, setLinks] = useState([]);
  const { isMobile, isScrollingDown } = useContext(GlobalContext);
  const navigate = useNavigate();

  const getLinks = async () => {
    try {
      const response = await api.get("/links");
      const res = response.data.data;
      const linksMapeados = res.map((link) => { return { id: link.id, nome: link.nome, rota: link.rota } });
      setLinks(linksMapeados);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      <motion.header id="header" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } }} className={`flex align-items-center justify-content-between ${isMobile ? "px-4" : "px-8"} py-3 w-full fixed top-0 z-5 bg-white`}>
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <motion.img initial={{ width: 0 }} animate={{ width: isMobile ? 190 : 300, transition: { duration: 0.3, ease: "easeInOut" } }} whileInView={{ width: isScrollingDown ? (isMobile ? 230 : 200) : isMobile ? 260 : 330 }} src={Logo} alt="Logo" width={isMobile ? 190 : 300} />
        </div>

        {!isMobile ? (
          <>
            <nav className="flex align-items-center gap-4 pr-6">
              <ul className="flex align-items-center gap-4 list-none m-0 p-0" style={{ fontFamily: "var(--font-family-suport)" }}>
                {links.map((link) => (
                  <li key={link.id}>
                    <Link to={link.rota} className="header-link text-lg font-medium">
                      {link.nome}
                    </Link>
                  </li>
                ))}
              </ul>
              <div>
                <Button label="Area do Sócio" rounded style={{ backgroundColor: "#09294B" }} className="border-none flex gap-2" onClick={() => navigate("/login")} />
              </div>
            </nav>
          </>
        ) : (
          <div>
            <Button icon={() => <TiThMenu size={30} width={45} color="#09294B" />} rounded outlined className="border-none w-auto" onClick={() => setVisible(!visible)} />
          </div>
        )}
      </motion.header>
      <div className={`mt-8 mb-2`} style={{height: isMobile ? "0px" : "15px"}} />
      {visible && (
        <GeneralDrawer isVisible={visible} onClose={() => setVisible(false)} drawerSide="end">
          <div className="flex flex-column gap-3">
            {links.map((link) => (
              <div key={link.id} className="flex justify-content-center p-3 cursor-pointer links-hover" onClick={() => {
                setVisible(false)
                navigate(link.rota)
              }}>
                <Link to={link.rota} className="text-lg no-underline text-primary">
                  {link.nome}
                </Link>
              </div>
            ))}
          </div>
          <hr />
          <div className="flex justify-content-center mt-3">
            <Button label="Area do Sócio" rounded className="border-none flex gap-2 w-full py-3" style={{ backgroundColor: "#09294B" }} onClick={() => navigate("/login")} />
          </div>
        </GeneralDrawer>
      )}
    </>
  );
};

export default Header;
