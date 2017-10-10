import React from 'react';
import KitListContainer from '../../containers/kit-config/kit-list-container';
import KitContainer from '../../containers/kit-config/kit-container';

const KitConfig = ({ selectedKit }) => (!selectedKit ? <KitListContainer /> : <KitContainer />);

export default KitConfig;
