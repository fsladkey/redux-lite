import React from 'react';

export default function connect(mapStateToProps, mapDispatchToProps) {
  mapStateToProps = mapStateToProps || function () { return {} };
  mapDispatchToProps = mapDispatchToProps || function () { return {} };
  return function (Component) {
  	class ConnectedComponent extends React.Component {
    	constructor(props, context) {
      	super(props, context);
        this.state = this.getStateFromStore()
      }

      static contextTypes = {
       store: React.PropTypes.object.isRequired
      }

      getStateFromStore() {
        return Object.assign(
          {},
          mapStateToProps(this.context.store.getState(), this.props),
          mapDispatchToProps(this.context.store.dispatch, this.props),
          this.props
        )
      }

      componentDidMount() {
        this.context.store.subscribe(this._onChange.bind(this));
      }

      _onChange() {
        const newState = this.getStateFromStore();
        if (this.state !== newState) {
          this.setState(newState);
        }
      }

      render() {
        return <Component {...this.state} />
      }
    }

    return ConnectedComponent;
  }
}
