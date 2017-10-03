import { connect } from 'react-redux';
import ItemDetail from '../components/item-detail/item-detail';
import { getCurrentItem } from '../reducers/toi-selection';
import { getInputModules } from '../reducers/used-tois';

const mapStateToProps = ({ currentSelection, usedTois }) => {
  const currentItem = getCurrentItem(currentSelection, usedTois);
  // console.log('getInputModules:', getInputModules(usedTois));
  return ({
    currentItem,
    currentInputModules: getInputModules(usedTois),
  });
};

const ItemDetailContainer = connect(
  mapStateToProps,
  null,
)(ItemDetail);

export default ItemDetailContainer;
