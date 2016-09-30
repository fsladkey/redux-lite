import React from 'react';
import bindActionCreators from './bindActionCreators';

const noop = () => ({});

export default function connect(mapStateToProps, mapDispatchToProps) {

  mapStateToProps = mapStateToProps || noop;
  mapDispatchToProps = mapDispatchToProps || noop;

  return function (Component) {
  	return class ConnectedComponent extends React.Component {

    	constructor(props, context) {
      	super(props, context);

        if (typeof mapDispatchToProps === 'object') {
          mapDispatchToProps = bindActionCreators(
            mapDispatchToProps,
            this.context.store.dispatch
          );
        }

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
  }
}
