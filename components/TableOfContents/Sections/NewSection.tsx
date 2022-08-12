import * as React from 'react';
import { SectionAvailability } from '../../../interfaces/view-data.interfaces';
import { Badge, ListItem } from '@mui/material';
import Styles from './TOCSections.module.scss';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import getLinkedTOCTitle from '../helper';

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

export const getNewSection = (availability: SectionAvailability, slug: string) => {
    return (
        <ListItem className={Styles.newSection}>
            <LightTooltip title="This is the newest section!">
                <Badge color="secondary" badgeContent="New">
                    {getLinkedTOCTitle(availability.publishStatus, availability.header, slug)}
                </Badge>
            </LightTooltip>
        </ListItem>
    );
};