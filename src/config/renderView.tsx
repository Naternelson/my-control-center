import React from "react";
import { createRoot } from "react-dom/client";
import Layout from "../style/layout";

export const renderView = (App: React.ReactNode) => {
    const container = document.getElementById("root");
    if (container) {
        const root = createRoot(container);
        root.render(<Layout>{App}</Layout>);
    }
};
