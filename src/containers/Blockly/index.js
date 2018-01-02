import { connect } from 'react-redux';
import BlocklyEditor from '../../components/Blockly';

const mapStateToProps = ({
  toolbar: { workspace, currentApp: { key } },
  usedTois,
}) => ({
  active: workspace === 'Bloques' && key === 'main',
  usedTois,
});


const BlocklyEditorContainer = connect(
  mapStateToProps,
  null,
)(BlocklyEditor);

export default BlocklyEditorContainer;
