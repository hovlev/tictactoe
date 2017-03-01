import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import actions from '../actions';
import reducers from '../reducers';
// import sagas from '../sagas';

const applyDevTools = () => {
  const win = window;

  return win.__REDUX_DEVTOOLS_EXTENSION__
    ? win.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined;
};

// const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyDevTools());
store.subscribe(() => {
  let data = store.getState().data;
  if (data.won) {
    store.dispatch({ type: actions.WON_BOARD });
  } else if (data.computerPlayer === data.currentPlayer) {
    setTimeout(() => {
      store.dispatch({ type: actions.ARTIFICIAL_SELECT_TILE });
    }, 500);
  }
  /*eslint no-console:0*/
});
store.dispatch({ type: actions.INIT_GAME });

// sagaMiddleware.run(sagas);

export default store;
