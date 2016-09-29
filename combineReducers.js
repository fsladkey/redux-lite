export default function combineReducers(reducers) {

  return function (state = {}, action) {
    const newState = {};

    for (let name in reducers) {
      const reducer = reducers[name];
      newState[name] = reducer(state[name], action);
    }

    return newState;
  }

}
