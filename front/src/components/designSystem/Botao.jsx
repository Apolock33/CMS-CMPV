import { Button } from "primereact/button";
import { useMemo } from "react";

const Botao = ({ texto, icon, posicaoIcon, tipo = "submit", tooltip, onClick, classes = "", corIcon, corTexto, corBotao, botaoIcone = false, text = false, outlined = false, rounded = false, carregando = false, disabled = false }) => {
  const { estilo, classNames, iconColor } = useMemo(() => {
    let style = {
      background: corBotao || "var(--secondary-color)",
      color: corTexto || "var(--secondary-color)",
    };
    let cls = classes;
    let resolvedIconColor = corIcon;

    if (corBotao && corTexto) {
      style = { background: corBotao, color: corTexto };
      cls += " border-none";
      resolvedIconColor = resolvedIconColor || corTexto;
    }

    if (outlined) {
      style = {
        background: "transparent",
        color: "var(--secondary-color)",
        border: "1px solid var(--secondary-color) !important",
      };
      cls += " px-3 py-2";
      resolvedIconColor = resolvedIconColor || style.color;
    } else if (!text) {
      cls += " border-none";
    }

    if (text) {
      style = {
        background: "transparent",
        color: "var(--secondary-color)",
      };
      cls += " border-none";
      resolvedIconColor = resolvedIconColor || style.color;
    }

    resolvedIconColor = resolvedIconColor || style.color;

    return { estilo: style, classNames: cls.trim(), iconColor: resolvedIconColor };
  }, [outlined, text, corBotao, corTexto, classes]);

  return botaoIcone ? (
    <Button className={`text-secondary ${classNames}`} type="button" outlined={outlined} text={text} icon={icon} rounded onClick={onClick} onFocus={(e) => e.target.blur()} pt={{ icon: { style: { color: iconColor } }, root: { style: { border: outlined ? "1px solid var(--secondary-color) !important" : "" } } }} data-pr-tooltip={tooltip} tooltip={tooltip} />
  ) : (
    <Button
      style={estilo}
      className={classNames}
      icon={carregando ? "pi pi-spinner-dotted pi-spin" : icon}
      iconPos={posicaoIcon}
      label={carregando ? "" : texto}
      outlined={outlined}
      rounded={rounded}
      type={tipo}
      text={text}
      onFocus={(e) => e.target.blur()}
      onClick={onClick}
      disabled={disabled || carregando}
      pt={{ icon: { style: { color: iconColor } } }}
      data-pr-tooltip={tooltip}
      tooltip={tooltip}
    />
  );
};

export default Botao;
