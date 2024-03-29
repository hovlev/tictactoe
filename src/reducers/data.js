import {
  add, adjust, always, assoc, length, merge, nth, 
  path, pipe, prepend, prop, times, update
} from 'ramda';
import helpers  from '../helpers';
import actions from '../actions';

const init = {
  rows: 4,
  columns: 4,
  toWin: 3, // if this is set too high it's potentially impossible to win (can't fit enough tiles into a grid)
  maxSetting: 9, // very basic validation, can only have up to 9 rows, columns etc
  winner: false,
  currentPlayer: 0,
  computerPlayer: false, // computer will select a tile if this is the current player (should be 0 or 1)
  paused: false, // used for when the computer is 'thinking'
  sides: [ 'x', 'o' ], // no reason why you can't have more than 2 players, interface won't cater for this though
  score: [], // built on init action, maybe use get function or alternative
  previousBoards: [], // as above
  board: []
    // [
    //   [false, false, false, false],
    //   [false, false, false, false],
    //   [false, false, false, false],
    //   [false, false, false, false]
    // ]
};

const artificialIntelligence = state => {
  return selectTile(helpers.getFirstTile(state), state);
};

const buildBoard = state =>
  times(
    always(times(always(false), state.columns)),
    state.rows
  );

const buildScore = state =>
  times(always(0), state.sides.length);

const selectTile = (payload, state) => {
  // just getting the current tile state
  const tile = pipe(
    prop('board'),
    nth(payload.row),
    nth(payload.column)
  )(state);
   // if tile returns false there's an empty space here, so a tile can be turned to a nought or a cross
  if (tile) return state;

  const currentPlayer = path(
    [ 'sides', prop('currentPlayer', state) ], 
    state
  );

  const newState = assoc(
    // name of property to update
    'board',
    // value to set to above given property
    update(
      payload.row, // update the specific row index with the result of pipe
      pipe(
        nth(payload.row), // nth row of the board
        update(payload.column, currentPlayer) // update specific column index in the row with the current player ID
      )(prop('board', state)),
      prop('board', state)
    ),
    // object in which to set the above property and value
    state
  );
  const winner = helpers.checkWinner(payload.row, payload.column, newState);
  return helpers.countFreeTiles(newState) ? // checks if there are still free tiles available (if there aren't it is a stalemate and the board is reset)
    merge(newState, {
      winner: winner,
      won: winner ? true : false,
      currentPlayer: (prop('currentPlayer', newState) + 1) % length(prop('sides', newState))
    }) 
    : resetBoard(newState);
};

const resetBoard = state => 
  merge(state, {
    board: buildBoard(state),
    score: buildScore(state)
  });

const wonBoard = state =>
  merge(state, {
    board: buildBoard(state),
    previousBoards: prepend(prop('board', state), prop('previousBoards', state)),
    score: adjust(add(1), path([ 'winner', 'player' ], state), prop('score', state)),
    won: false
  });

const changeRules = (payload, state) => {
  let newState = assoc(payload.type, 
    Math.max(1, Math.min(parseInt(payload.value), prop('maxSetting', state))), 
    state);
  newState = resetBoard(newState);
  return newState;
};

export default (state = init, { type, payload }) => {
  switch (type) {
    case actions.INIT_GAME:
      return resetBoard(state);

    case actions.SELECT_TILE:
      return prop('currentPlayer', state) === prop('computerPlayer', state) ? state : selectTile(payload, state);

    case actions.ARTIFICIAL_SELECT_TILE:
      return artificialIntelligence(state);

    case actions.WON_BOARD:
      return wonBoard(state);

    case actions.PAUSE_BOARD:
      return assoc('paused', payload, state);

    case actions.TOGGLE_AI:
      return assoc('computerPlayer', prop('computerPlayer', state) === false ? 0 : false, state);

    case actions.CHANGE_RULES:
      return changeRules(payload, state);

    default:
      return state;
  }
};
