import { connect } from 'react-redux';
import Draw2d from '../components/draw2d-lib';
import { addCurrentSelection } from '../actions';

const mapStateToProps = state => ({
  selection: state.currentSelection,
});

const mapDispatchToProps = dispatch => ({
  addCurrentSelection: currentSelection => dispatch(addCurrentSelection(currentSelection)),
});

const Draw2dContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Draw2d);

export default Draw2dContainer;
