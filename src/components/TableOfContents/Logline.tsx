import { Typography, useTheme } from "@mui/material";

interface Props {
    text: string;
}

export const TableOfContentsLogline = ({ text }: Props): JSX.Element => {
    const theme = useTheme();
    return <Typography
        variant="body1"
        component="div"
        dangerouslySetInnerHTML={{ __html: text }}
        sx={{
            fontVariant: "normal",
            margin: `0px ${theme.spacing(2)}`,
            "p": {
                marginTop: "0px",
                wordSpacing: "2px",
                whiteSpace: "break-spaces"
            }
        }} />
}