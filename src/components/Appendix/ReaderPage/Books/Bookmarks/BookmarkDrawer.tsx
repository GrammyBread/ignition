import {
  Box,
  List
} from "@mui/material";
import { NavItem } from "epubjs";
import { BookmarkList } from "./BookmarkList";

export interface BookmarkDrawerProps {
  closeDrawer: () => void;
  setLocation: (elementID: string) => void;
  locations?: NavItem[];
}

export default function BookmarkDrawer(
  props: BookmarkDrawerProps
): JSX.Element {
  return (
    <Box
      component="div"
      sx={{
        width: "100%",
      }}
      onClick={() => props.closeDrawer()}
      onKeyDown={() => props.closeDrawer()}
    >
      <List>
        <BookmarkList {...props} />
      </List>
    </Box>
  );
}
