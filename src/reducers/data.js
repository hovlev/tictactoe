import actions from '../actions';

const init = {
  rows: 4,
  columns: 4,
  toWin: 3,
  winner: false,
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
  tl: {coords: {row: -1, col: -1}, opposite: 'br'},
  t: {coords: {row: -1, col: 0}, opposite: 'b'},
  tr: {coords: {row: -1, col: 1}, opposite: 'bl'},
  l: {coords: {row:0, col: -1}, opposite: 'r'},
  r: {coords: {row:0, col: 1}, opposite: 'l'},
  bl: {coords: {row:1, col: -1}, opposite: 'tr'},
  b: {coords: {row:1, col: 0}, opposite: 't'},
  br: {coords: {row:1, col: 1}, opposite: 'tl'}
};

const toCheck = ['tl', 't', 'tr', 'l'];

const checkWinner = (row, col, state) => {
  for (let position of toCheck) {
    let direction = directions[position]; // check left, for example
    let oppositeDirection = directions[direction.opposite]; // then you will also need to check right to see if a line is complete
    let lineItems = [{row: row, col: col}];
    lineItems.push(checkLine({row: row + direction.coords.row, col: col + direction.coords.col}, direction, state));
    lineItems.push(checkLine({row: row + oppositeDirection.coords.row, col: col + oppositeDirection.coords.col}, oppositeDirection, state));
    lineItems = Array.prototype.concat(...lineItems);
    if (lineItems.length >= state.toWin) {
      return { player: state.currentSide, line: lineItems };
    }
  }
  return false;
};

const checkLine = (coords, modifier, state) => {
  let lineItems = [];
  let firstCheck = checkTile(coords.row, coords.col, state);
  if (firstCheck) {
    let check = true;
    while (check) {
      lineItems.push({row: coords.row, col: coords.col});
      coords.row += modifier.coords.row;
      coords.col += modifier.coords.col;
      check = checkTile(coords.row, coords.col, state);
    }   
  }
  return lineItems;
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
        newState.winner = checkWinner(action.payload.row, action.payload.column, newState);
        newState.won = newState.winner ? true : false;
        newState.currentSide = (newState.currentSide + 1) % newState.sides.length;
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
