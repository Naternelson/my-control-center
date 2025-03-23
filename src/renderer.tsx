// src/renderer.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import Dashboard from "./views/Dashboard";
import Layout from "./style/layout";



const container = document.getElementById("root");
if (container) {
    const root = createRoot(container);
    root.render(<Layout ><Dashboard/></Layout>);
}
