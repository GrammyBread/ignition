import { Box, Typography } from "@mui/material";
import MainStyles from "../../../styles/shared.module.scss";

interface PartCardHeaderProps {
    title: string;
}

export const PartCardHeader = ({ title }: PartCardHeaderProps) => (
    <Typography
        component="h2"
        variant="h4"
        sx={{
            color: "primary.main"
        }} >
        <Box className={MainStyles.titles}>
            {title}
        </Box>
    </Typography>
)