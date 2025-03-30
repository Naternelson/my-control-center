import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

export default function ({ children }: PropsWithChildren) {
    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                width: "100vw",
                boxSizing: "border-box",
                border: "1px solid white",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    height: "20px",
                    outline: "1px solid white",
                }}
            >mom?</Box>
            <Box sx={{ flex: 1 }}>{children}</Box>
        </Box>
    );
}
