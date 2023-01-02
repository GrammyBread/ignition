import { Component } from "react";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import { NavItem } from "epubjs";

export interface LocationListProps {
    setLocation: (elementID: string) => void;
    locations?: NavItem[];
}

export class LocationList extends Component<LocationListProps> {
    setLocation: (elementID: string) => void;
    locations?: NavItem[];
    frame?: HTMLIFrameElement;

    constructor(props: LocationListProps) {
        super(props);
        this.setLocation = props.setLocation;
        this.locations = props.locations;
    }

    makeListItem(location: NavItem, itemPadding: number) {
        const idParts = location.id.split("#");

        return idParts.length == 2 ? (
            <ListItemButton
                onClick={() => this.setLocation(idParts[1])}
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
    }

    render(): JSX.Element {
        return this.locations && this.locations.length > 0 ? (
            <>
                {this.locations.map((location) => {
                    let itemPadding = 2;
                    return (
                        <div key={location.id}>
                            <ListItem disablePadding>
                                {this.makeListItem(location, itemPadding)}
                            </ListItem>
                            {location.subitems && (
                                <List>
                                    {location.subitems?.map((subLocation) => {
                                        const newPadding = itemPadding + 2;
                                        return (
                                            <ListItem key={subLocation.id} disablePadding>
                                                {this.makeListItem(subLocation, newPadding)}
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
}
