export default function({ getState, dispatch}) {
  return (next) => (action) => {
    return (typeof action === "function" ?
      action(dispatch) :
      next(action));
  }
}
