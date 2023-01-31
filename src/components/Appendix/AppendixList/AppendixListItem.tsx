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
    id
}: AppendixItemProps) => {
    const ref = useRef(null);
    const [isInside, setIsInside] = useState(false);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["end end", "start start"],
    });

    useEffect(() => {
        if (setInside) {
            scrollYProgress.onChange((progress) => {
                const areWeInside = progress * 100 > 10 && progress * 100 < 20;
                if (isInside !== areWeInside) {
                    setInside(areWeInside, id);
                    setIsInside(areWeInside);
                }
            });
        }
    }, [scrollYProgress, id, setInside, isInside]);

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
                    ref={ref}
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
                    }}
                >
                    {header}
                </Typography>
            </Card>
        </Link>
    );
};
