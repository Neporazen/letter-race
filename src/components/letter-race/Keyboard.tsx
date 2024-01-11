import React from "react";
import {Key} from "./Key";

export const Keyboard = ({onClick}: {onClick: (value: string) => void}) => {
  return (
    <div className={"flex flex-col items-center mt-4"}>
      <div className={"flex flex-row"}>
        <Key value= "Q" onClick={() => onClick('q')} />
        <Key value= "W" onClick={() => onClick('w')} />
        <Key value= "E" onClick={() => onClick('e')} />
        <Key value= "R" onClick={() => onClick('r')} />
        <Key value= "T" onClick={() => onClick('t')} />
        <Key value= "Y" onClick={() => onClick('y')} />
        <Key value= "U" onClick={() => onClick('u')} />
        <Key value= "I" onClick={() => onClick('ı')} />
        <Key value= "O" onClick={() => onClick('o')} />
        <Key value= "P" onClick={() => onClick('p')} />
        <Key value= "Ğ" onClick={() => onClick('ğ')} />
        <Key value= "Ü" onClick={() => onClick('ü')} />
        <Key value= "⌫" onClick={() => onClick('Backspace')} />
      </div>
      <div className={"flex flex-row my-1"}>
        <Key value= "A" onClick={() => onClick('a')} />
        <Key value= "S" onClick={() => onClick('s')} />
        <Key value= "D" onClick={() => onClick('d')} />
        <Key value= "F" onClick={() => onClick('f')} />
        <Key value= "G" onClick={() => onClick('g')} />
        <Key value= "H" onClick={() => onClick('h')} />
        <Key value= "J" onClick={() => onClick('j')} />
        <Key value= "K" onClick={() => onClick('k')} />
        <Key value= "L" onClick={() => onClick('l')} />
        <Key value= "Ş" onClick={() => onClick('ş')} />
        <Key value= "İ" onClick={() => onClick('i')} />


      </div>
      <div className={"flex flex-row"}>
        <Key value= "Z" onClick={() => onClick('z')} />
        <Key value= "X" onClick={() => onClick('x')} />
        <Key value= "C" onClick={() => onClick('c')} />
        <Key value= "V" onClick={() => onClick('v')} />
        <Key value= "B" onClick={() => onClick('b')} />
        <Key value= "N" onClick={() => onClick('n')} />
        <Key value= "M" onClick={() => onClick('m')} />
        <Key value= "Ö" onClick={() => onClick('ö')} />
        <Key value= "Ç" onClick={() => onClick('ç')} />
        <Key value= "↵" onClick={() => onClick('Enter')} />

      </div>
    </div>
  );
}
