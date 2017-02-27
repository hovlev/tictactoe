import { prop, pipe, nth, update, assoc, length, path, merge } from 'ramda';
import helpers  from '../helpers';
import actions from '../actions';

const init = {
  rows: 4,
  columns: 4,
  toWin: 3,
  winner: false,
  currentPlayer: 0,
  sides: ['x', 'o'],
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

const resetBoard = (payload, state) => 
  payload.won ? merge(state, {
    board: init.board,
    paused: false,
    winner: false
  }) : state;

const wonBoard = state =>
  merge(state, {
    paused: true,
    won: false
  });

export default (state = init, { type, payload }) => {
  let newState;
  switch (type) {
    case actions.SELECT_TILE:
      return selectTile(payload, state);

    case actions.WON_BOARD:
      return wonBoard(state);

    case actions.RESET_BOARD:
      return resetBoard(payload, state);

    default:
      return state;
  }
};
