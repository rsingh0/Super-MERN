import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Client from "./ApolloProvider";
import { ApolloProvider } from "@apollo/client";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SnackbarProvider>
      <ApolloProvider client={Client}>
        <App />
      </ApolloProvider>
    </SnackbarProvider>
  </BrowserRouter>
);
