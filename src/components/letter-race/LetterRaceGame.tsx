import { LetterRaceInterface, TileInterface } from "@/models";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValue, animate } from "framer-motion";
import { randomNumber } from "@/utils";
import { Tile } from "./Tile";
import { Keyboard } from "./Keyboard";

export const LetterRaceGame = ({
  data,
  LRData,
  gameOver,
}: {
  data: TileInterface[][];
  LRData: LetterRaceInterface[];
  gameOver: (score: number) => void;
}) => {
  const lowerCaseLetters = "abcçdefgğhıijklmnöopqrsştuüvwxyz";
  const upperCaseLetters = "ABCÇDEFGĞHIİJKLMNOÖPQRSŞTUÜVWXYZ";

  const [tileIndex, setTileIndex] = useState(0);

  const [tiles, setTiles] = useState<TileInterface[]>([]);

  const [wordSize, setWordSize] = useState(0); // It stands for that how many word contains our input. It will be assigned according to inputs wordLast number.

  const [counter, setCounter] = useState(45); // Counter state for Game counter. Counter starts from 60 sec initially.

  const [isWrong, setIsWrong] = useState(false); // isWrong state for checking answer is wrong or true.

  const [isCorrect, setIsCorrect] = useState(false); // isWrong state for checking answer is wrong or true.

  const [hintCounter, setHintCounter] = useState(5);

  const [currentScore, setCurrentScore] = useState(0);

  const questionPercentage = useMotionValue(0);

  const GameAreaRef = useRef<any>();

  useEffect(() => {
    if (GameAreaRef) {
      GameAreaRef.current.focus();
    }
    if (data && data?.length) {
      setNewQuestion();
    }
  }, []);

  const setNewQuestion = () => {
    setWordSize(data[tileIndex]?.filter((tile) => tile.wordLast)?.length || 0);
    setTiles(data[tileIndex]);
    setTileIndex(tileIndex + 1);
    animate(questionPercentage, ((tileIndex + 1) * 100) / data.length, {
      type: "spring",
    });
  };

  useEffect(() => {
    setInterval(() => {
      setCounter((prev) => prev - 1);
      setHintCounter((prev) => prev - 1);
    }, 1000);
  }, []);

  useEffect(() => {
    console.log(data.length);
    if (currentScore === data.length || counter == 0) {
      gameOver(currentScore);
    }
    if (hintCounter == 0) {
      setHintCounter(5);
    }
    if (currentScore <= data.length && counter > 0 && hintCounter % 5 === 1) {
      const tilesTemp = tiles.filter((tile) => tile.isActive);

      if (tilesTemp.length > 0) {
        const randomIndex = randomNumber(0, tilesTemp.length);
        const selectedTileIndex = tilesTemp[randomIndex].index;

        console.log("SELECTED INDEX: ", selectedTileIndex);

        setTiles((prev) => {
          console.log("PREV: ", prev);

          prev[selectedTileIndex].input = prev[selectedTileIndex].key;
          prev[selectedTileIndex].isActive = false;

          if (prev?.filter((tile) => tile.isActive).length === 0) {
            setTimeout(() => {
              setNewQuestion();
            }, 500);
          }

          return [...prev];
        });
      }
    }
  }, [counter, hintCounter]);

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
      const word = tiles.map((tile) => tile.input).join("");
      const answer = LRData[tileIndex - 1].words
        .replaceAll(" ", "")
        .toLocaleUpperCase("tr-TR");
      if (answer === word) {
        setIsCorrect(true);

        setTimeout(() => {
          setIsCorrect(false);
          setCurrentScore((prev) => prev + 1);
          setNewQuestion();
          setHintCounter(5);
          setCounter((prev) => prev + 10);
        }, 1000);
      } else {
        setIsWrong(true);
        setTimeout(() => {
          setIsWrong(false);
        }, 1000);
      }
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

  return (
    <main
      ref={GameAreaRef}
      tabIndex={-1}
      className="bg-[#E6F4F1] w-screen h-screen flex justify-center"
      onKeyDown={keyDownEvent}
    >
      <motion.div
        className="progress-bar"
        style={{ scaleX: questionPercentage }}
      ></motion.div>

      <div className="flex flex-col items-center">
        <div
          className="flex flex-col items-center bg-[#014c7c] px-10 pt-14 pb-5"
          style={{ width: "fit-content", borderRadius: "0 0 15px 15px" }}
        >
          <div className=" text-yellow-300 text-lg font-semibold justify-center items-center">
            Skor : {currentScore}
          </div>

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
          <span className="text-center my-3 first-letter:capitalize">
            {LRData?.[tileIndex - 1]?.definition}
          </span>
        </div>

        <Keyboard onClick={(value) => setEvent(value)}></Keyboard>
      </div>
    </main>
  );
};
