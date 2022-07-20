import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { NavigationLink } from './NavigationList';
import NavigationChapterItem, { NavChapterProps } from './NavigationChapter';

export interface NavPartProps {
  link: NavigationLink;
  chapters: NavChapterProps[];
}

export default function NavigationPartItem(props: NavPartProps) {
  const [partOpen, setPartOpen] = React.useState(false);

  const handleClick = () => {
    setPartOpen(!partOpen);
  };

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ pl: 5 }}>
        <ListItemText primary={props.link.title} />
        {partOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={partOpen} timeout="auto" unmountOnExit>
        <List>
          {props.chapters && props.chapters.map((chapter) => (
            <NavigationChapterItem key={chapter.link.slug} {...chapter}></NavigationChapterItem>
          ))}
        </List>
      </Collapse>
    </>
  )
};