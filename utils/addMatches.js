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
      [playerId]: matchMap
    },
    matchIds: Array.from(matchIds).sort(
      (a, b) => startTimes[b] - startTimes[a]
    ),
    matchPlayers,
    startTimes
  };
};

export default addMatches;
