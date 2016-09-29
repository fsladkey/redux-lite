export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    const store = createStore(reducer, preloadedState, enhancer);
    const middlewareChain = [];
    const { getState, dispatch } = store;

    chain = middlewares.map(middleware => middleware({ getState, dispatch }));
    chain.push(dispatch);


    while (middlwares.length > 0) {
      const last = middlewares.pop();
      const next = middlewares[middlewares.length - 1]
      middlwares[middlwares.length - 1] = next(last);
    }

    dispatch = middlwares[0];

    return {...store, dispatch }
  }
}
