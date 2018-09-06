import React from "react";
import PLAYER_DATA from "../data/players";
import HERO_DATA from "../data/heroes";
import Head from "next/head";
import { Col, Desc, Styles, Title, Wrapper } from "../components/Layout";
import { PLAYER_IDS, PLAYER_NAMES } from "../constants";
import Nav from "../components/Nav";
import addMatches from "../utils/addMatches";

export default class Stupocalypse2018 extends React.Component {
  state = {
    heroes: {},
    matchesByPlayer: PLAYER_IDS.reduce((acc, id) => ({ ...acc, [id]: [] }), {}),
    matchIds: [],
    matchPlayers: {},
    startTimes: {}
  };

  componentWillMount() {
    PLAYER_IDS.forEach(id => this.getMatchesForPlayer(id));
    this.setState({ heroes: getHeroes() });
  }

  getMatchesForPlayer(playerId) {
    const matches = await import(`../data/${playerId}.json`);
    this.setState(addMatches(playerId, matches));
  }

  getMatch(matchId) {
    return this.state.matchesByPlayer[this.state.matchPlayers[matchId][0]][
      matchId
    ];
  }

  render() {
    const { heroes, matchesByPlayer, matchIds, matchPlayers } = this.state;
    return (
      <div>
        <Styles />
        <Nav />
        <Head>
          <title>Stupocalypse 2018</title>
        </Head>
        <Wrapper>
          <Col>
            <Title>Stupocalypse 2018</Title>
            <MatchList
              heroes={heroes}
              matchIds={matchIds}
              matchPlayers={matchPlayers}
              matchesByPlayer={matchesByPlayer}
            />
          </Col>
        </Wrapper>
      </div>
    );
  }
}
