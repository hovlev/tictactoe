import actions from '../../actions';

const Tile = ({ dispatch, row, column, side, i }) =>
  <td className={side ? 'side_' + side : ''} 
    onClick={() => { dispatch({ type: actions.SELECT_TILE, payload: {row, column} }); }}>
      {side}
    </td>;

export default Tile;