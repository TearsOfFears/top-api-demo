export class RobotaFindDto {
  took: number;
  start: number;
  count: number; //need this one
  total: number;
  hasGeoCount: number;
  errorMessage: any;
  documents: Document[];
}

export interface Document {
  id: number;
  name: string;
  logo: string;
  designBannerUrl: string;
  designBannerFullUrl: string;
  publicationType: number;
  date: string;
  dateTxt: string;
  hot: boolean;
  salary: number;
  salaryFrom: number; // need this one
  salaryTo: number; // need this one
  salaryComment: string;
  cityName: string;
  cityId: number;
  metroName: string;
  metroId: number;
  districtName: string;
  districtId: number;
  notebookId: number;
  companyName: string;
  formApplyCustomUrl: string;
  isLiked: boolean;
  isApply: boolean;
  applyDate: any;
  lastViewDate: any;
  distanceText: string;
  latitude: number;
  longitude: number;
  shortDescription: string;
  badges: Badge[];
}

export interface Badge {
  id: number;
  name: string;
}
