import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AuthInterceptor } from "./interceptor/AuthInterceptor";
import { LoginService } from "./service/LoginService";

export interface IEnvironmentConfig {
  backend: { url: string };
}

@NgModule({
  declarations: [],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: LoginService,
      useFactory: (httpClient: HttpClient) => {
        return new LoginService(httpClient);
      },
      deps: [HttpClient, "env"],
    },
    {
      provide: "ENVIRONMENT_CONFIG",
      useFactory: (): IEnvironmentConfig => {
        return { backend: { url: "c" } };
      },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (config: IEnvironmentConfig) => {
        return new AuthInterceptor(config);
      },
      multi: true,
      deps: ["ENVIRONMENT_CONFIG"],
    },
    {
      provide: "env",
      useFactory: () => {
        return "";
      },
    },
  ],
  bootstrap: [],
})
export class AppModule {
  ngDoBootstrap() {}
}
