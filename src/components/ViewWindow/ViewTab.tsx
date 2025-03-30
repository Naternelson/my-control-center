import { Box, ButtonBase, Typography } from "@mui/material";
import { ViewTabProps } from "./types";
import { blueGrey, grey } from "@mui/material/colors";
import { Close } from "@mui/icons-material";
import clsx from "clsx";

export default function ViewTab({
    id,
    containerId,
    order,
    active,
    label,
    startIcon,
    endIcon,
    onClose,
}: ViewTabProps) {
    return (
        <Box
            component="button"
            className={clsx({ active })}
            sx={{
                position: "absolute",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 0.5,
                minHeight: "1.5rem",
                maxHeight: "1.5rem",
                boxSizing: "border-box",
                padding: "1rem",
                fontSize: ".7rem",
                color: blueGrey[400],
                backgroundColor: grey[900],
                border: `1px solid ${blueGrey[700]}`,
                borderRadius: "2px 2px 0 0",
                transition: "all 100ms ease-out",

                "&.active": {
                    cursor: "default !important",
                    color: "white",
                    backgroundColor: blueGrey[900],
                    borderTop: (theme) =>
                        `2px solid ${theme.palette.primary.main}`,
                    borderBottom: 0,
                    "& .close-btn": {
                        visibility: "visible",
                    },
                },
                "& .close-btn": {
                    visibility: "hidden",
                    padding: ".1rem",
                    "&:hover": {
                        backgroundColor: blueGrey[700],
                    },
                },
                "&:hover": {
                    cursor: "pointer",
                    backgroundColor: blueGrey[800],
                    "& .close-btn": {
                        visibility: "visible",
                    },
                },
            }}
        >
            {startIcon && <Box>{startIcon}</Box>}
            <Typography>{label}</Typography>
            {endIcon && <Box>{endIcon}</Box>}
            <ButtonBase
                className="close-btn"
                onClick={() =>
                    onClose({
                        id,
                        containerId,
                        order,
                        active,
                        label,
                        startIcon,
                        endIcon,
                        onClose,
                    })
                }
            >
                <Close />
            </ButtonBase>
        </Box>
    );
}
