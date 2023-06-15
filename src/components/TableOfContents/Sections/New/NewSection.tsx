import * as React from 'react';
import { Badge, ListItem, ListItemText } from '@mui/material';
import Styles from './new-section.module.scss';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { AnimatedLink, getLinkedSectionTitle } from '../../helper';
import { NORMAL_SECTION_PATH } from '../../../../mappers/pathname.mapper';
import { NavigationItem } from '../../../../interfaces/read/nav-data.interfaces';
import { ParsedUrlQuery } from 'querystring';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} placement="right" />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

export const NewSection = (section: NavigationItem): JSX.Element =>
(
    <ListItem className={Styles.newSection}>
        <LightTooltip title="This is the newest section!">
            <Badge color="secondary" badgeContent="New">
                {section.slug &&
                    <AnimatedLink href={{
                        query: section.slug as ParsedUrlQuery,
                        pathname: NORMAL_SECTION_PATH
                    }} >
                        {section.title}
                    </AnimatedLink>
                }
            </Badge>
        </LightTooltip>
    </ListItem>
);