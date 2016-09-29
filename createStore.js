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

  dispatch({ type: INIT });

  return {

    dispatch(action) {
      currentState = reducer(currentState, action);
      return action;
    },

    subscribe(listener) {
      listeners.push(listener)

      return function unsubscribe() {
        listeners.splice(listeners.indexOf(listener), 1);
      }
    },

    getState() {
      return currentState
    }

  }
}
