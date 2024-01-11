"use client";
import {KeyboardEvent, useCallback, useEffect, useRef, useState} from "react";
import { Tile, Keyboard } from "../components";

export interface TileInterface {
  index: number;
  key: string;
  input?: string | undefined;
  isActive: boolean;
  wordLast?: boolean;
}

export default function Home() {

  // lowerCaseLetters and upperCaseLetters are for our keyboard input checking list.
  const lowerCaseLetters = "abcçdefgğhıijklmnöopqrsştuüvwxyz";
  const upperCaseLetters = "ABCÇDEFGĞHIİJKLMNOÖPQRSŞTUÜVWXYZ";

  // tiles stands for our input
  const [tiles, setTiles] = useState<TileInterface[]>([
    { index: 0, key: "A", input: undefined, isActive: true },
    { index: 1, key: "L", input: undefined, isActive: true },
    { index: 2, key: "İ", input: undefined, isActive: true },
    { index: 3, key: "C", input: undefined, isActive: true },
    { index: 4, key: "A", input: undefined, isActive: true },
    { index: 5, key: "N", input: undefined, isActive: true, wordLast: true },
    { index: 6, key: "E", input: undefined, isActive: true },
    { index: 7, key: "V", input: undefined, isActive: true },
    { index: 8, key: "E", input: undefined, isActive: true, wordLast: true },
    { index: 9, key: "K", input: undefined, isActive: true },
    { index: 10, key: "O", input: undefined, isActive: true },
    { index: 11, key: "Ş", input: undefined, isActive: true, wordLast: true },
  ]);

  const [wordSize,setWordSize]=useState(3); // It stands for that how many word contains our input. It will be assigned according to inputs wordLast number.

  const [counter, setCounter] = useState(60); // Counter state for Game counter. Counter starts from 60 sec initially.

  const [isWrong, setIsWrong] = useState(false); // isWrong state for checking answer is wrong or true.

  const [isCorrect, setIsCorrect] = useState(false); // isWrong state for checking answer is wrong or true.

  // In every 5 secs this function activate an empty tile for user to give a hint. It checks tempTile list that unactivated tiles after that it activates random unactivated tile.
  // This function also reduce the game counter.

  useEffect(() => {
    counter > 0 &&
      setTimeout(() => {
        if (counter % 2 === 1) {
          const tilesTemp = tiles.filter((tile) => tile.isActive);

          if (tilesTemp.length > 0) {
            const randomIndex = randomNumber(0, tilesTemp.length);
            const selectedTileIndex = tilesTemp[randomIndex].index;

            setTiles((prev) => {
              prev[selectedTileIndex].input = prev[selectedTileIndex].key;
              prev[selectedTileIndex].isActive = false;
              return [...prev];
            });
          }
        }

        setCounter(counter - 1);
      }, 1000);
  }, [counter]);

  // A function for keyboard event settings
  const setEvent = (key: string) => {
    if (lowerCaseLetters.includes(key) || upperCaseLetters.includes(key)) {
      const tilesTemp = tiles;
      const empty = tilesTemp.find((tile) => !tile.input);

      if (empty && empty.isActive) {
        empty.input = key.toLocaleUpperCase("tr-TR");
        setTiles([...tilesTemp]);
      }
    }

    if (key === "Backspace") {
      const tilesTemp = tiles;
      let lastIndex = tilesTemp.findLastIndex(
        (tile) => tile.input && tile.isActive
      );
      if (lastIndex >= 0) {
        tilesTemp[lastIndex].input = undefined;
        setTiles([...tilesTemp]);
      }
    }

    if (key === "Enter") {
      // setIsWrong(true);
      // setTimeout(() => {
      //   setIsWrong(false);
      // }, 1000);

      setIsCorrect(true);
      // setTimeout(() => {
      //   setIsCorrect(false);
      //   setWordSize(2);
      //   setTiles([
      //     {index: 0, key: 'Ü', input: undefined, isActive: true},
      //     {index: 1, key: 'Ç', input: undefined, isActive: true, wordLast: true},
      //     {index: 2, key: 'G', input: undefined, isActive: true},
      //     {index: 3, key: 'Ü', input: undefined, isActive: true},
      //     {index: 4, key: 'N', input: undefined, isActive: true},
      //     {index: 5, key: 'L', input: undefined, isActive: true},
      //     {index: 6, key: 'Ü', input: undefined, isActive: true},
      //     {index: 7, key: 'C', input: undefined, isActive: true},
      //     {index: 8, key: 'E', input: undefined, isActive: true},
      //     {index: 9, key: 'K', input: undefined, isActive: true,wordLast:true}]);
      //
      //
      // }, 1000);


    }
  };

  // A function for generating tile objects. It checks input which is word, then generate tiles according its wordSize and pushes to tilesObject list. Then it adds this generated tiles to jsx object.
  const genTiles = (tiles: TileInterface[]) => {
    let counter2 = 0;

    let tilesObject: { [k: string]: TileInterface[] } = {};

    while (counter2 < wordSize) {
      tiles.forEach((tile) => {
        tilesObject[counter2] = [...(tilesObject[counter2] || []), tile];
        tile.wordLast && counter2++;
      });
    }

    return Object.keys(tilesObject).map((key, index) => {
      return (
        <div key={index} className="flex flex-row my-2">
          {tilesObject[key].map((tile, index) => {
            return (
              <Tile
                key={index}
                className="mx-1"
                input={tile.input || ""}
                isActive={tile.isActive}
                isWrong={isWrong}
                isCorrect={isCorrect}
              />
            );
          })}
        </div>
      );
    });
  };

  // Function for setting keyboard events.
  const keyDownEvent = (event: KeyboardEvent<HTMLDivElement>) => {
    setEvent(event.key);
  };

  // Focus operations to main area. When user enters site it will focus main object so the user can write without click on site.
  const GameAreaRef = useRef<any>();
  useEffect(() => {
    if (GameAreaRef) {
      GameAreaRef.current.focus();
    }
  }, []);

  return (
    <main
      ref={GameAreaRef}
      tabIndex={-1}
      className="bg-[#E6F4F1] w-screen h-screen flex justify-center"
      onKeyDown={keyDownEvent}
    >
      <div className="flex flex-col items-center">
        <div
          className="flex flex-col items-center bg-[#014c7c] px-10 pt-16 pb-5"
          style={{ width: "fit-content", borderRadius: "0 0 15px 15px" }}
        >
          {genTiles(tiles)}

          <div
            className="bg-[#4990B0] px-3 py-2 text-center"
            style={{
              minWidth: "60px",
              position: "relative",
              bottom: "-42px",
              borderRadius: "15px",
            }}
          >
            <span className="text-2xl text-white">{counter}</span>
          </div>
        </div>

        <div
          className="bg-[#FFEBCD] p-5 mt-8 flex"
          style={{ width: "70%", borderRadius: "15px" }}
        >
          <span className="text-center my-3">
            Karara bağladığı halde uygulamamak, Karara bağladığı halde
            uygulamamak,{" "}
          </span>
        </div>

        <Keyboard onClick={(value) => setEvent(value)}></Keyboard>
      </div>
    </main>
  );

  function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  async function GetRandomWordFromTdk() {
    // const randomIdForWord = randomNumber(0, 14487);
    // const response = await fetch(
    //   "https://sozluk.gov.tr/taramaId?id=" + randomIdForWord
    // );
    // const word = await response.json();
    // console.log("İstek atılan kelime: ", word.kelime);
    // console.log("İstek atılan randomId: ", randomIdForWord);

    // const tempTileArr: TileInterface[] = [];
    // const wordDefinition = word.anlam;

    // for (let i = 0; i < word.kelime.length; i++) {
    //   // if(word.kelime[i]===" "){
    //   //   tempTileArr[i] = {index:i,key:word.kelime[i],input:undefined,isActive:true,wordLast:true}
    //   // }
    //   // else if(word.kelime[i] ===","){
    //   //   break;
    //   // }
    //   // else if(word.kelime[i]==="("){
    //   //   tempTileArr.pop();
    //   //   break;
    //   // }
    //   // else{
    //   //   tempTileArr[i] = {index:i,key:word.kelime[i],input:undefined,isActive:true}
    //   // }

    //   const character = word.kelime[i];


    //   if (character === ",") {
    //     break;
    //   }
    //   const tile: TileInterface = {
    //     index: i,
    //     key: character,
    //     input: undefined,
    //     isActive: true,
    //   };
    //   if (character === " ") {
    //     tempTileArr[i-1].wordLast=true;
    //     continue;
    //   } else if (character === "(") {
    //     tempTileArr.pop();
    //     break;
    //   }
    //   tempTileArr.push(tile);
    // }
    // console.log("tempTileArr:", tempTileArr);
    // console.log("kelime anlamı:",wordDefinition);

    // // setTiles(tempTileArr);
    // return word;
    await setTimeout(() => {
      setWordSize(2);
      setTiles([
        {index: 0, key: 'Ü', input: undefined, isActive: true},
        {index: 1, key: 'Ç', input: undefined, isActive: true, wordLast: true},
        {index: 2, key: 'G', input: undefined, isActive: true},
        {index: 3, key: 'Ü', input: undefined, isActive: true},
        {index: 4, key: 'N', input: undefined, isActive: true},
        {index: 5, key: 'L', input: undefined, isActive: true},
        {index: 6, key: 'Ü', input: undefined, isActive: true},
        {index: 7, key: 'C', input: undefined, isActive: true},
        {index: 8, key: 'E', input: undefined, isActive: true},
        {index: 9, key: 'K', input: undefined, isActive: true,wordLast:true}]);
    }, 1000);

  }
}
