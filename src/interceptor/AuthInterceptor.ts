import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { IEnvironmentConfig } from "src/app.module";

export class AuthInterceptor implements HttpInterceptor {
  constructor(private config: IEnvironmentConfig) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const apiReq = req.clone({ url: `${this.config.backend}/${req.url}` });
    const token = "DDDDD"; // localStorage.getItem("auth_token");
    if (!token) {
      return next.handle(req);
    }
    const headers = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`),
    });
    return next.handle(headers);
  }
}
