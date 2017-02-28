import actions from '../../actions';

const Input = ({ dispatch, state, type, label }) =>
  <label>{label} 
    <input type="number" maxlength="1" min="2" step="1" max="9" name={type} placeholder={state} onChange={e => { dispatch({ type: actions.CHANGE_RULES, payload: {value: e.target.value, type: type }}); }} />
  </label>;

export default Input;

