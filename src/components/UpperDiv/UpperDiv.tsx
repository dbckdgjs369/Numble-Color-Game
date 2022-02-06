import React from "react";

type UpperDivType = {
  stage: number;
  time: number;
  score: number;
};

export default function UpperDiv(props: UpperDivType) {
  return (
    <div style={{ textAlign: "left" }}>
      스테이지: {props.stage}, 남은시간: {props.time}, 점수: {props.score}
    </div>
  );
}
