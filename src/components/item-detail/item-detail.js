import React from 'react';
// import DeleteButton from '../DeleteButton';
import InputModulesSelect from './input-select';
import { isEventListener } from '../shared/items-by-function';

const ToiImg = ({ isShield, src }) => (
  <div className="card-image centered" style={{ width: isShield ? '80%' : '30%' }}>
    <img src={src} alt="Imagen del Componente" className="img-responsive" />
  </div>
);

const ItemDescription = ({ item, isShield, multiple }) => (
  <div>
    <div className="card-header">
      <div className="card-title h5">
        {
          `${item.title} ${multiple ? item.instance : ''}`
        }
      </div>
    </div>
    {
      isShield ?
        <ToiImg isShield={isShield} src="img/tois/shield-robotois.svg" /> :
        <ToiImg isShield={isShield} src={item.image} />
    }
    <div className="card-body">
      {item.description}
    </div>
  </div>
);

const ItemDetail = ({ currentItem, instances, currentInputModules }) => {
  const isListener = currentItem && isEventListener(currentItem.type);
  // console.log('isListener:', currentInputModules);
  return (
    <div>
      {
        currentItem && <ItemDescription item={currentItem} isShield={currentItem.type === 'shield'} multiple={instances > 1} />
      }
      {
        isListener && <InputModulesSelect currentInputModules={currentInputModules} />
      }
    </div>
  );
};

export default ItemDetail;
