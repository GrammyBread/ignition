import { Box, useTheme, Card, CardMedia, Typography } from "@mui/material";
import { useScroll } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Styles from "./AppendixList.module.scss";
import Link from "next/link";
import { Url } from "url";
import { ParsedUrlQuery } from "querystring";

interface AppendixItemProps {
    header: string;
    imageUrl: string;
    id: string;
    slug?: string;
    setInside?: (val: boolean, id: string) => void;
    url?: string;
}

export const AppendixItem = ({
    setInside,
    header,
    slug,
    url,
    imageUrl,
    id,
}: AppendixItemProps) => {

    return (
        <Link
            href={
                url != undefined
                    ? url
                    : {
                        pathname: "/appendices/[docslug]",
                        query: {
                            docslug: slug,
                        } as ParsedUrlQuery,
                    }
            }
        >
            <Card
                component="div"
                sx={{
                    height: "100%",
                    maxHeight: "100%",
                    width: "fit-content",
                    margin: "0",
                }}
                className={Styles.appendixListItem}
            >
                <CardMedia
                    component="img"
                    className={Styles.cardImage}
                    image={imageUrl}
                    alt={`${header} cover image`}
                />
                <Typography
                    gutterBottom
                    variant="h4"
                    component="h3"
                    textAlign="center"
                    sx={{
                        margin: "1rem 1rem",
                        whiteSpace: "nowrap"
                    }}
                >
                    {header}
                </Typography>
            </Card>
        </Link>
    );
};
