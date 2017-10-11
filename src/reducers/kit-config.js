import {
  REQUEST_AVAILABLE_KITS,
  RECEIVE_AVAILABLE_KITS,
  KIT_CONFIG_SELECT_KIT,
  KIT_CONFIG_RESET_KIT,
  WIFI_CONFIG_REQUEST_AVAILABLE,
  WIFI_CONFIG_RECEIVE_AVAILABLE,
  WIFI_CONFIG_SELECTED_WIFI,
  WIFI_CONFIG_RESET_WIFI,
} from '../actions/kit-config/kit-config';

const initialState = {
  selectedKit: undefined,
  isFetching: false,
  kits: [],
  wifiConfig: {
    selectedWifi: undefined,
    isFetching: false,
    wifis: [],
  },
};

const wifiConfigReducer = (state, action) => {
  switch (action.type) {
    case WIFI_CONFIG_REQUEST_AVAILABLE:
      return {
        isFetching: true,
        wifis: [],
        selectedWifi: undefined,
      };
    case WIFI_CONFIG_RECEIVE_AVAILABLE:
      return {
        isFetching: false,
        wifis: action.wifis,
        selectedWifi: undefined,
      };
    case WIFI_CONFIG_SELECTED_WIFI:
      return {
        ...state,
        selectedWifi: action.wifi,
      };
    case WIFI_CONFIG_RESET_WIFI:
      return {
        ...state,
        selectedWifi: undefined,
      };
    default:
      return state;
  }
};

const kitConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_AVAILABLE_KITS:
      return {
        ...initialState,
        isFetching: true,
      };
    case RECEIVE_AVAILABLE_KITS:
      return {
        ...initialState,
        isFetching: false,
        kits: action.kits,
      };
    case KIT_CONFIG_SELECT_KIT:
      return {
        ...state,
        selectedKit: action.selectedKit,
      };
    case KIT_CONFIG_RESET_KIT:
      return {
        ...state,
        selectedKit: undefined,
      };
    case WIFI_CONFIG_REQUEST_AVAILABLE:
    case WIFI_CONFIG_RECEIVE_AVAILABLE:
    case WIFI_CONFIG_SELECTED_WIFI:
    case WIFI_CONFIG_RESET_WIFI:
      return {
        ...state,
        wifiConfig: wifiConfigReducer(state.wifiConfig, action),
      };
    default:
      return state;
  }
};

export default kitConfigReducer;
