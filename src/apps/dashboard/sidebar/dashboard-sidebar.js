import React from 'react';

const ToiDetail = ({ selected, title, instance, selectToi }) => (
  <li className={`menu-item ${selected ? 'bg-secondary' : ''}`}>
    <div className="tile tile-centered">
      <div className="tile-icon">
        <div className="example-tile-icon">
          <i className="icon icon-file centered" />
        </div>
      </div>
      <div className="tile-content">
        <div className="tile-title h6">{`${title} ${instance}`}</div>
      </div>
      <div className="tile-action">
        <button className="btn btn-link" onClick={selectToi}>
          <i className="icon icon-search" />
        </button>
      </div>
    </div>
  </li>
);

const TopicCategory = ({ category, selectToi }) => (
  <div>
    <ul className="menu">
      <li className="menu-item h5">{category.title}</li>
      <li className="divider" />
      {category.tois.map(toi => (
        <ToiDetail
          key={`${toi.title}-${toi.instance}`}
          title={toi.title}
          instance={toi.instance}
          selected={toi.selected}
          selectToi={selectToi(toi.id)}
        />
      ))}
    </ul>
    <br />
  </div>
);

const TopicCategories = ({ categories, selectToi }) => (
  <div>
    {categories.length !== 0 ? (
      categories.map(category => (
        <TopicCategory
          key={category.title}
          category={category}
          selectToi={selectToi}
        />
      ))
    ) : (
      <span>No hay información que mostrar</span>
    )}
  </div>
);

class AvailableTopics extends React.Component {
  componentWillMount() {
    this.props.fetchTopics();
  }

  render() {
    const { categories, selectToi, isFetching } = this.props;
    // console.log('categories:', categories);
    return (
      <div className="panel mx-2 dashboard-sidebar">
        <div className="panel-header">
          <div className="panel-title h4">Tois Activos</div>
        </div>
        <div className="panel-body">
          {isFetching ? (
            <div className="loading loading-lg" />
          ) : (
            <TopicCategories
              categories={categories}
              isFetching={isFetching}
              selectToi={selectToi}
            />
          )}
        </div>
        <br />
      </div>
    );
  }
}

export default AvailableTopics;
