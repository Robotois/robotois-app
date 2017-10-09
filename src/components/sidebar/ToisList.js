import React from 'react';
import ToiItem from './ToiItem';
import SearchForm from './search-form';

const ToisList = ({ visibleTois, addUsedToi }) => (
  <div className="tois-container">
    <div className="tois-search">
      <SearchForm />
    </div>
    <div className="tois-list">
      {
        visibleTois.map(
          toi => <ToiItem key={toi.listIndex} toi={toi} addUsedToi={addUsedToi} />,
        )
      }
    </div>
  </div>
);

export default ToisList;
