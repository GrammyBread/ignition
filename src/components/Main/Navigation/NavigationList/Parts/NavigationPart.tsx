import * as React from 'react';
import NavigationChapterItem from './NavigationChapter';
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
import { useRouter } from 'next/router';
import { NavigationPart, PublishStatus } from '../../../../../interfaces/read/nav-data.interfaces';
import { NORMAL_PART_PATH } from '../../../../../mappers/pathname.mapper';


export default function NavigationPartItem(props: NavigationPart) {
  const [partOpen, setPartOpen] = React.useState(false);
  const router = useRouter()
  const [partClickTime, setPartClickTime] = React.useState(Date.now() - 1000);
  const isAvailable = props.status != PublishStatus.Unpublished;
  const isPatreon = props.status === PublishStatus.PatreonOnly;

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    const dif = Date.now() - partClickTime;
    console.log(dif);
    if (dif < 500 && (isAvailable && props.slug)) {
      router.push(isPatreon ? "/patreon" : {
        pathname: NORMAL_PART_PATH,
        query: props.slug
      });
    }
    else {
      setPartOpen(!partOpen);
      setPartClickTime(Date.now())
    }
    event.stopPropagation();
  };

  return (
    <>
      <ListItemButton disabled={!isAvailable} onClick={handleClick} sx={{ pl: 5 }}>
        <ListItemText primary={props.shortTitle} sx={{ color: isPatreon ? 'warning.main' : 'inherit' }} />
        {isAvailable && (partOpen ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {isAvailable && <Collapse in={partOpen} timeout="auto" unmountOnExit>
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