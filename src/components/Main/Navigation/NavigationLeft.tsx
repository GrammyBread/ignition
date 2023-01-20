import { Fab } from "@mui/material";
import Link from "next/link";
import { NavigateBefore, Twitter } from "@mui/icons-material";
import {
    INTRO_SECTION_PATH,
    NORMAL_SECTION_PATH,
} from "../../../mappers/pathname.mapper";
import { NavigationScript } from "../../../mappers/availability/nav-script.mappers";

interface NavigationWingProps {
    script: NavigationScript | undefined;
}

export function NavigationLeft({ script }: NavigationWingProps) {
    return script ? (
        <Link
            href={{
                pathname: script.isHead ? INTRO_SECTION_PATH : NORMAL_SECTION_PATH,
                query: script.section.fullPath,
            }}
        >
            <Fab color="primary" aria-label="add" size="medium">
                <NavigateBefore></NavigateBefore>
            </Fab>
            Previous Section
        </Link>
    ) : (
        <Link href="https://twitter.com/TheGrammyBread">
            <Fab color="primary" aria-label="add" size="medium">
                <Twitter></Twitter>
            </Fab>
        </Link>
    );
}
