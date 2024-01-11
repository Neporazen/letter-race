"use client";
import Image from "next/image";
import Sad from "../../../public/sad.gif";
import { ActionButton } from "@/components/common/action-button";

export const FailPage = ({ returnMenu }: { returnMenu: () => void }) => {
  return (
    <div className="bg-[#E6F4F1] flex flex-col items-center w-full h-[100vh]">
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
        <span className="text-[#D24848] font-bold text-5xl pb-3">ÜZGÜNÜM</span>
        <span className="text-[#014c7c] font-bold">Günlük Bulmacayı</span>
        <span className="text-[#014c7c] font-bold">
          Maalesef Tamamlayamadın
        </span>
      </div>

      <Image priority={true} src={Sad} alt="X" width={300} height={300} />

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
    </div>
  );
};
