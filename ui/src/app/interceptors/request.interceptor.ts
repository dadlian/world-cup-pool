import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_ROOT = `http://localhost/cup_pool`;

@Injectable()
export class RequestInterceptor implements HttpInterceptor{
  constructor(){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let request = {
      url: ""
    }

    if(req.url.match(/^http(s)?:\/\//)){
      request.url = req.url;
    }else{
      request.url = API_ROOT + req.url
    }

    req = req.clone(request);
    return next.handle(req)
  }
}
