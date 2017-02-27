import { lensPath, set, view, clone, prop, pipe, nth, update, assoc, length, path } from 'ramda';
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

  newState = assoc('winner', helpers.checkWinner(payload.row, payload.column, newState), newState);
  newState = assoc('won', prop('winner', newState) ? true : false, newState);
  newState = assoc('currentPlayer', (prop('currentPlayer', newState) + 1) % length(prop('sides', newState)), newState);
  return newState;
};

const resetBoard = (payload, state) => {
  if (payload.won) {
    let newState = assoc('board', init.board, state);
    newState = assoc('paused', false, newState);
    newState = assoc('winner', false, newState);
    return newState;
  }
  return state;
};

const wonBoard = state => {
  let newState = assoc('paused', true, state);
  newState = assoc('won', false, newState);
  return newState;
}

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
