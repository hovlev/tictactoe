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
      return { player: state.currentPlayer, line: lineItems };
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
    if (checkTile && checkTile === state.sides[state.currentPlayer]) {
      return true;
    }      
  }
  return false;
};

const countFreeTiles = (state) => 
  [].concat(...state.board).filter(value => !value).length;

export default {checkWinner: checkWinner, checkLine: checkLine, checkTile: checkTile, countFreeTiles: countFreeTiles};
