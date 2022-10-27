import { Fab } from "@mui/material";
import Link from "next/link";
import { NavigateNext, Instagram } from '@mui/icons-material';
import { RelatedScript } from "./Navigation";
import { INTRO_SECTION_PATH, NORMAL_SECTION_PATH } from "../../../mappers/pathname.mapper";

interface RelatedProps {
    script?: RelatedScript
}

export function NavigationRight({ script }: RelatedProps) {
    return script ?
        <Link href={{
            pathname: script.isIntro ?
                INTRO_SECTION_PATH
                :
                NORMAL_SECTION_PATH,
            query: script.params
        }}>
            Forward Section
            <Fab color="primary" aria-label="add" size="medium">
                <NavigateNext></NavigateNext>
            </Fab>
        </Link>
        :
        <Link href="https://www.instagram.com/thegrammybread/">
            <Fab color="primary" aria-label="add" size="medium">
                <Instagram></Instagram>
            </Fab>
        </Link>
}