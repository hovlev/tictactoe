import actions from '../../actions';

const Tile = ({ dispatch, row, column, side, i, forDisplayPurposesOnly}) =>
  <td className={side ? 'side_' + side : ''}
    onClick={
      !forDisplayPurposesOnly ? 
        () => { dispatch({ type: actions.SELECT_TILE, payload: {row, column} }); } :
        false 
    }>
      {side}
    </td>;

export default Tile;