import { Appliance } from './api-view';

export interface IApplianceService {
  getAppliances(): Promise<Appliance[]>;
  getApplianceById(applianceId: number): Promise<Appliance>;
}
