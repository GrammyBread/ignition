import * as React from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
    Box,
    Collapse,
    List,
    ListItemButton,
    ListItemText,
    Typography
} from '@mui/material';
import { NavigationPart, PublishStatus } from '../../../../interfaces/read/nav-data.interfaces';
import NavigationChapterItem from '../../../Main/Navigation/NavigationList/Parts/NavigationChapter';

export const PartContents = (props: NavigationPart): JSX.Element => {
    const [partOpen, setPartOpen] = React.useState(false);
    const isPatreon = props.status === PublishStatus.PatreonOnly;
    const ContentHeader = <Typography >Part Contents</Typography>;

    return <Box>
        <ListItemButton sx={{ pl: 5 }} onClick={() => setPartOpen(!partOpen)}>
            <ListItemText primary={"Part Contents"} sx={{ color: isPatreon ? 'warning.main' : 'inherit' }} />
            {partOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={partOpen} timeout="auto" unmountOnExit>
            <List>
                {props.chapters && props.chapters.map((chapter) => (
                    <div key={chapter.key}>
                        <NavigationChapterItem {...chapter} />
                    </div>
                ))}
            </List>
        </Collapse>
    </Box>;
};