export type Appliance = {
  id: number;
  status: string;
  serialNo: string;
  theatreName: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  bandwidth: string;
  avgBandwidth: string;
  deviceStatus: string;
  downloadStatus: string;
  osVersion: string;
};
