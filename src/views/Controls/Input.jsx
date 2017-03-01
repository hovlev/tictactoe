import actions from '../../actions';

const Input = ({ dispatch, value, type, label }) =>
  <label>{label} 
    <input type="number" maxLength="1" min="2" step="1" max="9" name={type} placeholder={value} onChange={e => { 
      dispatch({ type: actions.CHANGE_RULES, payload: { value: e.target.value, type: type } }); 
    }} />
  </label>;

export default Input;

