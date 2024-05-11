import { AxiosInstance } from 'axios';
import { ServiceBase } from '../service-base';
import { Appliance } from './api-view';
import { IApplianceService } from './interface';

const API = {
  getAppliances() {
    return `/appliances`;
  },
  getApplianceById(applianceId: number) {
    return `/appliances/${applianceId}`;
  },
};

export class ApplianceService extends ServiceBase implements IApplianceService {
  constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance);
  }

  async getApplianceById(applianceId: number): Promise<Appliance> {
    const url = API.getApplianceById(applianceId);
    return await this.doGet(url);
  }

  async getAppliances(): Promise<Appliance[]> {
    const url = API.getAppliances();
    return await this.doGet(url);
  }
}
