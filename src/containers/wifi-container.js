import React from 'react';
import axios from 'axios';
import App from '../components/kit-config/index';
// import HOSTNAME from '../hostname';

/**
 * [state description]
 * @type {Object}
 */
class AppContainer extends React.Component {
  /**
   * [constructor description]
   * @return {[type]} [description]
   */
  constructor() {
    super();
    this.state = {
      networks: [],
      loading: true,
    };
    this.doneLoading = this.doneLoading.bind(this);
  }
  /**
   * [componentDidMount description]
   * @return {[type]} [description]
   */
  componentDidMount() {
    const { match } = this.props;
    axios({
      method: 'get',
      // baseURL: '',
      url: `http://${match.params.ip}:8082/wifi/all`,
    })
      .then((response) => {
        const { data: { networks } } = response;
        this.setState({ networks }, this.doneLoading);
        // console.log(networks);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  /**
  * [doneLoading description]
  * @return {[type]} [description]
  */
  doneLoading() {
    this.setState({ loading: false });
  }
  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    return (
      <App {...this.state} {...this.props} />
    );
  }
}

export default AppContainer;
