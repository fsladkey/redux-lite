export default function bindActionCreators(actionCreators, dispatch) {
  const boundActionCreators = {};

  for (let key in actionCreators) {
    const actionCreator = actionCreators[key];
    boundActionCreators[key] = (...args) => dispatch(actionCreator(...args));
  }

  return boundActionCreators;
}
