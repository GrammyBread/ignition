import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import NavigationSectionItem from './NavigationSection';
import { useRouter } from 'next/router';
import { NavigationChapter, PublishStatus } from '../../../../../interfaces/read/nav-data.interfaces';
import { NORMAL_CHAPTER_PATH } from '../../../../../mappers/pathname.mapper';

export default function NavigationChapterItem(props: NavigationChapter) {
  const router = useRouter();
  const [openChapter, setChapterOpen] = React.useState(false);
  const [chapterClickTime, setChapterClickTime] = React.useState(Date.now() - 1000);
  const isPatreon = props.status === PublishStatus.PatreonOnly;
  const isAvailable = props.status != PublishStatus.Unpublished;

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    const dif = Date.now() - chapterClickTime;
    console.log(dif);
    if (dif < 500 && (isAvailable && props.slug)) {
      router.push(isPatreon ? "/patreon" : {
        pathname: NORMAL_CHAPTER_PATH,
        query: props.slug
      });
    }
    else {
      setChapterOpen(!openChapter);
      setChapterClickTime(Date.now())
    }
    event.stopPropagation();
  };

  return (
    <>
      <ListItemButton disabled={!isAvailable} onClick={handleClick} sx={{ pl: 10 }}>
        <ListItemText primary={props.shortTitle} sx={{ color: isPatreon ? 'warning.main' : 'inherit' }} />
        {isAvailable && (openChapter ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {isAvailable && <Collapse in={openChapter} timeout="auto" unmountOnExit>
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