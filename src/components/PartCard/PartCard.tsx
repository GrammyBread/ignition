import * as React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { ParsedUrlQuery } from "querystring";
import MobilePartCard from "./pieces/MobilePartCard";
import DesktopPartCard from "./pieces/DesktopPartCard";
import { NavigationPart } from "../../interfaces/read/nav-data.interfaces";

export interface PartCardProps {
    slug?: ParsedUrlQuery;
    title: string;
    key: number;
    imageUrl: string;
    logline: string;
    isPatreonOnly: boolean;
    navigationDetails?: NavigationPart;
}

export default function PartCard(props: PartCardProps): JSX.Element {
    const isMobile = useMediaQuery("(max-width: 740px)");

    return isMobile ? <MobilePartCard {...props} /> : <DesktopPartCard {...props} />;
}
