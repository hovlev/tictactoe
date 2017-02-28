import { prop, pipe, nth, update, assoc, length, path, merge, prepend } from 'ramda';
import helpers  from '../helpers';
import actions from '../actions';

const init = {
  rows: 4,
  columns: 4,
  toWin: 3,
  winner: false,
  currentPlayer: 0,
  sides: ['x', 'o'],
  previousBoards: [],
  board: //todo generate this on init based on the above
    [
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false]
    ]
};

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
    board: init.board,
    winner: false
  });

const wonBoard = state =>
  merge(state, {
    board: init.board,
    won: false,
    previousBoards: prepend(prop('board', state), prop('previousBoards', state))
  });

const changeRules = (payload, state) => console.log(payload.type, payload.value) ||
  assoc(payload.type, parseInt(payload.value), state);

export default (state = init, { type, payload }) => {
  switch (type) {
    case actions.SELECT_TILE:
      return selectTile(payload, state);

    case actions.WON_BOARD:
      return wonBoard(state);

    case actions.RESET_BOARD:
      return resetBoard(payload, state);

    case actions.CHANGE_RULES:
      return changeRules(payload, state);

    default:
      return state;
  }
};
