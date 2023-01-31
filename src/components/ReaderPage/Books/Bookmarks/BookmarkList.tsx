import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavItem } from "epubjs";

export interface BookmarkListProps {
  setLocation: (elementID: string) => void;
  locations?: NavItem[];
}

export function BookmarkList(props: BookmarkListProps): JSX.Element {
  const makeListItem = (location: NavItem, itemPadding: number) => {
    const idParts = location.id.split("#");

    return idParts.length == 2 ? (
      <ListItemButton
        onClick={() => props.setLocation(idParts[1])}
        aria-label={location.label}
        sx={{ pl: itemPadding }}
      >
        <ListItemText primary={location.label} />
      </ListItemButton>
    ) : (
      <ListItemButton sx={{ pl: itemPadding }} disabled>
        <ListItemText primary={location.label} />
      </ListItemButton>
    );
  };

  return props.locations && props.locations.length > 0 ? (
    <>
      {props.locations.map((location) => {
        let itemPadding = 2;
        return (
          <div key={location.id}>
            <ListItem disablePadding>
              {makeListItem(location, itemPadding)}
            </ListItem>
            {location.subitems && (
              <List>
                {location.subitems?.map((subLocation) => {
                  const newPadding = itemPadding + 2;
                  return (
                    <ListItem key={subLocation.id} disablePadding>
                      {makeListItem(subLocation, newPadding)}
                    </ListItem>
                  );
                })}
              </List>
            )}
          </div>
        );
      })}
    </>
  ) : (
    <Typography fontWeight={700} textAlign={"center"}>
      Oh, No!
      <br />
      The bookmarks have been stolen!
      <br />
      😨
      <br />
      Get back here you scamp!
    </Typography>
  );
}
