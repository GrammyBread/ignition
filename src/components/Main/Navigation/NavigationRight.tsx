import { Fab } from "@mui/material";
import Link from "next/link";
import { NavigateNext, Instagram } from "@mui/icons-material";
import {
    INTRO_SECTION_PATH,
    NORMAL_SECTION_PATH,
} from "../../../mappers/pathname.mapper";
import { NavigationScript } from "../../../mappers/availability/nav-script.mappers";

interface NavigationWingProps {
    script: NavigationScript | undefined;
}

export function NavigationRight({ script }: NavigationWingProps) {
    return script ? (
        <Link
            href={{
                pathname: script.isHead ? INTRO_SECTION_PATH : NORMAL_SECTION_PATH,
                query: script.section.fullPath,
            }}
        >
            Forward Section
            <Fab color="primary" aria-label="add" size="medium">
                <NavigateNext></NavigateNext>
            </Fab>
        </Link>
    ) : (
        <Link href="https://www.instagram.com/thegrammybread/">
            <Fab color="primary" aria-label="add" size="medium">
                <Instagram></Instagram>
            </Fab>
        </Link>
    );
}
