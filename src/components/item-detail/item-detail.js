import React from 'react';
// import DeleteButton from '../DeleteButton';
import InputModulesSelect from './input-select';
import { isEventListener } from '../shared/items-by-function';

const ToiImg = ({ isShield, src }) => (
  <div className="centered" style={{ width: isShield ? '90%' : '40%' }}>
    <img src={src} alt="Imagen del Componente" className="img-responsive" />
  </div>
);

const ItemDescription = ({ item, isShield, hasMultiple }) => (
  <div>
    <div className="tile-title">
      {
        `${item.title} ${hasMultiple ? item.instance : ''}`
      }
    </div>
    {
      isShield ?
        <ToiImg isShield={isShield} src="img/tois/shield-robotois.svg" /> :
        <ToiImg isShield={isShield} src={item.image} />
    }
    <div className="tile-subtitle my-2">
      {item.description}
    </div>
  </div>
);

const ItemDetail = ({ currentItem, multipleInstances, currentInputModules }) => {
  const isListener = currentItem && isEventListener(currentItem.type);
  // console.log('ItemDetail:', currentInputModules);
  return (
    <div className="toi-detail">
      <div className="tile-content">
        {
          currentItem && <ItemDescription
            item={currentItem}
            isShield={currentItem.type === 'shield'}
            hasMultiple={multipleInstances}
          />
        }
        {
          isListener && <InputModulesSelect currentInputModules={currentInputModules} />
        }
      </div>
    </div>
  );
};

export default ItemDetail;
