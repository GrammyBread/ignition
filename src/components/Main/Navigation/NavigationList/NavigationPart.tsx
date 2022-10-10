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
import { NavPart } from '../../../../interfaces/read/nav-data.interfaces';


export default function NavigationPartItem(props: NavPart) {
  const [partOpen, setPartOpen] = React.useState(false);
  const router = useRouter()
  const [partClickTime, setPartClickTime] = React.useState(Date.now() - 1000);

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    const dif = Date.now() - partClickTime;
    console.log(dif);
    if (dif < 500 && (props.isPatreonOnly || props.slug)) {
      router.push(props.isPatreonOnly ? "/patreon" :
        {
          pathname: props.slug.pathname,
          query: props.slug.params
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
      <ListItemButton onClick={handleClick} sx={{ pl: 5 }}>
        <ListItemText primary={props.title} sx={{ color: props.isPatreonOnly ? 'warn.main' : 'inherit' }} />
        {!props.isPatreonOnly && (partOpen ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {!props.isPatreonOnly && <Collapse in={partOpen} timeout="auto" unmountOnExit>
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