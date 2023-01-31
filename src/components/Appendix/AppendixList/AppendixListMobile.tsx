import { Box, useMediaQuery, useTheme } from "@mui/material";
import * as React from "react";
import Styles from "./AppendixList.module.scss";
import { AppendixItem as AppendixPiece, SpecialAppendixItem } from '../../../interfaces/appendices/home.interface';
import { useState } from "react";
import { Resource } from "../../../interfaces/read/read-metadata.interfaces";
import { AppendixItem } from "./AppendixListItem";
import classNames from "classnames";

export interface SpecialItemProps {
    item: SpecialAppendixItem;
    url: string;
}

export interface AppendixListProps {
    CharacterProps: SpecialItemProps;
    StationProps: SpecialItemProps;
    Documents: AppendixPiece[];
    changeBackground: (newImage?: Resource) => {};
}

export default function AppendixListMobile({
    CharacterProps,
    StationProps,
    Documents,
    changeBackground,
}: AppendixListProps): JSX.Element {
    const theme = useTheme();

    let imageStates = Documents.map((doc) => ({
        id: doc.document.slug,
        image: doc.image,
        state: false,
    }));
    imageStates.push({
        id: "c",
        image: CharacterProps.item.image,
        state: false,
    });
    imageStates.push({
        id: "s",
        image: StationProps.item.image,
        state: false,
    });

    const [childStates, setChildStates] = useState(imageStates);

    // The scroll listener
    React.useEffect(() => {
        const insideOfChild = childStates.find((child) => child.state == true);
        if (insideOfChild) {
            changeBackground(insideOfChild.image);
        }
    }, [childStates, changeBackground]);

    const changeChildState = (state: boolean, id: string) => {
        let hasChangeHappened = false;
        let newStates = childStates.map((child) => {
            if (child.id === id && child.state != state) {
                hasChangeHappened = true;
                return {
                    id: child.id,
                    image: child.image,
                    state,
                };
            } else {
                return child;
            }
        });
        if (hasChangeHappened) {
            setChildStates(newStates);
        }
    };

    return (
        <Box
            className={classNames(Styles.listHolderMobile, Styles.prettyScroll)}
            sx={{
                a: {
                    color: theme.palette.text.primary,
                    textDecoration: "none"
                },
            }}
        >
            <AppendixItem
                setInside={changeChildState}
                id="c"
                header={CharacterProps.item.header}
                imageUrl={CharacterProps.item.image.imgix_url}
                url={CharacterProps.url}
            />
            {Documents.map((item) => {
                return (
                    <AppendixItem
                        setInside={changeChildState}
                        id={item.document.slug}
                        key={item.document.slug}
                        slug={item.document.slug}
                        header={item.header}
                        imageUrl={item.image.imgix_url}
                    />
                );
            })}
            <AppendixItem
                setInside={changeChildState}
                id="s"
                header={StationProps.item.header}
                imageUrl={StationProps.item.image.imgix_url}
                url={StationProps.url}
            />
        </Box>
    );
}
