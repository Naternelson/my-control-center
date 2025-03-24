import { Box, Button,  } from "@mui/material";
import { useState } from "react";
export default function () {
    const [current, setCurrent] = useState(1);

    return (
        <Box
            sx={{
                height: "100%",
                width: "200px",
                position: "fixed",
                boxSizing: "border-box",
                padding: "1rem",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    // alignItems: 'center',
                    height: "100%",
                }}
            >
                {Array(11)
                    .fill(0)
                    .map((_e, iter) => {
                        const i = 11-iter-1
                        const active = i+1 === current
                        return (
                            <Button
                                key={i}
                                variant="contained"
                                color={"success"}
                                onClick={() => setCurrent(i + 1)}
                                sx={{
                                    "&:hover": {
                                        outline: (t) =>
                                            `2px solid ${t.palette.primary.light}`,
                                        opacity: 1,
                                        boxShadow:
                                            active &&
                                            `
                                        0 0 2px rgba(255, 255, 255, 0.9), 
                                        0 0 4px rgba(255, 230, 180, 0.8), 
                                        0 0 8px rgba(255, 200, 120, 0.6), 
                                        0 0 16px rgba(255, 170, 80, 0.4);
                                    `,
                                    },
                                    boxShadow:
                                        active &&
                                        `
                                        0 0 2px rgba(255, 255, 255, 0.9), 
                                        0 0 4px rgba(255, 230, 180, 0.8), 
                                        0 0 8px rgba(255, 200, 120, 0.6), 
                                        0 0 16px rgba(255, 170, 80, 0.4);
                                    `,
                                    opacity: current == i + 1 ? "100%" : 0.5,
                                    marginY:
                                        current == i + 1 ? "1rem" : ".25rem",
                                    transform:
                                        current == i + 1
                                            ? "scale(1)"
                                            : "scale(.8)",
                                    transition:
                                        "transform 300ms ease-out, margin 300ms ease-out, opacity 300ms ease",
                                    backgroundColor:
                                        current === i + 1
                                            ? (t) => t.palette.success.main
                                            : (t) => t.palette.success.dark,
                                }}
                            >
                                Level {i + 1}
                            </Button>
                        );
                    })}
            </Box>
        </Box>
    );
}
