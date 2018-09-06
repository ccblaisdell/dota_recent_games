import React from "react";
import styled from "styled-components";

export default function MatchResult(match) {
  const won = isWin(match);
  const text = won ? "W" : "L";
  return match.show ? <Result won={won}>{text}</Result> : <Result won={won} />;
}

const isRadiant = ({ player_slot }) => player_slot < 20;
const isWin = ({ player_slot, radiant_win }) =>
  (isRadiant({ player_slot }) && radiant_win) ||
  (!isRadiant({ player_slot }) && !radiant_win);

const Result = styled.td`
  background-color: ${props => (props.won ? "#693" : "#c33")};
  color: #fff;
  padding-left: 0.5rem !important;
  padding-right: 0.5rem !important;
`;
