import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import NavigationPartItem from "./NavigationPart";
import {
    ChevronLeft,
    DarkMode,
    ExpandLess,
    HomeOutlined,
    LightMode,
    MenuBook,
} from "@mui/icons-material";
import {
    Collapse,
    Drawer,
    List,
    Typography,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Button,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { ExpandMore } from "@mui/icons-material";
import { NavigationContext, ThemeModeContext } from "../../../../../pages/_app";

export interface NavigationListProps {
    drawerWidth: number;
    open: boolean;
    closeDrawer: () => {};
}

const DrawerSection = styled(List)(({ theme }) => ({
    color: theme.palette.text.secondary,
    flex: "2",
    "& .MuiSvgIcon-root": {
        color: theme.palette.mode === "dark" ? "white" : "black",
    },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    backgroundColor:
        theme.palette.mode === "dark"
            ? theme.palette.primary.main
            : theme.palette.secondary.main,
    padding: theme.spacing(3, 1),
    flex: "1",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    color:
        theme.palette.mode === "dark"
            ? theme.palette.primary.contrastText
            : theme.palette.secondary.contrastText,
}));

const DrawerFooter = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    flex: "1",
    backgroundColor:
        theme.palette.mode === "dark"
            ? theme.palette.primary.main
            : theme.palette.secondary.main,
    padding: theme.spacing(1, 1),
    position: "sticky",
    bottom: "0",
    width: "100%",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    color:
        theme.palette.mode === "dark"
            ? theme.palette.primary.contrastText
            : theme.palette.secondary.contrastText,
}));

export default function NavigationList(props: NavigationListProps) {
    const router = useRouter();
    const [readOpen, setReadOpen] = React.useState(false);
    const [lastClickTime, setLastClickTime] = React.useState(Date.now() - 1000);
    const themeToggler = React.useContext(ThemeModeContext);
    const theme = useTheme();

    function handleClick(event: React.MouseEvent<HTMLDivElement>) {
        const dif = Date.now() - lastClickTime;
        if (dif < 500) {
            router.push("/read");
        } else {
            setReadOpen(!readOpen);
            setLastClickTime(Date.now());
        }
        event.stopPropagation();
    }

    function handleThemeClick() {
        themeToggler.toggleThemeMode();
    }

    return <NavigationContext.Consumer>
        {(value) => (
            <Drawer
                sx={{
                    width: props.drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: props.drawerWidth,
                        boxSizing: "border-box",
                    },
                    "& a": {
                        textDecoration: "none",
                        color: "text.primary",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={props.open}
            >
                <DrawerHeader>
                    <Typography variant="h5" component={"h3"} sx={{ textAlign: "left" }}>
                        Only One Way To Burn It Down
                    </Typography>
                    <ChevronLeft onClick={props.closeDrawer}></ChevronLeft>
                </DrawerHeader>
                <Divider />
                <DrawerSection
                    sx={{
                        color: "text.secondary",
                    }}
                >
                    <ListItemButton onClick={handleClick}>
                        <ListItemText primary={"Read"} />
                        {readOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={readOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {value?.data &&
                                value.data.map((part) => (
                                    <div key={part.key}>
                                        <NavigationPartItem {...part}></NavigationPartItem>
                                    </div>
                                ))}
                        </List>
                    </Collapse>
                </DrawerSection>
                <Divider />
                <DrawerSection>
                    <List>
                        <ListItem key={"Home"}>
                            <Link href="/">
                                <ListItemButton>
                                    <ListItemIcon>
                                        <HomeOutlined></HomeOutlined>
                                    </ListItemIcon>
                                    <ListItemText primary="Home" />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem key={"Lore"}>
                            <Link href="/appendices">
                                <ListItemButton>
                                    <ListItemIcon>
                                        <MenuBook></MenuBook>
                                    </ListItemIcon>
                                    <ListItemText primary="Lore" />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    </List>
                </DrawerSection>
                <DrawerFooter>
                    <Button
                        variant="contained"
                        onClick={handleThemeClick}
                        color="warning"
                        size="large"
                        endIcon={theme.palette.mode == "dark" ? <LightMode /> : <DarkMode />}
                        sx={{
                            backgroundColor: theme.palette.mode == "dark" ? "white" : "black",
                            color: theme.palette.mode == "dark" ? "black" : "white",
                        }}
                    >
                        {theme.palette.mode == "dark" ? "Light Mode" : "Dark Mode"}
                    </Button>
                </DrawerFooter>
            </Drawer>)}
    </NavigationContext.Consumer>;
}
