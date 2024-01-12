import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./components/AuthContext";
import {store, persistor} from "./store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <AuthProvider>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <App />
        </PersistGate>
    </Provider>
    // </AuthProvider>
    );
