import { Book, Loyalty } from "@mui/icons-material"
import { Box, Button } from "@mui/material"
import Link from "next/link"
import { NORMAL_PART_PATH } from "../../../../mappers/pathname.mapper"
import { ParsedUrlQuery } from "querystring";
import Styles from "./PartCardAction.module.scss";
import SharedStyles from "../shared.module.scss";

interface PartCardActionProps {
    isPatreonOnly: boolean;
    slug?: ParsedUrlQuery;
}

interface ActionButtonProps {
    text: string;
    href: any;
    icon: any;
}

const ActionButton = ({ href, icon, text }: ActionButtonProps): JSX.Element => (
    <Box 
    className={SharedStyles.actionBox}
    sx={{
        display: "flex",
        alignItems: "center",
        pl: 1,
        pb: 1
    }}>
        <Link href={href}>
            <Button className={Styles.readButton}
                variant="contained"
                startIcon={icon} >
                {text}
            </Button>
        </Link>
    </Box>
);

export const PartCardAction = ({ slug, isPatreonOnly }: PartCardActionProps) => {
    if (isPatreonOnly) {
        return <ActionButton text={"Read On Patreon"} href={"/patreon"} icon={<Loyalty />} />;
    }

    if (!slug) {
        return <></>;
    }

    return <ActionButton
        text={"Read Now"}
        href={{
            pathname: NORMAL_PART_PATH,
            query: slug,
        }}
        icon={<Book />} />;
}