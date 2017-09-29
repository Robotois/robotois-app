import React from 'react';
import ToiItem from './ToiItem';
import SearchForm from './search-form';

export default class ToisList extends React.Component {
  constructor(props) {
    super(props);
    // this.queryToys = this.queryToys.bind(this);
  }

  rederCircuits() {
    return this.props.visibleTois.map(toi => <ToiItem key={toi.listIndex} toi={toi} />);
  }

  render() {
    return (
      <div className="column col-3 text-center bg-secondary sidebar">
        <div className="tois-search">
          <SearchForm />
        </div>
        <div className="tois-list">
          {
            this.props.visibleTois.map(toi => <ToiItem key={toi.listIndex} toi={toi} />)
          }
        </div>
      </div>
    );
  }
}
ToisList.propTypes = {
  visibleTois: React.PropTypes.array,
  // count: React.PropTypes.number.isRequired,
  // totalCount: React.PropTypes.number.isRequired,
  query: React.PropTypes.string,
};
ToisList.defaultProps = {
  query: '',
  visibleTois: []
};
