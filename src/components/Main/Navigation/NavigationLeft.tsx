import { Fab } from "@mui/material";
import Link from "next/link";
import { NavigateBefore, Twitter } from '@mui/icons-material';
import { RelatedScript } from "./Navigation";
import { INTRO_SECTION_PATH, NORMAL_SECTION_PATH } from "../../../mappers/pathname.mapper";

interface RelatedProps {
    script?: RelatedScript
}

export function NavigationLeft({script}: RelatedProps) {

    return script ?
        <Link href={{
            pathname: script.isIntro ?
                INTRO_SECTION_PATH
                :
                NORMAL_SECTION_PATH,
            query: script.params
        }}>
            <Fab color="primary" aria-label="add" size="medium">
                <NavigateBefore></NavigateBefore>
            </Fab>
            Previous Section
        </Link>
        :
        <Link href="https://twitter.com/TheGrammyBread">
            <Fab color="primary" aria-label="add" size="medium">
                <Twitter></Twitter>
            </Fab>
        </Link>
}