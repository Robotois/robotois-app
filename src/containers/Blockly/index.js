import { connect } from 'react-redux';
import BlocklyEditor from '../../components/Blockly';

const mapStateToProps = ({
  toolbar: { workspace, currentApp: { key } },
}) => ({
  active: workspace === 'Bloques' && key === 'main',
});


const BlocklyEditorContainer = connect(
  mapStateToProps,
  null,
)(BlocklyEditor);

export default BlocklyEditorContainer;
