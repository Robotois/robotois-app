import React from 'react';

const KitContent = ({ hostname, ip, resetSelectedKit }) => (
  <div>
    <div className="panel-header">
      <div className="panel-title h5">Nombre del Kit: <b><mark>{hostname}</mark></b></div>
      <div className="panel-subtitle"> Dirección IP del Kit: <b>{ip}</b></div>
    </div>
    <div className="panel-body h6">
      <p>
        En esta sección se establece la configuración del Kit Robotois, en donde
        se selecciona la Red WiFi a la cual se va a conectar.
      </p>
      <p>
        Otras funciones disponibles son:
      </p>
      <div className="col-11 col-ml-auto">
        <dl>
          <dt>Crear Access Point</dt>
          <dd>
            <em>
            Esta función es muy útil porque permite que el Kit Robotois
            cree una red WiFi a la cual podemos conectar nuestra PC o Laptop
            y así utilizar la aplicación principal.
            </em>
          </dd>
          <dt>Función de Apagado</dt>
          <dd>
            <em>
            Esta función nos permite apagar el Kit Robotois de manera remota.
            </em>
          </dd>
        </dl>
      </div>
      <p>
        Para regresar a la sección anterior, presiona Regresar.
      </p>
    </div>
    <div className="panel-footer">
      <button className="btn btn-link h5" onClick={resetSelectedKit}>Regresar</button>
    </div>
  </div>
);

const MainContent = ({ appReset }) => (
  <div>
    <div className="panel-header">
      <div className="panel-title h4">Configuración del Kit</div>
    </div>
    <div className="panel-body h6">
      <p>Esta aplicación permite establecer la configuración de conexión en el kit Robotois,
      por ello se muestra la lista de los kits conectados a tu red local.
      </p>
      <p>Por otro lado si estas conectado al Access Point generado por tu kit Robotois,
      esta aplicación también te permitirá configurarlo.</p>
      <p>Selecciona tu kit y configura la conexión o regresa a la aplicación principal.</p>
    </div>
    <div className="panel-footer h5">
      <button className="btn btn-link" onClick={appReset}>Regresar</button>
    </div>
  </div>
);

const ConfigSidebar = ({ selectedKit, resetSelectedKit, appReset }) => (
  <div
    className="panel mx-2"
    style={{
      backgroundColor: 'white',
      marginTop: '3.6rem',
    }}
  >
    {
      !selectedKit ?
        <MainContent appReset={appReset} /> :
        <KitContent {...selectedKit} resetSelectedKit={resetSelectedKit} />
    }
  </div>
);

export default ConfigSidebar;
