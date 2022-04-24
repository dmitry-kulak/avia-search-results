import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.scss";
import App from "./App";
import { Store } from "./store/store";

// @ts-ignore
export const AppContext = createContext<Store>(null);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContext.Provider value={new Store()}>
      <App />
    </AppContext.Provider>
  </StrictMode>
);
