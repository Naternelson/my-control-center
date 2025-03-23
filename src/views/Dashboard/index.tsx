import { Box, Button, Container, Paper, Typography } from "@mui/material";

export default function () {
    return (
        <div>
            <Container
                sx={{
                    margin: "auto",
                    padding: 2,
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography variant="h1">Typography</Typography>
                <Typography variant="h2" color="primary">
                    Primary
                </Typography>
                <Typography variant="h3" color="secondary">
                    Secondary
                </Typography>
                <Typography variant="h4" color="warning">
                    Warning
                </Typography>
                <Typography variant="h5" color="error">
                    Error
                </Typography>
                <Typography variant="h6" color="success" textAlign={"center"}>
                    Success
                </Typography>
                <Typography variant="body1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt
                </Typography>
                <Paper sx={{ padding: 2 }} elevation={3}>
                    <Typography variant="body2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt
                    </Typography>
                </Paper>
            </Container>
            <Container
                sx={{
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography variant="h1">Buttons</Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 2,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button variant="contained" color="primary">
                        Primary
                    </Button>
                    <Button variant="contained" color="secondary">
                        Secondary
                    </Button>
                    <Button variant="contained" color="warning">
                        Warning
                    </Button>
                    <Button variant="contained" color="error">
                        Error
                    </Button>
                    <Button variant="contained" color="success">
                        Success
                    </Button>
                </Box>
            </Container>
        </div>
    );
}
