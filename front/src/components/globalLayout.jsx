// src/components/GlobalLayout.jsx
import Header from "../components/designSystem/header";
import Footer from "../components/designSystem/footer";

const GlobalLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default GlobalLayout;
