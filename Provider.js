import { Component, PropTypes } from 'react';

export default class Provider extends Component {

  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }

  getChildContext() {
    return { store: this.store };
  }

  render() {
    return <div>{ this.props.children }</div>
  }
}

Provider.propTypes = {
  store: PropTypes.object.isRequired
}
