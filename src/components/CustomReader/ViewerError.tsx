import React from "react";
import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface ViewerFailedProps {
    errorMessage: string;
    title: string;
}

const ViewerErrorPage = styled(Paper)(({ theme }) => ({
    background: theme.palette.mode == "dark" ? "black" : "white",
    color: theme.palette.error.main,
    padding: "2rem"
}))

export function ViewerFailed({ errorMessage, title }: ViewerFailedProps): JSX.Element {
    return <ViewerErrorPage>
        <Typography component="p" variant="h4" sx={{
            textDecoration: "underline"
        }}>
            <p>Sorry, we couldn&apos;t load our document!</p>
        </Typography>
        <div style={{
            paddingLeft: "3rem"
        }}>
            <Typography component="p" variant="body1" sx={{ margin: ".25rem" }}>
                <strong>Document title:</strong> <em style={{ color: "white" }}>{title}</em>
            </Typography>
            <Typography component="p" variant="body1" sx={{ margin: ".25rem" }}>
                <strong>Error code:</strong> <em style={{ color: "white" }}>{errorMessage}</em>
            </Typography>
        </div>
    </ViewerErrorPage>
}