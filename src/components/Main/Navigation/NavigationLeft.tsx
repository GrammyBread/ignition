import { Fab } from "@mui/material";
import Link from "next/link";
import { NavigateBefore, Twitter } from "@mui/icons-material";
import {
    INTRO_SECTION_PATH,
    NORMAL_SECTION_PATH,
} from "../../../mappers/pathname.mapper";
import { NavigationSection } from "../../../interfaces/read/nav-data.interfaces";

interface NavigationWingProps {
    script: NavigationSection | undefined;
}

export function NavigationLeft({ script: section }: NavigationWingProps) {
    return section ? (
        <Link
            href={{
                pathname: section.isHead ? INTRO_SECTION_PATH : NORMAL_SECTION_PATH,
                query: section.slug,
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
