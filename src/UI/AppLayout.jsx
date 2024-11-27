import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../Features/ChatReduxOperations";
import { Provider } from "react-redux";

function PersistGateComponent() {
  return (
    <PersistGate loading={<span>...loading</span>} persistor={persistor}>
      <Header />
      <Outlet />
      <Footer />
    </PersistGate>
  );
}

function AppLayout() {
  return (
    <Provider store={store}>
      <PersistGateComponent />
    </Provider>
  );
}

export default AppLayout;
