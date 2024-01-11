import React from "react";

export const Key = ({value, onClick}: { value: string, onClick: () => void }) => {
  return (
    <button
      className={"w-[35px] h-[50px] mx-0.5 bg-[#364954] text-white rounded-md"}
      onClick={() => onClick()}
    >{value}</button>
  );
}
