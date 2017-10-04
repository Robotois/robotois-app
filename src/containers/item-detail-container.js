import { connect } from 'react-redux';
import ItemDetail from '../components/item-detail/item-detail';
import { getCurrentItem } from '../reducers/toi-selection';
import { getInputModules, multipleInstances } from '../reducers/used-tois';
import { isEventListener } from '../components/shared/items-by-function';

const mapStateToProps = ({ currentSelection, usedTois }) => {
  const currentItem = getCurrentItem(currentSelection, usedTois);
  const hasMulti = currentItem && multipleInstances(usedTois, currentItem.type);
  const currentInputModules = currentItem && isEventListener(currentItem.type) ?
    getInputModules(usedTois) :
    undefined;
  return ({
    currentItem,
    multipleInstances: hasMulti,
    currentInputModules,
  });
};

const ItemDetailContainer = connect(
  mapStateToProps,
  null,
)(ItemDetail);

export default ItemDetailContainer;
