import React from 'react';

const withResize = Component =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        height: 0,
        width: 0,
      };
      this.handleRedimension = this.handleRedimension.bind(this);
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleRedimension);
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleRedimension);
    }

    handleRedimension() {
      const { clientHeight, clientWidth } = this.myElement;
      this.setState({
        height: clientHeight,
        width: clientWidth,
      });
    }

    render() {
      return (
        <Component
          {...this.state}
          {...this.props}
          ref={(el) => { this.myElement = el; }}
        />
      );
    }
  };

export default withResize;
