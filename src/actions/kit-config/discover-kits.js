import axios from 'axios';

const { remote } = window.require('electron');
const tcpp = remote.require('tcp-ping');
const os = remote.require('os');

const getIP4 = iface => iface.reduce(
  (str, ipConfig) => (ipConfig.family === 'IPv4' ? ipConfig.address : str),
  undefined,
);

const noDuplicate = (arr, el) => (el && arr.indexOf(el) === -1 ?
  arr.concat(el) :
  arr);

const ipFormatter = ipv4 => (ipv4 ?
  ipv4.match(/([0-9]{1,3}.){3}/)[0].concat('x') :
  undefined);

const ipFormats = () => {
  const ifaces = os.networkInterfaces();
  const ips = Object.keys(ifaces).reduce(
    (arr, ifaceName) => (!ifaceName.includes('lo') ?
      noDuplicate(
        arr,
        ipFormatter(getIP4(ifaces[ifaceName])),
      ) :
      arr),
    [],
  );
  return ips;
};

const ipPopulate = (ipFormat) => {
  const vect = [...Array(255).keys()];
  const ips = vect.map(index => ipFormat.replace(/.x/g, `.${index + 1}`));
  return ips;
};

const ipsGenerator = () => {
  const formats = ipFormats();
  // console.log('ipFormats:', formats);
  const ipsVector = formats.reduce(
    (arr, format) => arr.concat(ipPopulate(format)),
    [],
  );
  return ipsVector;
};

const testConnection = ip => new Promise((resolve, reject) => {
  tcpp.probe(ip, 8082, (err, available) => {
    if (err) reject(err);
    if (available) {
      // console.log(`ip: ${ip} available`);
      axios({ method: 'get', url: `http://${ip}:8082/wifi/hostname` })
        .then((response) => {
          const { data: { hostname } } = response;
          resolve({ ip, available: true, hostname });
        })
        .catch((error) => {
          resolve({ ip, available: false });
          console.log(error);
        });
    } else {
      resolve({ ip, available: false });
    }
  });
});

const discoverAll = async () => {
  const ips = ipsGenerator();
  return Promise.all(
    ips.map(async (ip) => {
      const data = await testConnection(ip);
      return data;
    }),
  );
};

export const getConnected = () => new Promise((resolve) => {
  discoverAll().then(connected => resolve(
    connected.filter(status => status.available),
  ));
});

const discoverKits = () => {
  getConnected().then(connected => console.log(connected));
};

export default discoverKits;
