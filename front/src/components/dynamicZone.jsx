import CardCarrossel from "./designSystem/cardCarrossel";

const DynamicZone = ({ blocos }) => {
    const ComponentMap = {
      'pagina.card-carrossel': CardCarrossel,
    }
    if (!blocos || blocos.length === 0) return null;

  return (
    <div className="dynamic-zone">
      {blocos.map((bloco) => {
        const componentName = bloco.__component;
        const ComponentToRender = ComponentMap[componentName];
        if (!ComponentToRender) {
          console.warn(`Componente ${componentName} não encontrado no ComponentMap.`);
          return null;
        }
        return (
          <div key={bloco.id} className="block-wrapper">
            <ComponentToRender {...bloco} />
          </div>
        );
      })}
    </div>
  );
};

export default DynamicZone;