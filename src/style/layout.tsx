import { CssBaseline, ThemeProvider } from "@mui/material";
import { defaultTheme } from "./theme";
import "./index.css"
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
