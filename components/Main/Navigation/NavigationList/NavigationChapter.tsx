import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import NavigationSectionItem from './NavigationSection';
import { Chapter } from '../../../../interfaces/view-data.interfaces';

export default function NavigationChapterItem(props: Chapter) {
  const [openChapter, setChapterOpen] = React.useState(false);

  const handleClick = () => {
    setChapterOpen(!openChapter);
  };

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ pl: 10 }}>
        <ListItemText primary={props.header} />
        {openChapter ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openChapter} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.sections && props.sections.map((section) => (
            <div key={section.key}>
              <NavigationSectionItem {...section}></NavigationSectionItem>
            </div>
          ))}
        </List>
      </Collapse>
    </>
  )
};