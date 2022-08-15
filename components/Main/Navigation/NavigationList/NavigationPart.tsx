import * as React from 'react';
import NavigationChapterItem from './NavigationChapter';
import { Part } from '../../../../interfaces/read/view-data.interfaces';
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
import { ItemStatus } from '../../../../mappers/availability/state.mappers';


export default function NavigationPartItem(props: Part) {
  const [partOpen, setPartOpen] = React.useState(false);

  const handleClick = () => {
    setPartOpen(!partOpen);
  };

  let isPartReadable = props.publishStatus != ItemStatus.PatreonOnly && props.publishStatus != ItemStatus.Unpublished;

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ pl: 5 }}>
        <ListItemText primary={props.header} sx={{ color: !isPartReadable ? 'text.disabled' : 'inherit' }}/>
        {isPartReadable && (partOpen ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {isPartReadable && <Collapse in={partOpen} timeout="auto" unmountOnExit>
        <List>
          {props.chapters && props.chapters.map((chapter) => (
            <div key={chapter.key}>
              <NavigationChapterItem {...chapter}></NavigationChapterItem>
            </div>
          ))}
        </List>
      </Collapse>}
    </>
  )
};