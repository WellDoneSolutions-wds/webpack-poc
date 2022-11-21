import { EnvironmentInjector } from "@angular/core";
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { getAngularInjector } from "./main";
import { LoginService } from "./service/LoginService";

export const AngularInjectorContext = createContext<
  EnvironmentInjector | undefined
>(undefined);

export const AngularInjectorProvider = (props: { children: ReactElement }) => {
  const EnvironmentInjectorRef = useRef<EnvironmentInjector>();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    getAngularInjector().then((injector) => {
      EnvironmentInjectorRef.current = injector;
      forceUpdate();
    });
  }, []);
  if (!EnvironmentInjectorRef.current) {
    return <></>;
  }

  return (
    <AngularInjectorContext.Provider value={EnvironmentInjectorRef.current}>
      {props.children}
    </AngularInjectorContext.Provider>
  );
};

const useAngularInjector = () => {
  const context = useContext(AngularInjectorContext);
  return context!;
};

export const App = () => {
  return (
    <AngularInjectorProvider>
      <>
        <App2 />
        <h1>d</h1>
      </>
    </AngularInjectorProvider>
  );
};

function App2() {
  const angularInjector = useAngularInjector();

  const [data, setData] = useState<any>();

  const loginService = angularInjector.get(LoginService);

  useEffect(() => {
    loginService.authenticate().subscribe((x) => {
      setData(x);
    });
  }, []);
  return (
    <div className="App">
      {JSON.stringify(data)}
      <button
        type="button"
        onClick={() => {
          loginService.authenticate().subscribe((x) => {
            setData(x);
          });
        }}
      >
        Autenticar
      </button>
    </div>
  );
}

export default App;
