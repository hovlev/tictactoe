// mappings used by the checkLine logic
const directions = {
  tl: { coords: { row: -1, col: -1 }, opposite: 'br' },
  t: { coords: { row: -1, col: 0 }, opposite: 'b' },
  tr: { coords: { row: -1, col: 1 }, opposite: 'bl' },
  l: { coords: { row: 0, col: -1 }, opposite: 'r' },
  r: { coords: { row: 0, col: 1 }, opposite: 'l' },
  bl: { coords: { row: 1, col: -1 }, opposite: 'tr' },
  b: { coords: { row: 1, col: 0 }, opposite: 't' },
  br: { coords: { row: 1, col: 1 }, opposite: 'tl' }
};

// quick shorthand, always needs to check in both directions so the opposite attribute above is utilised
const toCheck = [ 'tl', 't', 'tr', 'l' ];

// logic to check that a line of a certain length has been reached, so whether a player has won, checks tiles surrounding the selected tile
// using 'checkLine'
const checkWinner = (row, col, state) => {
  for (const position of toCheck) {
    const direction = directions[position]; // check left, for example
    const oppositeDirection = directions[direction.opposite]; // then you will also need to check right to see if a line is complete
    let lineItems = [ { row: row, col: col } ];
    lineItems.push(checkLine({ row: row + direction.coords.row, col: col + direction.coords.col }, direction, state));
    lineItems.push(checkLine({ row: row + oppositeDirection.coords.row, col: col + oppositeDirection.coords.col }, oppositeDirection, state));
    lineItems = Array.prototype.concat(...lineItems);
    if (lineItems.length >= state.toWin) {
      return { player: state.currentPlayer, line: lineItems };
    }
  }
  return false;
};

// checks in a certain direction for whether a tile owned by a specific player exists, returns an array of these tiles
const checkLine = (coords, modifier, state) => {
  const lineItems = [];
  const firstCheck = checkTile(coords.row, coords.col, state);
  if (firstCheck) {
    let check = true;
    while (check) {
      lineItems.push({ row: coords.row, col: coords.col });
      coords.row += modifier.coords.row;
      coords.col += modifier.coords.col;
      check = checkTile(coords.row, coords.col, state);
    }   
  }
  return lineItems;
};

// very simply checks whether the tile belongs to a player
const checkTile = (row, col, state) => {
  if (row >= 0 && col >= 0 && row < state.rows && col < state.columns) {
    const checkTile = state.board[row][col];
    if (checkTile && checkTile === state.sides[state.currentPlayer]) {
      return true;
    }      
  }
  return false;
};

// counts the current free tiles, used to calculate a stalemate
const countFreeTiles = (state) => 
  [].concat(...state.board).filter(value => !value).length;

// this is the artificial intelligence... the first available tile is fetched, and that is automatically plumped for.
const getFirstTile = (state) => {
  const firstFalse = [].concat(...state.board).findIndex(value => !value);
  const row = Math.floor(firstFalse / state.columns);
  return { row: row, column: firstFalse - (row * state.columns) };
};

export default {
  checkWinner,
  checkLine,
  checkTile,
  countFreeTiles,
  getFirstTile
};
