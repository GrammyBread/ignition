import {
  Box,
  List
} from "@mui/material";
import { NavItem } from "epubjs";
import { LocationList } from "./LocationList";

export interface LocationDrawerProps {
  closeDrawer: () => void;
  setLocation: (elementID: string) => void;
  locations?: NavItem[];
}

export default function LocationDrawer(
  props: LocationDrawerProps
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
        <LocationList {...props} />
      </List>
    </Box>
  );
}
