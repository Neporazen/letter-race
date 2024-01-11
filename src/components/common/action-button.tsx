import {motion} from "framer-motion";
import {Comfortaa} from "next/font/google";

const comfortaa = Comfortaa({subsets: ["latin"], weight: ['300', '400', '500', '600', '700']});

export interface ActionButtonProps {
  text: string;
  fontSize?: string;
  bgColor: string;
  borderColor: string;
  color: string;
  hoverBgColor?: string;
  hoverBorderColor?: string;
  hoverColor?: string;
  onClick?: () => void;
}

export const ActionButton = (
  {
    text,
    fontSize,
    bgColor,
    borderColor,
    color,
    onClick,
    hoverBgColor,
    hoverBorderColor,
    hoverColor
  }: ActionButtonProps
) => {
  return (
    <motion.button
      className={comfortaa.className}
      style={{
        backgroundColor: bgColor,
        border: "1px solid",
        borderColor: borderColor,
        borderRadius: '30px',
        color: color,
        padding: '10px 30px 10px 30px',
        fontSize: fontSize ? fontSize : '32px',
      }}
      whileHover={{
        scale: 1.2,
        backgroundColor: hoverBgColor ? hoverBgColor : bgColor,
        color: hoverColor ? hoverColor : color,
        borderColor: hoverBorderColor ? hoverBorderColor : borderColor
      }}
      whileTap={{scale: 0.8}}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
}
