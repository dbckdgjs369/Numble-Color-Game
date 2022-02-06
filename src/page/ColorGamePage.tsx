import React, { useEffect, useState } from "react";
import UpperDiv from "../components/UpperDiv/UpperDiv";
import { LowerDiv } from "./styled";
import ColorBox from "../components/ColorBox/ColorBox";

export default function ColorgamePage() {
  const [stage, setStage] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [time, setTime] = useState<number>(15);
  const [color, setColor] = useState<string>("");
  const [diffcolor, setdiffColor] = useState<string>("");
  const [diffindex, setDiffIndex] = useState<number>(
    Math.floor(Math.random() * Math.pow(Math.round((stage + 0.5) / 2) + 1, 2))
  );

  function getRanColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let amount = 40 - stage * 0.5;
    setColor(`rgb(${r},${g},${b})`);
    setdiffColor(`rgb(${r + amount},${g + amount},${b + amount})`);
    setDiffIndex(
      Math.floor(Math.random() * Math.pow(Math.round((stage + 0.5) / 2) + 1, 2))
    );
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    if (time < 0) {
      alert(`GAME OVER!\n스테이지: ${stage}, 점수: ${score}`);
      clearInterval(timer);
      setScore(0);
      setStage(1);
      setTime(15);
      setDiffIndex(
        Math.floor(Math.random() * Math.pow(Math.round((1 + 0.5) / 2) + 1, 2))
      );
    }
    return () => clearInterval(timer);
  }, [time]);

  const moveToNextRound = () => {
    setStage((stage) => stage + 1);
    getRanColor();
    setScore(Math.pow(stage, 3) * time);
    setTime(15);
  };

  const wrongAnswer = () => {
    setTime(time >= 3 ? time - 3 : 0);
  };
  useEffect(() => {
    getRanColor();
  }, []);

  const box = new Array(Math.pow(Math.round((stage + 0.5) / 2) + 1, 2)).fill(
    ""
  );

  return (
    <div>
      <UpperDiv time={time} stage={stage} score={score} />
      <LowerDiv
        style={{
          gridTemplateColumns: `repeat(${
            Math.round((stage + 0.5) / 2) + 1
          } ,1fr)`,
          gridGap: "3px",
        }}
      >
        {box.map((_, index) =>
          index === diffindex ? (
            <ColorBox onClick={moveToNextRound} style={diffcolor}></ColorBox>
          ) : (
            <ColorBox onClick={wrongAnswer} style={color}></ColorBox>
          )
        )}
      </LowerDiv>
    </div>
  );
}
