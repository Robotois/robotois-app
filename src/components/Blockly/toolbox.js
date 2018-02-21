export const toolbox = [
  '<xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">',
  /* `<category name="Sensores" colour="#5b5ba5">
      <block type="distance"></block>
      <block type="temperature"></block>
    </category>`,
  `<category name="Actuadores" colour="#6d5ba5">
      <block type="led">
        <field name="ACTION">turnOn</field>
      </block>
    </category>`, */
  `<sep></sep>
    <category name="Eventos" colour="#5ba580">
      <block type="medicion"></block>
    </category>
    <sep></sep>
    <category name="Logic" colour="#5C81A6">
      <block type="controls_if"></block>
      <block type="logic_compare">
        <field name="OP">EQ</field>
      </block>
      <block type="logic_operation">
        <field name="OP">AND</field>
      </block>
      <block type="logic_negate"></block>
      <block type="logic_boolean">
        <field name="BOOL">TRUE</field>
      </block>
      <block type="logic_null"></block>
      <block type="logic_ternary"></block>
    </category>
    <category name="Loops" colour="#5CA65C">
      <block type="controls_repeat_ext">
        <value name="TIMES">
          <shadow type="math_number">
            <field name="NUM">10</field>
          </shadow>
        </value>
      </block>
      <block type="controls_whileUntil">
        <field name="MODE">WHILE</field>
      </block>
      <block type="controls_for">
        <field name="VAR" id="SASJS^(m8k7$G:k2Ugj0" variabletype="">i</field>
        <value name="FROM">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="TO">
          <shadow type="math_number">
            <field name="NUM">10</field>
          </shadow>
        </value>
        <value name="BY">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="controls_forEach">
        <field name="VAR" id="xEmy.@m$j;)d_/0~O?(3" variabletype="">j</field>
      </block>
      <block type="controls_flow_statements">
        <field name="FLOW">BREAK</field>
      </block>
    </category>
    <category name="Math" colour="#5C68A6">
      <block type="math_round">
        <field name="OP">ROUND</field>
        <value name="NUM">
          <shadow type="math_number">
            <field name="NUM">3.1</field>
          </shadow>
        </value>
      </block>
      <block type="math_number">
        <field name="NUM">0</field>
      </block>
      <block type="math_single">
        <field name="OP">ROOT</field>
        <value name="NUM">
          <shadow type="math_number">
            <field name="NUM">9</field>
          </shadow>
        </value>
      </block>
      <block type="math_trig">
        <field name="OP">SIN</field>
        <value name="NUM">
          <shadow type="math_number">
            <field name="NUM">45</field>
          </shadow>
        </value>
      </block>
      <block type="math_constant">
        <field name="CONSTANT">PI</field>
      </block>
      <block type="math_number_property">
        <mutation divisor_input="false"></mutation>
        <field name="PROPERTY">EVEN</field>
        <value name="NUMBER_TO_CHECK">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
      </block>
      <block type="math_arithmetic">
        <field name="OP">ADD</field>
        <value name="A">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="B">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="math_on_list">
        <mutation op="SUM"></mutation>
        <field name="OP">SUM</field>
      </block>
      <block type="math_modulo">
        <value name="DIVIDEND">
          <shadow type="math_number">
            <field name="NUM">64</field>
          </shadow>
        </value>
        <value name="DIVISOR">
          <shadow type="math_number">
            <field name="NUM">10</field>
          </shadow>
        </value>
      </block>
      <block type="math_constrain">
        <value name="VALUE">
          <shadow type="math_number">
            <field name="NUM">50</field>
          </shadow>
        </value>
        <value name="LOW">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="HIGH">
          <shadow type="math_number">
            <field name="NUM">100</field>
          </shadow>
        </value>
      </block>
      <block type="math_random_int">
        <value name="FROM">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="TO">
          <shadow type="math_number">
            <field name="NUM">100</field>
          </shadow>
        </value>
      </block>
      <block type="math_random_float"></block>
    </category>
    <category name="Text" colour="#5CA68D">
      <block type="text_charAt">
        <mutation at="true"></mutation>
        <field name="WHERE">FROM_START</field>
        <value name="VALUE">
          <block type="variables_get">
            <field name="VAR" id="YtWEN];RKSMK1|Y{R.aH" variabletype="">text</field>
          </block>
        </value>
      </block>
      <block type="text">
        <field name="TEXT"></field>
      </block>
      <block type="text_append">
        <field name="VAR" id="acs^_|p{ida6rr~Q4]cl" variabletype="">item</field>
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT"></field>
          </shadow>
        </value>
      </block>
      <block type="text_length">
        <value name="VALUE">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
      <block type="text_isEmpty">
        <value name="VALUE">
          <shadow type="text">
            <field name="TEXT"></field>
          </shadow>
        </value>
      </block>
      <block type="text_indexOf">
        <field name="END">FIRST</field>
        <value name="VALUE">
          <block type="variables_get">
            <field name="VAR" id="YtWEN];RKSMK1|Y{R.aH" variabletype="">text</field>
          </block>
        </value>
        <value name="FIND">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
      <block type="text_join">
        <mutation items="2"></mutation>
      </block>
      <block type="text_getSubstring">
        <mutation at1="true" at2="true"></mutation>
        <field name="WHERE1">FROM_START</field>
        <field name="WHERE2">FROM_START</field>
        <value name="STRING">
          <block type="variables_get">
            <field name="VAR" id="YtWEN];RKSMK1|Y{R.aH" variabletype="">text</field>
          </block>
        </value>
      </block>
      <block type="text_changeCase">
        <field name="CASE">UPPERCASE</field>
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
      <block type="text_trim">
        <field name="MODE">BOTH</field>
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
      <block type="text_print">
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
      <block type="text_prompt_ext">
        <mutation type="TEXT"></mutation>
        <field name="TYPE">TEXT</field>
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
    </category>
    <category name="Lists" colour="#745CA6">
      <block type="lists_indexOf">
        <field name="END">FIRST</field>
        <value name="VALUE">
          <block type="variables_get">
            <field name="VAR" id="h_Pf-wg]P)CINge$NvC8" variabletype="">list</field>
          </block>
        </value>
      </block>
      <block type="lists_create_with">
        <mutation items="0"></mutation>
      </block>
      <block type="lists_repeat">
        <value name="NUM">
          <shadow type="math_number">
            <field name="NUM">5</field>
          </shadow>
        </value>
      </block>
      <block type="lists_length"></block>
      <block type="lists_isEmpty"></block>
      <block type="lists_create_with">
        <mutation items="3"></mutation>
      </block>
      <block type="lists_getIndex">
        <mutation statement="false" at="true"></mutation>
        <field name="MODE">GET</field>
        <field name="WHERE">FROM_START</field>
        <value name="VALUE">
          <block type="variables_get">
            <field name="VAR" id="h_Pf-wg]P)CINge$NvC8" variabletype="">list</field>
          </block>
        </value>
      </block>
      <block type="lists_setIndex">
        <mutation at="true"></mutation>
        <field name="MODE">SET</field>
        <field name="WHERE">FROM_START</field>
        <value name="LIST">
          <block type="variables_get">
            <field name="VAR" id="h_Pf-wg]P)CINge$NvC8" variabletype="">list</field>
          </block>
        </value>
      </block>
      <block type="lists_getSublist">
        <mutation at1="true" at2="true"></mutation>
        <field name="WHERE1">FROM_START</field>
        <field name="WHERE2">FROM_START</field>
        <value name="LIST">
          <block type="variables_get">
            <field name="VAR" id="h_Pf-wg]P)CINge$NvC8" variabletype="">list</field>
          </block>
        </value>
      </block>
      <block type="lists_split">
        <mutation mode="SPLIT"></mutation>
        <field name="MODE">SPLIT</field>
        <value name="DELIM">
          <shadow type="text">
            <field name="TEXT">,</field>
          </shadow>
        </value>
      </block>
      <block type="lists_sort">
        <field name="TYPE">NUMERIC</field>
        <field name="DIRECTION">1</field>
      </block>
    </category>
    <category name="Colour" colour="#A6745C">
      <block type="colour_picker">
        <field name="COLOUR">#ff0000</field>
      </block>
      <block type="colour_random"></block>
      <block type="colour_rgb">
        <value name="RED">
          <shadow type="math_number">
            <field name="NUM">100</field>
          </shadow>
        </value>
        <value name="GREEN">
          <shadow type="math_number">
            <field name="NUM">50</field>
          </shadow>
        </value>
        <value name="BLUE">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
      </block>
      <block type="colour_blend">
        <value name="COLOUR1">
          <shadow type="colour_picker">
            <field name="COLOUR">#ff0000</field>
          </shadow>
        </value>
        <value name="COLOUR2">
          <shadow type="colour_picker">
            <field name="COLOUR">#3333ff</field>
          </shadow>
        </value>
        <value name="RATIO">
          <shadow type="math_number">
            <field name="NUM">0.5</field>
          </shadow>
        </value>
      </block>
    </category>
    <sep></sep>
    <category name="Variables" colour="#A65C81" custom="VARIABLE"></category>
    <category name="Functions" colour="#9A5CA6" custom="PROCEDURE"></category>
    <sep></sep>
  </xml>`,
];

const actuadoresXML = {
  led: `<block type="led">
          <field name="ACTION">turnOn</field>
        </block>`,
  lcd: `<block type="lcd">
          <field name="TEXT">Texto a mostrar</field>
        </block>`,
  ledRGB: `<block type="ledrgb">
    <field name="ACTION1">turnOn</field>
    <field name="L1">#ff99ff</field>
    <field name="ACTION2">turnOn</field>
    <field name="L2">#9999ff</field>
    <field name="ACTION3">turnOn</field>
    <field name="L3">#33ffff</field>
    <field name="ACTION4">turnOn</field>
    <field name="L4">#ff6666</field>
    <field name="ACTION5">turnOn</field>
    <field name="L5">#ccffff</field>
    <field name="ACTION6">turnOn</field>
    <field name="L6">#66ff99</field>
    <field name="ACTION7">turnOn</field>
    <field name="L7">#ffff66</field>
  </block>`,
  servo: `<block type="servo">
            <field name="ANGLE">90</field>
          </block>`,
  motor: `<block type="motor">
            <field name="VALUE">0</field>
          </block>`,
  relay: `<block type="relay">
            <field name="ACTION">turnOn</field>
          </block>`
};
/* `<category name="Sensores" colour="#5b5ba5">
    <block type="distance"></block>
    <block type="temperature"></block>
  </category>`,
`<category name="Actuadores" colour="#6d5ba5">
    <block type="led">
      <field name="ACTION">turnOn</field>
    </block>
  </category>`, */

function createSensorsString(name, color, blocks) {
  return [
    `<category name="${name}" colour="${color}">`,
    blocks.map(s => `<block type="${s.type}"></block>`).join(''),
    '</category>',
  ].join('');
}

function createActorsString(name, color, blocks) {
  return [
    `<category name="${name}" colour="${color}">`,
    blocks.map(s => actuadoresXML[s.type]).join(''),
    '</category>',
  ].join('');
}

export function updateToolbox(usedTois) {
  const sensores = usedTois.filter(s => s.hasEvents);
  const actuadores = usedTois.filter(s => !s.hasEvents);
  const toolboxCopy = [...toolbox];

  console.log(actuadores);

  if (actuadores.length) {
    toolboxCopy.splice(
      1,
      0,
      createActorsString('Actuadores', '#6d5ba5', actuadores)
    );
  }
  if (sensores.length) {
    toolboxCopy.splice(
      1,
      0,
      createSensorsString('Sensores', '#5b5ba5', sensores)
    );
  }
  return toolboxCopy.join('');
}

export const workspace = `
  <xml xmlns="http://www.w3.org/1999/xhtml" id="workspaceBlocks" style="display:none">
    <variables></variables>
  </xml>
`;
