import { CssBaseline, ThemeProvider } from "@mui/material";
import { store } from "../redux-store/store";
import { Provider } from "react-redux";
import { defaultTheme } from "./theme";
export default function () {
    return (
        <Provider store={store}>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <div>
                    <h1>Welcome to the React App!</h1>
                    <p>This is a simple React application.</p>
                </div>
            </ThemeProvider>
        </Provider>
    );
}
