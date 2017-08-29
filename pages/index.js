import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PLAYER_DATA from '../data/players';
import HERO_DATA from '../data/heroes';

const API = 'https://api.opendota.com/api/';
const url = path => API + path;

const PLAYER_NAMES = {
  '105605638': 'Charlymurphyyy',
  '6498909': 'Dialuposaurus',
  '63658494': 'Roamin Ronin',
  '71227969': 'Uncle Ginger',
  '44427624': 'hoplyte',
  '65500551': 'losandro',
  '44273131': 'mgrif',
};

const PLAYER_IDS = [
  '105605638',
  '6498909',
  '63658494',
  '71227969',
  '44427624',
  '65500551',
  '44273131',
];

export default class RecentGames extends React.Component {
  state = {
    heroes: {},
    matchesByPlayer: PLAYER_IDS.reduce((acc, id) => ({ ...acc, [id]: [] }), {}),
    matchIds: [],
    matchPlayers: {},
    startTimes: {},
  };

  componentWillMount() {
    PLAYER_IDS.forEach(id => this.getRecentMatchesForPlayer(id));
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
    const heroes = HERO_DATA;
    // axios.get(url('heroes')).then(({ data: heroes }) => {
    const heroMap = heroes.reduce((acc, hero) => {
      acc[hero.id] = hero;
      return acc;
    }, {});
    this.setState({
      heroes: heroMap,
    });
    // });
  }

  render() {
    const { heroes, matchesByPlayer, matchIds, matchPlayers } = this.state;
    return (
      <Table>
        <thead>
          <tr>
            <th />
            <th />
            <th />
            <th />
            <th>K</th>
            <th>D</th>
            <th>A</th>
            <th />
          </tr>
        </thead>
        {matchIds.map(matchId =>
          <tbody key={matchId} style={{ padding: '1rem 0' }}>
            {matchPlayers[matchId].map((playerId, i) => {
              const match = matchesByPlayer[playerId][matchId];
              const show = i === 0;
              return (
                <tr
                  key={playerId}
                  style={{
                    borderTop: show ? '1px solid #ccc' : '',
                  }}
                >
                  <HeroImg {...match} heroes={heroes} />
                  <MatchResult {...match} show={show} />
                  <PlayerName playerId={playerId} />
                  <MatchDate {...match} show={show} />
                  <K {...match} />
                  <D {...match} />
                  <A {...match} />
                  <Links {...match} />
                </tr>
              );
            })}
          </tbody>
        )}
      </Table>
    );
  }
}

const Table = styled.table`
  border-collapse: collapse;
  font-family: monospace;
  & td {
    padding: 2px 4px;
  }
`;

const isRadiant = ({ player_slot }) => player_slot < 20;
const isWin = ({ player_slot, radiant_win }) =>
  (isRadiant({ player_slot }) && radiant_win) ||
  (!isRadiant({ player_slot }) && !radiant_win);

const MatchResult = match => {
  const won = isWin(match);
  const text = won ? 'WON :D' : 'lost';
  return match.show
    ? <Result won={won}>
        {text}
      </Result>
    : <Result />;
};
const Result = styled.td`
  color: ${props => (props.won ? 'green' : 'red')};
  padding-left: 1rem !important;
  padding-right: 1rem !important;
`;

const PlayerName = ({ playerId }) =>
  <td>
    {PLAYER_NAMES[playerId]}
  </td>;
const K = ({ kills }) =>
  <N>
    {kills}
  </N>;
const D = ({ deaths }) =>
  <N>
    {deaths}
  </N>;
const A = ({ assists }) =>
  <N>
    {assists}
  </N>;
const N = styled.td`text-align: right;`;

const HeroImg = ({ hero_id, heroes }) => {
  if (!Object.keys(heroes).length) return <td />;
  const name = heroes[hero_id].name.replace('npc_dota_hero_', '');
  return (
    <td>
      <img
        height="30"
        src={`https://api.opendota.com/apps/dota2/images/heroes/${name}_full.png`}
      />
    </td>
  );
};

const Links = ({ match_id }) =>
  <td style={{ paddingLeft: '2rem', opacity: 0.5 }}>
    <a href={`https://dotabuff.com/matches/${match_id}`}>dotabuff</a> |{' '}
    <a href={`https://opendota.com/matches/${match_id}`}>opendota</a>
  </td>;

const MatchDate = ({ show, start_time, duration }) =>
  <Subdued style={{ textAlign: 'right' }}>
    {show
      ? new Date((start_time + duration) * 1000).toLocaleString('en-US', {
          weekday: 'short',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })
      : null}
  </Subdued>;
const Subdued = styled.td`
  color: #999;
  padding-left: 2rem !important;
  padding-right: 2rem !important;
`;

const addMatches = (playerId, matches) => state => {
  const matchIds = new Set(state.matchIds.concat(matches.map(m => m.match_id)));
  const startTimes = matches.reduce((acc, match) => {
    acc[match.match_id] = match.start_time;
    return acc;
  }, state.startTimes);
  const matchPlayers = matches.reduce((acc, match) => {
    acc[match.match_id] = acc[match.match_id]
      ? acc[match.match_id].concat([playerId])
      : [playerId];
    return acc;
  }, state.matchPlayers);
  const matchMap = matches.reduce((acc, match) => {
    acc[match.match_id] = match;
    return acc;
  }, {});
  return {
    matchesByPlayer: {
      ...state.matchesByPlayer,
      [playerId]: matchMap,
    },
    matchIds: Array.from(matchIds).sort(
      (a, b) => startTimes[b] - startTimes[a]
    ),
    matchPlayers,
    startTimes,
  };
};
