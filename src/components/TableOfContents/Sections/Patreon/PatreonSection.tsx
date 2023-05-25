import * as React from 'react';
import { Badge, ListItem } from '@mui/material';
import Styles from './patreon-section.module.scss';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { NavigationItem } from '../../../../interfaces/read/nav-data.interfaces';
import { AnimatedLink } from '../../helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPatreon } from '@fortawesome/free-brands-svg-icons';

const PatreonTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} placement="right" />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.contrastText,
        maxWidth: 125,
        fontSize: theme.typography.pxToRem(12),
    },
}));

export const PatreonSection = (section: NavigationItem): JSX.Element => {
    let tooltip =
        <React.Fragment>
            <Typography variant="overline">This is Patreon Only</Typography>
            <br/>
            <Typography variant="caption">You can read this section by subscribing on Patreon</Typography>
        </React.Fragment>;

    return (
        <ListItem className={Styles.patreonOnlySection}>
            <PatreonTooltip title={
                tooltip
            }>
                <Badge color="primary" badgeContent={<FontAwesomeIcon icon={faPatreon}/>}>
                    <AnimatedLink isPatreonOnly={true} href={'/patreon'}>
                        {section.title}
                    </AnimatedLink>
                </Badge>
            </PatreonTooltip>
        </ListItem>);
};