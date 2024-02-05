import React from "react";
import styled from "styled-components";
import MatchResult from "./MatchResult";
import { PLAYER_NAMES } from "../constants";

export default function MatchList({
  heroes,
  matchIds,
  matchPlayers,
  matchesByPlayer,
}) {
  return (
    <Table>
      <thead>
        <tr>
          <th />
          <th />
          <th />
          <th />
          <th style={{ textAlign: "right", padding: "2px 4px" }}>K</th>
          <th style={{ textAlign: "right", padding: "2px 4px" }}>D</th>
          <th style={{ textAlign: "right", padding: "2px 4px" }}>A</th>
          <th style={{ textAlign: "right", padding: "2px 4px" }}>party</th>
          <th />
        </tr>
      </thead>
      {matchIds.map((matchId) => (
        <tbody key={matchId} style={{ padding: "1rem 0" }}>
          {matchPlayers[matchId].map((playerId, i) => {
            const match = matchesByPlayer[playerId][matchId];
            const show = i === 0;
            return (
              <tr
                key={playerId}
                style={{
                  borderTop: show ? "1px solid #ccc" : "",
                }}
              >
                <HeroImg {...match} heroes={heroes} />
                <MatchResult {...match} show={show} />
                <PlayerName playerId={playerId} />
                <MatchDate {...match} show={show} />
                <K {...match} />
                <D {...match} />
                <A {...match} />
                <PartySize {...match} show={show} />
                <Links {...match} show={show} />
              </tr>
            );
          })}
        </tbody>
      ))}
    </Table>
  );
}

const Table = styled.table`
  border-collapse: collapse;
  font-family: monospace;
  & td {
    padding: 2px 4px;
  }
`;

const PlayerName = ({ playerId }) => <PN>{PLAYER_NAMES[playerId]}</PN>;
const PN = styled.td`
  padding-left: 1rem !important;
`;
const K = ({ kills }) => <N color="hsl(120, 60%, 40%)">{kills}</N>;
const D = ({ deaths }) => <N color="hsl(0, 40%, 40%)">{deaths}</N>;
const A = ({ assists }) => <N color="rgba(255,255,255,0.5)">{assists}</N>;

const HeroImg = ({ hero_id, heroes }) => {
  if (!Object.keys(heroes).length) return <td />;
  const hero = heroes[hero_id];
  if (hero) {
    const name = heroes[hero_id].name.replace("npc_dota_hero_", "");
    return (
      <td>
        <img
          alt=""
          height="30"
          width="53"
          src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${name}_full.png`}
          style={{ background: "hsla(200, 50%, 90%, 10%)" }}
        />
      </td>
    );
  } else {
    return (
      <td>
        <span
          style={{
            height: "30px",
            width: "53.33px",
            display: "inline-block",
            background: "#ccc",
          }}
        />
      </td>
    );
  }
};

const PartySize = ({ party_size, show }) => <N>{show ? party_size : null}</N>;

const Links = ({ match_id, show }) => (
  <td style={{ paddingLeft: "2rem", opacity: 0.5 }}>
    {show ? (
      <span>
        <a href={`https://dotabuff.com/matches/${match_id}`}>dotabuff</a>{" "}
        <a href={`https://opendota.com/matches/${match_id}`}>opendota</a>
      </span>
    ) : null}
  </td>
);

const MatchDate = ({ show, start_time, duration }) => (
  <Subdued style={{ textAlign: "right" }}>
    {show
      ? new Date((start_time + duration) * 1000).toLocaleString("en-US", {
          weekday: "short",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
      : null}
  </Subdued>
);
const Subdued = styled.td`
  color: rgba(255, 255, 255, 0.5);
  padding-left: 2rem !important;
  padding-right: 2rem !important;
`;

const N = styled.td`
  text-align: right;
  color: ${(props) => props.color || null};
`;
