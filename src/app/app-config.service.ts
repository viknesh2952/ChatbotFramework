import { Injectable }  from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppConfigService {
    static settings: IAppConfig;
    result: IAppConfig;

    constructor(private http: HttpClient) {}
    load() {
        const jsonFile = `assets/config/config.json`;
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response : IAppConfig) => {
               AppConfigService.settings = <IAppConfig>response;
               this.result=<IAppConfig>response;
               console.log( AppConfigService.settings);
               resolve();
               
            }).catch((response: any) => {
               reject(`Could not load the config file`);
            });
        });
    }
}

export interface IAppConfig {
    global:{
        DOMAIN:string,
        PORT:string,
        API_PREFIX:string,
        DATE_FORMAT_OUTPUT:string,
        DATE_FORMAT_DISPLAY:string,
        PROJECT_NAME:string
    }
}
