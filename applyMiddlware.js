export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState);
    let { getState, dispatch } = store;

    middlewares = middlewares.map(middleware => {
      return middleware({
        getState,
        dispatch: (action) => dispatch(action)
      });
    });

    middlewares.push(dispatch);

    while (middlewares.length > 1) {
      const last = middlewares.pop();
      const next = middlewares[middlewares.length - 1]
      middlewares[middlewares.length - 1] = next(last);
    }

    dispatch = middlewares[0];

    return {...store, dispatch }
  }
}
