import { CssBaseline, ThemeProvider } from "@mui/material";
import { defaultTheme } from "./theme";
import {store} from "../redux-store/store"
import { Provider } from 'react-redux'

import "./index.css"
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </Provider>
    );
}
