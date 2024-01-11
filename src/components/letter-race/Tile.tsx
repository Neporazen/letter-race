"use client";
import { useCallback, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export const Tile = ({input, isActive, className, isWrong, isCorrect}: {
  input: string,
  isActive: boolean,
  className?: string,
  isWrong: boolean,
  isCorrect: boolean
}) => {
  const controls = useAnimation();

  const animation = useCallback(async () => {
    await controls.start({
      scale: 1.2,
      transition: {
        type: 'spring',
        duration: 0.1
      }
    });
    controls.start({
      scale: 1,
      transition: {
        type: 'spring',
        duration: 0.5
      }
    }).then();
  }, []);

  const wrongAnimation = useCallback(async () => {
    await controls.start({
      scale: 1.1,
      border: '2px solid #D16870',
      transition: {
        type: 'spring',
        duration: 0.25
      }
    });
    controls.start({
      scale: 1,
      border: '1px solid #FFFFFF',
      transition: {
        type: 'spring',
        duration: 0.5
      }
    }).then();
  }, []);

  const correctAnimation = useCallback(async () => {
    await controls.start({
      scale: 1.1,
      border: '2px solid #538d4e',
      backgroundColor: '#538d4e',
      transition: {
        type: 'spring',
        duration: 0.5
      }
    });
    controls.start({
      scale: 1,
      backgroundColor: '#00000000',
      border: '1px solid #FFFFFF',
      transition: {
        type: 'spring',
        duration: 0.5
      }
    }).then();
  }, []);

  useEffect(() => {
    if (input) {
      animation().then();
    }
  }, [input, animation])

  useEffect(() => {
    isWrong && wrongAnimation().then();
  }, [isWrong, wrongAnimation, animation])

  useEffect(() => {
    isCorrect && correctAnimation().then();
  }, [isCorrect, correctAnimation, animation]);

  return (
    <motion.div
      initial={false}
      animate={controls}
      className={"border border-1 w-[75px] h-[75px] flex items-center justify-center bg-transparent " + className}
    >
      <span
        className="text-2xl font-semibold"
        style={{color: isActive ? "white" : "#fbe600"}}
      >{input}</span>
    </motion.div>
  );
}
