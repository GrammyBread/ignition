import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import NavigationSectionItem from './NavigationSection';
import { ItemStatus } from '../../../../mappers/availability/state.mappers';
import { useRouter } from 'next/router';
import { NavChapter } from '../../../../interfaces/read/nav-data.interfaces';

export default function NavigationChapterItem(props: NavChapter) {
  const router = useRouter();
  const [openChapter, setChapterOpen] = React.useState(false);
  const [chapterClickTime, setChapterClickTime] = React.useState(Date.now() - 1000);

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    const dif = Date.now() - chapterClickTime;
    console.log(dif);
    if (dif < 500 && (props.isPatreonOnly || props.slug)) {
      router.push(props.isPatreonOnly ? "/patreon" :
        {
          pathname: props.slug.pathname,
          query: props.slug.params
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
      <ListItemButton onClick={handleClick} sx={{ pl: 10 }}>
        <ListItemText primary={props.title} sx={{ color: props.isPatreonOnly ? 'warning.main' : 'inherit' }} />
        {!props.isPatreonOnly && (openChapter ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {!props.isPatreonOnly && <Collapse in={openChapter} timeout="auto" unmountOnExit>
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