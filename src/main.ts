import {
  enableProdMode,
  EnvironmentInjector,
  NgModuleRef,
} from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app.module";
export const getAngularInjector = async () => {
  enableProdMode();
  return new Promise<EnvironmentInjector>((resolve, reject) => {
    platformBrowserDynamic()
      .bootstrapModule(AppModule, { ngZone: "noop" })
      .then((ngModuleRef: NgModuleRef<AppModule>) => {
        resolve(ngModuleRef.injector);
      });
  });
};
