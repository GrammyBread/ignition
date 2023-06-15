import * as React from "react";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Theme,
    useTheme,
} from "@mui/material";
import { ParsedUrlQuery } from "querystring";
import { LoglineHolder } from "./LoglineHolder/LoglineHolder";
import { PartCardAction } from "./PartCardActions/PartCardAction";
import { PartCardHeader } from "./PartCardHeader";
import NavigationPartItem from "../../Main/Navigation/NavigationList/Parts/NavigationPart";
import { PartCardProps } from "../PartCard";
import { PartContents } from "./Contents/PartContents";

export default function DesktopPartCard(props: PartCardProps): JSX.Element {
    const theme = useTheme();

    return (
        <Card sx={{
            display: "flex",
            backgroundColor: "background.paper",
            color: "text.secondary",
        }}>
            <CardMedia
                component="img"
                sx={{
                    width: "50%",
                    margin: `${theme.spacing(1)} 0px ${theme.spacing(1)} ${theme.spacing(1)}`,
                    borderRadius: "8px"
                }}
                image={props.imageUrl}
                alt={`${props.title} cover image`} />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                    <PartCardHeader title={props.title} />
                    <LoglineHolder logline={props.logline} />
                    {props.navigationDetails && <Box>
                        <PartContents {...props.navigationDetails} />
                    </Box>}
                </CardContent>
                <Box sx={{
                    padding: `0px ${theme.spacing(1)} ${theme.spacing(1)} ${theme.spacing(1)}`
                }}>
                    <PartCardAction slug={props.slug} isPatreonOnly={props.isPatreonOnly} />
                </Box>
            </Box>
        </Card>
    );
}
