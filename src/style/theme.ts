import { createTheme, getContrastRatio } from "@mui/material";



export const defaultTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#181A1B",
            paper: "#222425",
        },
        primary: {
            main: "#607D8B",
            dark: "#263238",
            light: "#B0BEC5",
            contrastText: "#fff",
        },
        success: {
            main: "#336B2E",
            dark: "#1B3319",
            light: "#83B280",
            contrastText: "#fff",
        },
        warning: {
            main: "#B88F14",
            dark: "#7A541F",
            light: "#D2B72D",
            contrastText: "#fff",
        },
        error: {
            main: "#6B2E2E",
            dark: "#442222",
            light: "#A45B5B",
            contrastText: "#fff",
        },
        text: {
            primary: "#D0D0D0",
            secondary: "#B0BEC5",
        },
    },
    typography: {
        fontFamily: "Inter, sans-serif",
        fontSize: 12, // base font size (applies to body1 and others)
        htmlFontSize: 14, // root html size for scaling

        h1: { fontSize: "1.5rem", fontWeight: 700 }, // ~24px
        h2: { fontSize: "1.25rem", fontWeight: 600 }, // ~20px
        h3: { fontSize: "1.125rem", fontWeight: 500 }, // ~18px
        h4: { fontSize: "1rem", fontWeight: 500 }, // ~16px
        h5: { fontSize: "0.9375rem", fontWeight: 500 }, // ~15px
        h6: { fontSize: "0.875rem", fontWeight: 500 }, // ~14px

        body1: { fontSize: "0.8125rem" }, // ~13px
        body2: { fontSize: "0.75rem" }, // ~12px
        caption: { fontSize: "0.6875rem" }, // ~11px
        button: { fontSize: "0.75rem", fontWeight: 500, textTransform: "none" },
    },
});
