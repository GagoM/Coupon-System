import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { map } from 'rxjs/operator/map';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class LoggerService {

  constructor(private _http: Http) { }
  
  public info(msg: string): void {
    this.logToFile("info", msg);

  }


  public error(msg: string, ): void {

  }

  private logToFile(msgType: "info" | "error", msg: string) {
    var message = msgType + " : " + msg;
    this._http.post('../././logger/logtofile', message)
      .subscribe()
  }

}
