import actions from '../actions';

const init = {
  rows: 3,
  columns: 3,
  toWin: 3,
  currentSide: 0,
  sides: ['x', 'o'],
  board: //todo generate this on init based on the above
    [
      [false, false, false],
      [false, false, false],
      [false, false, false]
    ]
};

const directions = {
  tl: {array: [-1, -1], opposite: 'br'},
  t: {array: [-1, 0], opposite: 'b'},
  tr: {array: [-1, 1], opposite: 'bl'},
  l: {array: [0, -1], opposite: 'r'},
  r: {array: [0, 1], opposite: 'l'},
  bl: {array: [1, -1], opposite: 'tr'},
  b: {array: [1, 0], opposite: 't'},
  br: {array: [1, 1], opposite: 'tl'}
};

const toCheck = ['tl', 't', 'tr', 'l'];

const checkLine = (row, col, side) => {
  toCheck.map((position) => {
    let direction = directions[position];
    console.log(position, row + direction.array[0], col + direction.array[1], direction.opposite);
  });
  return false;
};

const checkSurround = (row, col, side) => {
  return false;
};

export default (state = init, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case actions.SELECT_TILE:
      newState.board = [ ...newState.board ];
      let tile = newState.board[action.payload.row][action.payload.column];
      if (!tile) {
        newState.board[action.payload.row][action.payload.column] = newState.sides[newState.currentSide];
        checkLine(action.payload.row, action.payload.column, newState.currentSide);
        newState.currentSide = (newState.currentSide + 1) % newState.sides.length;
      }
      return newState;
    default:
      return state;
  }
};
