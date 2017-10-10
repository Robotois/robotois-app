import axios from 'axios';
import { getConnected } from './discover-kits';

export const RECEIVE_AVAILABLE_KITS = 'RECEIVE_AVAILABLE_KITS';
export const REQUEST_AVAILABLE_KITS = 'REQUEST_AVAILABLE_KITS';
export const KIT_CONFIG_SELECT_KIT = 'KIT_CONFIG_SELECT_KIT';
export const WIFI_CONFIG_REQUEST_AVAILABLE = 'WIFI_CONFIG_REQUEST_AVAILABLE';
export const WIFI_CONFIG_RECEIVE_AVAILABLE = 'WIFI_CONFIG_RECEIVE_AVAILABLE';
export const WIFI_CONFIG_SELECTED_WIFI = 'WIFI_CONFIG_SELECTED_WIFI';
export const WIFI_CONFIG_RESET_WIFI = 'WIFI_CONFIG_RESET_WIFI';

const requestAvailable = () => ({
  type: REQUEST_AVAILABLE_KITS,
});

const receiveAvailable = kits => ({
  type: RECEIVE_AVAILABLE_KITS,
  kits,
});

export const fetchAvailableKits = () => (dispatch) => {
  dispatch(requestAvailable());
  return getConnected()
    .then(connected => dispatch(receiveAvailable(connected)));
};

export const selectKit = selectedKit => ({
  type: KIT_CONFIG_SELECT_KIT,
  selectedKit,
});

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
  }).then((res) => {
    const { data: { networks } } = res;
    // console.log('networks:', res);
    dispatch(receiveAvailableWifis(networks));
  }).catch((error) => {
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

export const connectWifi = (hostIp, wifi) => dispatch => axios({
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
