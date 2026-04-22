import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
            <BrowserRouter>
                  <App />
                  <Toaster
                        position="top-right"
                        toastOptions={{
                              style: {
                                    background: "#18181b",
                                    color: "#fafafa",
                                    border: "1px solid #3f3f46",
                                    fontFamily: "'DM Sans', sans-serif",
                                    borderRadius: "10px",
                              },
                              success: { iconTheme: { primary: "#22c55e", secondary: "#18181b" } },
                              error: { iconTheme: { primary: "#ef4444", secondary: "#18181b" } },
                        }}
                  />
            </BrowserRouter>
      </React.StrictMode>
);