import * as React from 'react';
import NavigationChapterItem from './NavigationChapter';
import { Part } from '../../../../interfaces/view-data.interfaces';
import {
    ExpandLess,
    ExpandMore,
} from '@mui/icons-material';
import {
    Collapse,
    List,
    ListItemButton,
    ListItemText
} from '@mui/material';


export default function NavigationPartItem(props: Part) {
  const [partOpen, setPartOpen] = React.useState(false);

  const handleClick = () => {
    setPartOpen(!partOpen);
  };

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ pl: 5 }}>
        <ListItemText primary={props.header} />
        {partOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={partOpen} timeout="auto" unmountOnExit>
        <List>
          {props.chapters && props.chapters.map((chapter) => (
            <div key={chapter.key}>
              <NavigationChapterItem {...chapter}></NavigationChapterItem>
            </div>
          ))}
        </List>
      </Collapse>
    </>
  )
};