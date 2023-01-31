import { Button, useTheme } from "@mui/material"
import { HomeButton } from "../../../../interfaces/static/home.interfaces"
import Link from "next/link";

export const LoreButton = (buttonInfo: HomeButton): JSX.Element => {
    const theme = useTheme();

    return <Link href={buttonInfo.url}>
        <Button
            color={"secondary"}
            size={"medium"}
            variant="contained"
            sx={{
                textDecoration: "none",
                color: theme.palette.secondary.contrastText
            }}>
            {buttonInfo.text}
        </Button>
    </Link>
}