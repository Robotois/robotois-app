import { connect } from 'react-redux';
import ItemDetail from '../components/item-detail/item-detail';
import { getCurrentItem } from '../reducers/toi-selection';
import { getInputModules, multipleInstances } from '../reducers/used-tois';

const mapStateToProps = ({ currentSelection, usedTois }) => {
  const currentItem = getCurrentItem(currentSelection, usedTois);
  const hasMulti = currentItem && multipleInstances(usedTois, currentItem.type);
  return ({
    currentItem,
    multipleInstances: hasMulti,
    currentInputModules: getInputModules(usedTois),
  });
};

const ItemDetailContainer = connect(
  mapStateToProps,
  null,
)(ItemDetail);

export default ItemDetailContainer;
