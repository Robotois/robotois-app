import React from 'react';

const ToiDetail = ({ toi, selectTopic }) => (
  <li className={`menu-item ${toi.selected ? 'bg-secondary' : ''}`}>
    <div className="tile tile-centered">
      <div className="tile-icon">
        <div className="example-tile-icon">
          <i className="icon icon-file centered" />
        </div>
      </div>
      <div className="tile-content">
        <div className="tile-title h6">{`${toi.title} ${toi.instance}`}</div>
        <div className="tile-subtitle text-gray">{toi.topic}</div>
      </div>
      <div className="tile-action">
        <button className="btn btn-link" onClick={selectTopic}>
          <i className="icon icon-search" />
        </button>
      </div>
    </div>
  </li>
);

const TopicCategory = ({ category, selectTopic }) => (
  <div>
    <ul className="menu">
      <li className="menu-item h5">
        {category.title}
      </li>
      <li className="divider" />
      {
        category.tois.map(toi => (<ToiDetail
          key={toi.topic}
          toi={toi}
          selectTopic={selectTopic(toi.topic)}
        />))
      }
    </ul>
    <br />
  </div>
);

const TopicCategories = ({ categories, selectTopic }) => (
  <div>
    {categories.length !== 0 ?
      categories.map(category => (<TopicCategory
        key={category.title}
        category={category}
        selectTopic={selectTopic}
      />)) :
      <span>No hay Tois que mostrar</span>}
  </div>
);

class AvailableTopics extends React.Component {
  componentWillMount() {
    this.props.fetchTopics();
  }

  render() {
    const { categories, selectTopic, isFetching } = this.props;
    return (
      <div
        className="panel mx-2"
        style={{
          backgroundColor: 'white',
          marginTop: '3.6rem',
          minHeight: 150,
        }}
      >
        <div className="panel-header">
          <div className="panel-title h4">Tois Activos</div>
        </div>
        <div className="panel-body">
          {
            isFetching ?
              <div className="loading loading-lg" /> :
              <TopicCategories
                categories={categories}
                isFetching={isFetching}
                selectTopic={selectTopic}
              />
          }
        </div>
        <br />
      </div>
    );
  }
}

export default AvailableTopics;
