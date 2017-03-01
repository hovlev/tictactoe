import { createStore } from 'redux';
import actions from '../actions';
import reducers from '../reducers';
// import sagas from '../sagas';

const applyDevTools = () => {
  const win = window;

  return win.__REDUX_DEVTOOLS_EXTENSION__
    ? win.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined;
};

const store = createStore(reducers, applyDevTools());
store.subscribe(() => {
  const data = store.getState().data;
  if (data.won) {
    store.dispatch({ type: actions.WON_BOARD });
  } else if (data.computerPlayer === data.currentPlayer && !data.paused) {
    store.dispatch({ type: actions.PAUSE_BOARD, payload: true });
    // TODO, middleware? Sagas? Nasty side effect
    setTimeout(() => { 
      store.dispatch({ type: actions.ARTIFICIAL_SELECT_TILE });
      store.dispatch({ type: actions.PAUSE_BOARD, payload: false });
    }, 500);
  }
});
store.dispatch({ type: actions.INIT_GAME });

export default store;
