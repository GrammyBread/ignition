import { Button, useTheme } from "@mui/material"
import { HomeButton } from "../../../../interfaces/static/home.interfaces"
import Link from "next/link";

export const ReadButton = (buttonInfo: HomeButton): JSX.Element => {
    const theme = useTheme();

    return <Link href={buttonInfo.url}>
        <Button
            color={"primary"}
            size={"large"}
            variant="contained"
            sx={{
                textDecoration: "none",
                color: theme.palette.primary.contrastText,
                fontSize: "1.5rem"
            }}>
            {buttonInfo.text}
        </Button>
    </Link>
}