import actions from '../actions';

const init = {
  rows: 4,
  columns: 4,
  toWin: 3,
  currentSide: 0,
  sides: ['x', 'o'],
  board: //todo generate this on init based on the above
    [
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false]
    ]
};

const directions = {
  tl: {coords: [-1, -1], opposite: 'br'},
  t: {coords: [-1, 0], opposite: 'b'},
  tr: {coords: [-1, 1], opposite: 'bl'},
  l: {coords: [0, -1], opposite: 'r'},
  r: {coords: [0, 1], opposite: 'l'},
  bl: {coords: [1, -1], opposite: 'tr'},
  b: {coords: [1, 0], opposite: 't'},
  br: {coords: [1, 1], opposite: 'tl'}
};

const toCheck = ['tl', 't', 'tr', 'l'];

const checkLine = (row, col, state) => {
  toCheck.map((position) => {
    let direction = directions[position];
    let oppositeDirection = directions[direction.opposite];
    let toCheck = checkTile(row + direction.coords[0], col + direction.coords[1], state);
    let toCheckOpposite = checkTile(row + oppositeDirection.coords[0], col + oppositeDirection.coords[1], state);
    let lineCount = 0;
    let check = true;
    let checkOpposite = true;
    if (toCheck) {
      lineCount++;
      console.log(position + ' ' + toCheck);

    }
    if (toCheckOpposite) {
      lineCount++;
      console.log(direction.opposite + ' ' + toCheckOpposite);
    }
  });
  return false;
};

const checkTile = (row, col, state) => {
  if (row >= 0 && col >= 0 && row < state.rows && col < state.columns) {
    let checkTile = state.board[row][col];
    if (checkTile && checkTile === state.sides[state.currentSide]) {
      return true;
    }      
  }
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
        checkLine(action.payload.row, action.payload.column, newState);
        newState.currentSide = (newState.currentSide + 1) % newState.sides.length;
      }
      return newState;
    default:
      return state;
  }
};
