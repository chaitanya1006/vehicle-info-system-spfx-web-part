import { WebPartContext } from "@microsoft/sp-webpart-base";
import { AadHttpClientFactory, AadTokenProviderFactory, MSGraphClientFactory, MSGraphClientV3 } from '@microsoft/sp-http';

export interface IHelloWorldProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

export interface IVehiclePageInfo {
  pageTitle: string;
  createdBy: string
  welcomeMessage: string;
  context: WebPartContext;
  msGraphClientFactory: MSGraphClientFactory;
  aadHttpClientFactory: AadHttpClientFactory
  aadTokenProviderFactory: AadTokenProviderFactory
}

export interface IDataGrid {
  Id: string;
  Make: string;
  VIN: string;
  Model: string;
  Trim: string;
  Price: string;
}
