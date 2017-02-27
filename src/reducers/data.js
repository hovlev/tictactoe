import { lensPath, set, view, clone, prop, pipe } from 'ramda';
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

export default (state = init, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case actions.SELECT_TILE:
      newState.board = [ ...newState.board ];
      let tile = newState.board[action.payload.row][action.payload.column];
      if (!tile) {
        newState.board[action.payload.row][action.payload.column] = newState.sides[newState.currentPlayer];
        newState.winner = helpers.checkWinner(action.payload.row, action.payload.column, newState);
        newState.won = newState.winner ? true : false;
        newState.currentPlayer = (newState.currentPlayer + 1) % newState.sides.length;
      }
      return newState;
    case actions.WON_BOARD:
      newState.paused = true;
      newState.won = false;
      return newState;
    case actions.RESET_BOARD:
      if (action.payload.won) {
        newState.board = [
          [false, false, false, false],
          [false, false, false, false],
          [false, false, false, false],
          [false, false, false, false]
        ];
        newState.paused = false;
        newState.winner = false;
      }
      return newState;
    default:
      return state;
  }
};
