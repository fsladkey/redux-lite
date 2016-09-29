const INIT = "_INIT";

export default function createStore(reducer, preloadedState, enhancer) {
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }

  if (enhancer) {
    return enhancer(createStore)(reducer, preloadedState)
  }

  let state = preloadedState;
  const listeners = [];

  const store = {

    dispatch(action) {
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
      return action;
    },

    subscribe(listener) {
      listeners.push(listener)

      return function unsubscribe() {
        listeners.splice(listeners.indexOf(listener), 1);
      }
    },

    getState() {
      return state;
    }

  }

  store.dispatch({ type: INIT });

  return store;
}
