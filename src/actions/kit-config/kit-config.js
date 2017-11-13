import axios from 'axios';
import { getConnected } from './discover-kits';
import { CodeGenerator } from '../../CodeGenerator/CodeGenerator';
import Enums from '../../utils/Enums';
import { updateStatus } from '../status-bar';

export const RECEIVE_AVAILABLE_KITS = 'RECEIVE_AVAILABLE_KITS';
export const REQUEST_AVAILABLE_KITS = 'REQUEST_AVAILABLE_KITS';
export const KIT_CONFIG_SELECT_KIT = 'KIT_CONFIG_SELECT_KIT';
export const KIT_CONFIG_RESET_KIT = 'KIT_CONFIG_RESET_KIT';
export const WIFI_CONFIG_REQUEST_AVAILABLE = 'WIFI_CONFIG_REQUEST_AVAILABLE';
export const WIFI_CONFIG_RECEIVE_AVAILABLE = 'WIFI_CONFIG_RECEIVE_AVAILABLE';
export const WIFI_CONFIG_SELECTED_WIFI = 'WIFI_CONFIG_SELECTED_WIFI';
export const WIFI_CONFIG_RESET_WIFI = 'WIFI_CONFIG_RESET_WIFI';
export const KIT_CONFIG_REQUEST_RUN_CODE = 'KIT_CONFIG_REQUEST_RUN_CODE';

const requestAvailable = () => ({
  type: REQUEST_AVAILABLE_KITS,
});

const receiveAvailable = kits => ({
  type: RECEIVE_AVAILABLE_KITS,
  kits,
});

export const fetchAvailableKits = () => (dispatch) => {
  dispatch(requestAvailable());
  return getConnected().then(connected => dispatch(receiveAvailable(connected)));
};

const selectKit = selectedKit => ({
  type: KIT_CONFIG_SELECT_KIT,
  selectedKit,
});

export const kitSelection = selectedKit => (dispatch) => {
  dispatch(selectKit(selectedKit));
  return Promise.resolve().then(() => {
    dispatch(updateStatus(true, 'Kit Conectado', false));
  }).then(() =>
    axios({
      method: 'get',
      url: `http://${selectedKit.ip}:8082/runner/status`,
    })
      .then((response) => {
        console.log(response);
        dispatch(updateStatus(true, response.data.message, response.data.runner));
      }, (error) => {
        console.log(error);
        dispatch(updateStatus(false, 'Kit Desconectado', false));
      }),
  );
};

const resetSelection = () => ({
  type: KIT_CONFIG_RESET_KIT,
});

export const resetSelectedKit = () => (dispatch) => {
  dispatch(resetSelection());
  return Promise.resolve().then(() => {
    dispatch(updateStatus(false, 'Kit Desconectado', false));
  });
};

const requestAvailableWifis = () => ({
  type: WIFI_CONFIG_REQUEST_AVAILABLE,
});

const receiveAvailableWifis = wifis => ({
  type: WIFI_CONFIG_RECEIVE_AVAILABLE,
  wifis,
});

export const fetchAvailableWifis = hostIp => (dispatch) => {
  dispatch(requestAvailableWifis());
  return axios({
    method: 'get',
    url: `http://${hostIp}:8082/wifi/all`,
  })
    .then((res) => {
      const { data: { networks } } = res;
      // console.log('networks:', res);
      dispatch(receiveAvailableWifis(networks));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const selectWifi = wifi => ({
  type: WIFI_CONFIG_SELECTED_WIFI,
  wifi,
});

export const resetWifi = () => ({
  type: WIFI_CONFIG_RESET_WIFI,
});

export const connectWifi = (hostIp, wifi) => dispatch =>
  axios({
    method: 'post',
    // baseURL: 'http://192.168.1.75:8082',
    url: `http://${hostIp}:8082/wifi/connect`,
    data: { ...wifi },
  })
    .then((response) => {
      console.log(response);
      dispatch(resetWifi());
    })
    .catch((error) => {
      console.log(error);
    });

export const createAP = hostIp =>
  axios({
    method: 'get',
    url: `http://${hostIp}:8082/wifi/start-ap`,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

export const shutdown = hostIp =>
  axios({
    method: 'get',
    url: `http://${hostIp}:8082/shutdown`,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

const parseHeaders = (usedTois) => {
  const figures = [];
  const connections = [];
  let portNumber;

  window.Robotois.CANVAS.getFigures().data.forEach((figure) => {
    const parentName = figure.NAME.replace('draw2d.shape.robotois.', '');
    const parentToi = parentName !== 'Shield'
      ? usedTois.find(toi => toi.figureId === figure.id)
      : undefined;
    if (parentToi) {
      figures.push({
        type: parentToi.type,
        instance: parentToi.instance,
      });
    }
    figure.outputPorts.data.forEach((port) => {
      port.getConnections().data.forEach((conn) => {
        const childFigure = conn.targetPort.getParent();
        const childToi = usedTois.find(toi => toi.figureId === childFigure.id);
        portNumber = port.name.slice(-1);
        portNumber *= 1;
        portNumber += 1;
        const connection = {
          type: childToi.type,
          instance: childToi.instance,
          parent: {
            type: parentToi ? parentToi.type : 'shield',
            instance: parentToi ? parentToi.instance : undefined,
            port: portNumber,
          },
        };
        connections.push(connection);
      });
    });
  });
  let error;
  const validConnections = figures.every((toi) => {
    const isConnected =
      connections.findIndex(conn => conn.type === toi.type && conn.instance === toi.instance) !==
      -1;
    if (!isConnected) {
      error = `Error de conexión del módulo "${Enums[toi.type]}"`;
    }
    return isConnected;
  });
  return validConnections
    ? {
      success: true,
      connections,
    }
    : {
      success: false,
      error,
    };
};

export const generateCode = (eventList, usedTois, code) => {
  if (usedTois.length === 0) {
    return {
      success: false,
      message: 'Agrega algunos Tois',
    };
  }

  if (eventList.length === 0) {
    return {
      success: false,
      message: 'No hay Eventos configurados en los Tois',
    };
  }

  const connections = parseHeaders(usedTois);
  if (!connections.success) {
    return {
      success: false,
      message: connections.error || 'Error al conectar los Tois',
    };
  }

  // console.log('connections: ', connections);
  const sourceCode = !code ? CodeGenerator(eventList, usedTois, false) : code;

  return {
    connections,
    code: sourceCode,
    success: true,
  };
};

export const requestRunCode = () => ({
  type: KIT_CONFIG_REQUEST_RUN_CODE,
});

export const runCode = (hostIp, data) => (dispatch) => {
  dispatch(requestRunCode());
  return axios({
    method: 'post',
    url: `http://${hostIp}:8082/runner`,
    data,
  })
    .then((response) => {
      console.log(response);
      // dispatch({ type: STATUS_UPDATE, success: true, message: 'Kit funcionando' });
      dispatch(updateStatus(true, response.data.message, response.data.runner));
    }, (error) => {
      console.log(error);
      dispatch(updateStatus(false, error, false));
    });
};

export const stopCode = hostIp => (dispatch) => {
  dispatch(requestRunCode());
  return axios({
    method: 'post',
    url: `http://${hostIp}:8082/runner/stop`,
  })
    .then((response) => {
      console.log(response);
      dispatch(updateStatus(true, response.data.message, response.data.runner));
    }, (error) => {
      console.log(error);
      dispatch(updateStatus(false, 'Kit Desconectado', false));
    });
};

export const kitStatus = hostIp => dispatch => axios({
  method: 'get',
  url: `http://${hostIp}:8082/runner/status`,
})
  .then((response) => {
    console.log(response);
    dispatch(updateStatus(true, response.message, response.runner));
  }, (error) => {
    console.log(error);
    dispatch(updateStatus(false, 'Kit Desconectado', false));
  });
