"use client";
import { useCallback, useState } from "react";
import {
  LetterRaceGame,
  LetterRaceMenu,
  LetterRaceGameOver,
  SuccessPage,
  FailPage,
} from "@/components";
import {
  LetterRaceInterface,
  SupabaseResponseInterface,
  TileInterface,
} from "@/models";

export default function Page() {
  const [menuActive, setMenuActive] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gameData, setGameData] = useState<TileInterface[][]>([]);
  const [LRData, setLRData] = useState<LetterRaceInterface[]>([]);
  const [gameType, setGameType] = useState("");

  const [score, setScore] = useState(0);

  const getData = useCallback(async (type: string) => {
    setLoading(true);
    const data = (await fetch(`/api/letter-race-${type}`)
      .then((res) => res.json())
      .then((data: SupabaseResponseInterface<LetterRaceInterface>) => {
        console.log(data);
        return data?.data || [];
      })
      .catch((err) => setLoading(false))) as LetterRaceInterface[];

    if (data && data?.length) {
      setLRData(data);
      makeGameData(data);
      setMenuActive(false);
      setLoading(false);
    }
  }, []);

  const makeGameData = (data: LetterRaceInterface[]) => {
    const array: TileInterface[][] = [];

    data.forEach((item) => {
      let index = 0;
      const tiles: TileInterface[] = [];
      // console.log('WORD: ',item.words)
      for (let i = 0; i < item.words.length; i++) {
        if (item.words[i] === " ") {
          tiles[index - 1].wordLast = true;
        } else {
          tiles.push({
            index,
            wordLast: false,
            key: item.words[i].toLocaleUpperCase("tr-TR"),
            input: undefined,
            isActive: true,
          });
          index++;
        }
      }
      tiles[tiles.length - 1].wordLast = true;
      // console.log('TILES: ',tiles)
      array.push(tiles);
    });

    setGameData(array);
  };

  return (
    <main className="w-screen h-screen">
      {menuActive && (
        <LetterRaceMenu
          loading={loading}
          onClick={(type) => {
            setScore(0);
            setGameType(type);
            getData(type).then();
          }}
        />
      )}
      {!menuActive && !gameOver && (
        <LetterRaceGame
          data={gameData}
          LRData={LRData}
          gameOver={(gameScore) => {
            setScore(gameScore);
            setGameOver(true);
          }}
        />
      )}

      {!menuActive && gameOver && gameType == "marathon" && (
        <LetterRaceGameOver
          playAgain={() => {
            setGameOver(false);
            setMenuActive(true);
            getData(gameType);
          }}
          returnMenu={() => {
            setMenuActive(true);
            setGameOver(false);
          }}
          totalScore={score}
        />
      )}

      {!menuActive && gameOver && gameType == "daily" && score == 10 && (
        <SuccessPage
          returnMenu={() => {
            console.log("menü dön");

            setMenuActive(true);
            setGameOver(false);
          }}
        />
      )}

      {!menuActive && gameOver && gameType == "daily" && score < 10 && (
        <FailPage
          returnMenu={() => {
            console.log("menü dön");

            setMenuActive(true);
            setGameOver(false);
          }}
        />
      )}
    </main>
  );
}
