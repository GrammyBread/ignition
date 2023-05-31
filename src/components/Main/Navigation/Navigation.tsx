import * as React from "react";
import Styles from "./Navigation.module.scss";
import Image from "next/image";
import {
    Slide,
    Toolbar,
    Backdrop,
    Button,
    Box,
    CssBaseline,
} from "@mui/material";
import NavigationList from "./NavigationList/NavigationList";
import { NavigationListProps } from "./NavigationList/NavigationList";
import { Circle } from "../../TableOfContents/helper";
import { AppBar, ImageContainer } from "./NavigationHelper";
import { NavigationLeft } from "./NavigationLeft";
import { NavigationRight } from "./NavigationRight";
import { useTheme } from "@mui/material";
import { NavigationContext } from "../../../../pages/_app";
import { NavigationBackgroundColor } from "../../../styles/additional-colors";
import { NavigationSection } from "../../../interfaces/read/nav-data.interfaces";


export interface NavigationProps {
    drawerWidth: number;
    openDrawer: () => void;
    closeDrawer: () => void;
    open: boolean;
    nextScript?: NavigationSection;
    previousScript?: NavigationSection;
}

export function Navigation({
    drawerWidth,
    openDrawer,
    closeDrawer,
    open,
    nextScript,
    previousScript,
}: NavigationProps) {
    const [leftDirection, setDirection] = React.useState(false);
    const containerRef = React.useRef(null);
    const theme = useTheme();

    React.useEffect(() => {
        setDirection(Math.floor(Math.random() * 2) + 1 == 2 ? true : false);
    }, [open]);

    const navListProps = {
        drawerWidth: drawerWidth,
        open: open,
        closeDrawer: closeDrawer,
    } as NavigationListProps;


    return <NavigationContext.Consumer>
        {(value) => (
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    open={open}
                    drawerWidth={drawerWidth}
                    sx={{
                        backgroundColor: NavigationBackgroundColor(theme),
                    }}
                >
                    <Toolbar
                        ref={containerRef}
                        sx={{
                            backgroundColor: NavigationBackgroundColor(theme),
                            borderBottom: ".5rem solid",
                            borderColor:
                                theme.palette.mode === "dark" ? "background.paper" : "#bdbdbd",
                            width: "100%",
                        }}
                    >
                        <Slide
                            in={!open}
                            direction="left"
                            container={containerRef.current}
                            unmountOnExit
                        >
                            <Box className={Styles.navbar}>
                                <NavigationLeft script={previousScript} />
                                <Box className={Styles.logoContainer}>
                                    <Circle
                                        className={Styles.logoCircle}
                                        {...{ backingColor: NavigationBackgroundColor(theme) }}
                                    >
                                        <Button className={Styles.logoButton} onClick={openDrawer}>
                                            <Image
                                                priority={true}
                                                alt="Site Logo"
                                                src="/assets/Only1Logo.svg"
                                                fill
                                                sizes="20vw"
                                            />
                                        </Button>
                                    </Circle>
                                </Box>
                                <NavigationRight script={nextScript} />
                            </Box>
                        </Slide>
                    </Toolbar>
                </AppBar>
                <Backdrop
                    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <NavigationList {...navListProps}></NavigationList>
                    <ImageContainer drawerWidth={drawerWidth}>
                        {value?.logoUrl && (
                            <Image
                                src={
                                    drawerWidth >= 500
                                        ? value.logoUrl.url
                                        : value.logoUrl.imgix_url
                                }
                                alt=""
                                fill
                                style={{
                                    objectFit: "cover",
                                    objectPosition: leftDirection ? "top left" : "top right",
                                }}
                            />
                        )}
                    </ImageContainer>
                </Backdrop>
            </Box>
        )}
    </NavigationContext.Consumer>;
}
