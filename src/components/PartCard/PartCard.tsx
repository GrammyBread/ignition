import * as React from "react";
import { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import Link from "next/link";
import { Book, Loyalty } from "@mui/icons-material";
import Styles from "./PartCard.module.scss";
import { ParsedUrlQuery } from "querystring";
import { NORMAL_PART_PATH } from "../../mappers/pathname.mapper";

export interface PartCardProps {
    slug?: ParsedUrlQuery;
    title: string;
    key: number;
    partImageUrl: string;
    logline: string;
    isPatreonOnly: boolean;
}

export default function PartCard(props: PartCardProps): JSX.Element {
    const [shouldShowOverlay, setShowOverlay] = useState(true);
    const [shouldAllowScroll, setShouldAllowScroll] = useState(false);

    const toggleScroll = (): void => {
        setShowOverlay(!shouldShowOverlay);
        setShouldAllowScroll(!shouldAllowScroll);
    };

    return (
        <Card
            sx={{
                display: "flex",
                marginTop: ".5rem",
                backgroundColor: "background.paper",
                color: "text.secondary",
            }}
        >
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={props.partImageUrl}
                alt={`${props.title} cover image`}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography
                        component="h2"
                        variant="h5"
                        sx={{
                            color: "primary.main",
                        }}
                    >
                        <Box className={Styles.partTitle}>{props.title}</Box>
                    </Typography>
                    <Box className={Styles.loglineHolder} onClick={toggleScroll}>
                        <Typography
                            className={Styles.partLoglineContainer}
                            variant="subtitle1"
                            component="h3"
                            sx={{
                                overflow: shouldAllowScroll ? "auto" : "hidden",
                            }}
                        >
                            <Box className={Styles.partLogline}>{props.logline}</Box>
                        </Typography>
                        <Box
                            className={Styles.loglineOverlay}
                            sx={{
                                display: shouldShowOverlay ? "inherit" : "none",
                            }}
                        ></Box>
                    </Box>
                </CardContent>
                {props.isPatreonOnly ? (
                    <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                        <Link href={"/patreon"}>
                            <Button
                                className={Styles.readButton}
                                variant="contained"
                                startIcon={<Loyalty />}
                            >
                                Read On Patreon
                            </Button>
                        </Link>
                    </Box>
                ) : (
                    props.slug && (
                        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                            <Link
                                href={{
                                    pathname: NORMAL_PART_PATH,
                                    query: props.slug,
                                }}
                            >
                                <Button
                                    className={Styles.readButton}
                                    variant="contained"
                                    startIcon={<Book />}
                                >
                                    Read Now
                                </Button>
                            </Link>
                        </Box>
                    )
                )}
            </Box>
        </Card>
    );
}
