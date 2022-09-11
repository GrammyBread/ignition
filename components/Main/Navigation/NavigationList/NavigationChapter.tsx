import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import NavigationSectionItem from './NavigationSection';
import { Chapter } from '../../../../interfaces/read/view-data.interfaces';
import { ItemStatus } from '../../../../mappers/availability/state.mappers';
import { useRouter } from 'next/router';

export default function NavigationChapterItem(props: Chapter) {
  const router = useRouter();
  const [openChapter, setChapterOpen] = React.useState(false); 
  const [chapterClickTime, setChapterClickTime] = React.useState(Date.now() - 1000);

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
      const dif = Date.now() - chapterClickTime;
      console.log(dif);
      if(dif < 500 && props.itemSlug)
      {
          router.push(props.itemSlug);
      }
      else
      {
          setChapterOpen(!openChapter);
          setChapterClickTime(Date.now())
      }
      event.stopPropagation();
  };

  let isChapterReadable = props.publishStatus != ItemStatus.PatreonOnly && props.publishStatus != ItemStatus.Unpublished;

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ pl: 10 }}>
        <ListItemText primary={props.header} sx={{ color: !isChapterReadable ? 'text.disabled' : 'inherit' }}/>
        {isChapterReadable && (openChapter ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {isChapterReadable && <Collapse in={openChapter} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.sections && props.sections.map((section) => (
            <div key={section.key}>
              <NavigationSectionItem {...section}></NavigationSectionItem>
            </div>
          ))}
        </List>
      </Collapse>}
    </>
  )
};