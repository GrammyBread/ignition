import * as React from 'react';
import { Badge, ListItem, ListItemText } from '@mui/material';
import Styles from './TOCSections.module.scss';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { getLinkedSectionTitle } from '../helper';
import { Section } from '../../../interfaces/read/view-data.interfaces';
import { NORMAL_SECTION_PATH } from '../../../mappers/pathname.mapper';

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

export const getNewSection = (availability: Section) => {
    return (
        <ListItem className={Styles.newSection}>
            <LightTooltip title="This is the newest section!">
                <Badge color="secondary" badgeContent="New">
                    {availability.fullPath ?
                        getLinkedSectionTitle(availability.publishStatus, availability.header, {
                            query: availability.fullPath,
                            pathname: NORMAL_SECTION_PATH
                        })
                        :
                        <ListItemText primary={availability.header} />
                    }
                </Badge>
            </LightTooltip>
        </ListItem>
    );
};