import { prop, pipe, nth, update, assoc, length, path, merge, prepend, times, always } from 'ramda';
import helpers  from '../helpers';
import actions from '../actions';

const init = {
  rows: 4,
  columns: 4,
  toWin: 3,
  maxSetting: 9,
  winner: false,
  currentPlayer: 0,
  sides: ['x', 'o'],
  previousBoards: [],
  board: []
    // [
    //   [false, false, false, false],
    //   [false, false, false, false],
    //   [false, false, false, false],
    //   [false, false, false, false]
    // ]
};

const buildBoard = state =>
  times(
    always(times(always(false), state.columns)),
    state.rows
  );

const selectTile = (payload, state) => {
  // just getting the current tile state
  let tile = pipe(
    prop('board'),
    nth(payload.row),
    nth(payload.column)
  )(state);

   // if tile returns false there's an empty space here, so a tile can be turned to a nought or a cross
  if (tile) return state;

  const currentPlayer = path(
    ['sides', prop('currentPlayer', state)], 
    state
  );

  let newState = assoc(
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
  let winner = helpers.checkWinner(payload.row, payload.column, newState);
  return merge(newState, {
    winner: winner,
    won: winner ? true : false,
    currentPlayer: (prop('currentPlayer', newState) + 1) % length(prop('sides', newState))
  });
};

const resetBoard = state => 
  merge(state, {
    board: buildBoard(state),
    winner: false
  });

const wonBoard = state =>
  merge(state, {
    won: false,
    board: buildBoard(state),
    previousBoards: prepend(prop('board', state), prop('previousBoards', state))
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
      return selectTile(payload, state);

    case actions.WON_BOARD:
      return wonBoard(state);

    case actions.CHANGE_RULES:
      return changeRules(payload, state);

    default:
      return state;
  }
};
