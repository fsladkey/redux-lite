function connect(mapStateToProps, mapDispatchToProps) {
  return function (Component) {
  	class Component extends React.Component {
    	constructor(props, context) {
      	super(props, context);
        this.state = this.getStateFromStore()
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
        this.context.store.register(this._onChange.bind(this));
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

    Component.contextTypes = {
      state: React.PropTypes.object.isRequired
    }

    return Component;
  }
}
