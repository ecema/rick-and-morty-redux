import App from "./App";
import configureStore from "./redux/store";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

const store = configureStore();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
