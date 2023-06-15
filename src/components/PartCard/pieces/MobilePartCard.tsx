import * as React from "react";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    styled,
    useTheme
} from "@mui/material";
import { ParsedUrlQuery } from "querystring";
import { LoglineHolder } from "./LoglineHolder/LoglineHolder";
import { PartCardAction } from "./PartCardActions/PartCardAction";
import { PartCardHeader } from "./PartCardHeader";
import Styles from "./shared.module.scss"
import { PartCardProps } from "../PartCard";

const ImageCardHeader = styled(CardHeader, { shouldForwardProp: (prop) => prop !== 'backgroundImageUrl' })<{
    backgroundImageUrl?: string;
}>(({ theme, backgroundImageUrl }) => ({
    margin: `${theme.spacing(1)} ${theme.spacing(1)} 0px ${theme.spacing(1)}`,
    padding: `0px 0px 70% 0px`,
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    borderRadius: `${theme.spacing(1)}`,
    ".MuiCardHeader-content": {
        background: "rgba(0, 0, 0, .8)",
        padding: `${theme.spacing(1)} ${theme.spacing(1)} ${theme.spacing(2)} ${theme.spacing(1)}`,
        borderRadius: `${theme.spacing(1)} ${theme.spacing(1)} 0px 0px`
    }
}));

export default function MobilePartCard(props: PartCardProps): JSX.Element {
    const theme = useTheme();

    return (
        <Card sx={{
            backgroundColor: "background.paper",
            color: "text.secondary",
        }}>
            <ImageCardHeader
                backgroundImageUrl={props.imageUrl}
                title={<PartCardHeader title={props.title} />}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent
                    className={Styles.mobileCardContent}
                    sx={{
                        padding: `${theme.spacing(1)}`,
                        pb: `${theme.spacing(1)} !important`
                    }}>
                    <LoglineHolder logline={props.logline} />
                    <PartCardAction slug={props.slug} isPatreonOnly={props.isPatreonOnly} />
                </CardContent>
            </Box>
        </Card>
    );
}
