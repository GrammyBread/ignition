import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import { Badge, ListItem } from '@mui/material';
import Styles from './TOCSections.module.scss';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Section } from '../../../interfaces/read/view-data.interfaces';
import Link from 'next/link';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} placement="right" />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

export const getPatreonSection = (availability: Section): JSX.Element => {
    let tooltip =
        <React.Fragment>
            <Typography color="inherit">This Section is Patreon Only</Typography>
            <b>{'Want to keep reading?'}</b>
            <br />
            {"You can read this section by subscribing on Patreon"}
        </React.Fragment>;

    return (
        <ListItem className={Styles.patreonOnlySection}>
            <HtmlTooltip title={
                tooltip
            }>
                <Badge color="primary" badgeContent="Patreon Only">
                    <Link href="/patreon">
                        <ListItemText sx={{
                            color: "warning.main",
                            paddingTop: ".25rem",
                            paddingBottom: ".25rem"
                        }
                        } className={Styles.patreonOnlySection} primary={availability.header} />
                    </Link>
                </Badge>
            </HtmlTooltip>
        </ListItem>);
};