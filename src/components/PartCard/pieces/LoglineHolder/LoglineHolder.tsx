import { Box, Typography, useTheme } from "@mui/material";
import Styles from "./LoglineHolder.module.scss";
import SharedStyles from "../shared.module.scss";
import { useState } from 'react';
import classNames from "classnames";

interface LoglineHolderProps {
    logline: string;
}

export const LoglineHolder = ({ logline }: LoglineHolderProps) => {
    const theme = useTheme();
    const [shouldShowOverlay, setShowOverlay] = useState(true);
    const [shouldAllowScroll, setShouldAllowScroll] = useState(false);

    const toggleScroll = (): void => {
        setShowOverlay(!shouldShowOverlay);
        setShouldAllowScroll(!shouldAllowScroll);
    };

    return <Box className={Styles.loglineHolder} onClick={toggleScroll}>
        <Typography
            className={classNames(Styles.partLoglineContainer, SharedStyles.loglineTextBox)}
            variant="body1"
            component="div"
            sx={{
                overflow: shouldAllowScroll ? "auto" : "hidden",
                marginLeft: `${theme.spacing(3)}`,
                whiteSpace: "break-spaces",
                lineHeight: "inherit"
            }} >
            <div className={Styles.partLogline} dangerouslySetInnerHTML={{ __html: logline }} />
        </Typography>
        <Box className={Styles.loglineOverlay}
            sx={{
                display: shouldShowOverlay ? "inherit" : "none",
            }} />
    </Box>
}