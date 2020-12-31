import React from "react";
import axios from "axios";
import styled from "styled-components";
// import PLAYER_DATA from "../data/players";
import Head from "next/head";
import { Col, Desc, Styles, Title, Wrapper } from "../components/Layout";
import MatchList from "../components/MatchList";
import MatchResult from "../components/MatchResult";
import { PLAYER_IDS, PLAYER_NAMES } from "../constants";
import { url } from "../data/api";
import addMatches from "../utils/addMatches";
import getHeroes from "../utils/getHeroes";

export default class RecentGames extends React.Component {
  state = {
    heroes: {},
    matchesByPlayer: PLAYER_IDS.reduce((acc, id) => ({ ...acc, [id]: [] }), {}),
    matchIds: [],
    matchPlayers: {},
    startTimes: {},
  };

  componentWillMount() {
    PLAYER_IDS.forEach((id) => this.getRecentMatchesForPlayer(id));
    this.getHeroes();
  }

  getRecentMatchesForPlayer(playerId) {
    // this.setState(addMatches(playerId, PLAYER_DATA[playerId]));
    axios
      .get(url(`players/${playerId}/recentMatches`))
      .then(({ data }) => this.setState(addMatches(playerId, data)));
  }

  getMatch(matchId) {
    return this.state.matchesByPlayer[this.state.matchPlayers[matchId][0]][
      matchId
    ];
  }

  getHeroes() {
    this.setState({
      heroes: getHeroes(),
    });
  }

  render() {
    const { heroes, matchesByPlayer, matchIds, matchPlayers } = this.state;
    return (
      <div>
        <Wrapper>
          <Styles />
          <Head>
            <title>Recent Dota Matches</title>
          </Head>
          <Col>
            <Title>Recent matches</Title>
            <Desc>
              Most recent 20 games per player. When a match is listed, there is
              no guarantee that it shows all the players who were in the party.
            </Desc>
            <MatchList
              heroes={heroes}
              matchIds={matchIds}
              matchPlayers={matchPlayers}
              matchesByPlayer={matchesByPlayer}
            />
          </Col>
          <Col>
            <Title>Results per player</Title>
            <Desc>Results of last 20 games for each</Desc>
            <div>
              {PLAYER_IDS.map((playerId) => (
                <div key={playerId}>
                  <div>{PLAYER_NAMES[playerId]}</div>
                  <ResultList>
                    {matchIds
                      .filter((matchId) =>
                        matchPlayers[matchId].includes(playerId)
                      )
                      .map((matchId) => (
                        <li key={matchId} style={{ display: "inline-block" }}>
                          <MatchResult
                            {...this.getMatch(matchId)}
                            show={true}
                          />
                        </li>
                      ))}
                  </ResultList>
                </div>
              ))}
            </div>
          </Col>
        </Wrapper>
      </div>
    );
  }
}

const ResultList = styled.ol`
  list-style: none;
  margin: 0 0 1rem;
  padding: 0;
`;
