import { OpaqueToken } from "@angular/core";
import { environment } from 'environments/environment';

export let APP_CONFIG = new OpaqueToken("app.config");

export interface IAppConfig {
    apiEndpoint: string;
}

export const AppConfig: IAppConfig = {
    apiEndpoint: environment.apiUrl
};
