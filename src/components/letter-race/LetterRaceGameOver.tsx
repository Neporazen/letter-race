import { ActionButton } from "../common";
import Image from "next/image";
import WellDone from "../../../public/wellDone.gif";

export const LetterRaceGameOver = ({
  playAgain,
  returnMenu,
  totalScore,
}: {
  playAgain: () => void;
  returnMenu: () => void;
  totalScore: number;
}) => {
  return (
    <div className="bg-[#E6F4F1] flex flex-col items-center w-full h-full">
      <div
        style={{
          margin: "50px 25px 50px 25px",
          fontSize: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#EBE7D9",
        }}
      >
        <span
          style={{ margin: "0px 0 25px 0", color: "#D24848", fontWeight: 700 }}
        >
          Bildiğin Soru : {totalScore}
        </span>

        <span className="text-[#014c7c] font-bold">TEBRİKLER</span>
        <span className="text-[#014c7c] font-bold">Bilgine Sağlık :)</span>
      </div>

      <Image priority={true} src={WellDone} alt="X" width={300} height={300} />

      <div
        className="menu-buttons"
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "75px",
        }}
      >
        {/* Blue Color: #63E2D4 */}
        <div
          style={{
            margin: "0 15px 0 15px",
          }}
        >
          <ActionButton
            text={"Tekrar Oyna"}
            fontSize={"24px"}
            bgColor={"#ffffff"}
            color={"#000000"}
            borderColor={"#000000"}
            onClick={playAgain}
          />
        </div>
        <div style={{ margin: "0 15px 0 15px" }}>
          <ActionButton
            text={"Menü"}
            fontSize={"24px"}
            bgColor={"#ffffff"}
            color={"#000000"}
            borderColor={"#000000"}
            onClick={returnMenu}
          />
        </div>
      </div>
    </div>
  );
};
