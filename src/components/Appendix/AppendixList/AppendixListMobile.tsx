import { Box, useTheme } from "@mui/material";
import * as React from "react";
import Styles from "./AppendixList.module.scss";
import { AppendixItem as AppendixPiece, SpecialAppendixItem } from '../../../interfaces/appendices/home.interface';
import { useRef } from 'react';
import { Resource } from "../../../interfaces/read/read-metadata.interfaces";
import { AppendixItem } from "./AppendixListItem";
import classNames from "classnames";
import { useScroll } from 'framer-motion';

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

interface ListItems {
    id: string;
    image: Resource;
}

export default function AppendixListMobile({
    CharacterProps,
    StationProps,
    Documents,
    changeBackground,
}: AppendixListProps): JSX.Element {
    const theme = useTheme();
    const appendixListHolder = useRef(null);
    const { scrollYProgress } = useScroll({
        container: appendixListHolder
    });

    let imageStates = new Array<ListItems>();
    imageStates.push({
        id: "c",
        image: CharacterProps.item.image,
    });
    imageStates = imageStates.concat(Documents.map((doc) => ({
        id: doc.document.slug,
        image: doc.image,
    })));
    imageStates.push({
        id: "s",
        image: StationProps.item.image,
    });

    const percentagePerChild = 100 / imageStates.length;
    
    // The scroll listener
    React.useEffect(() => {
        scrollYProgress.onChange((scrollPos) => {
            const scrollPercentage = Math.ceil(scrollPos * 100)
            if(scrollPercentage > 0 && scrollPercentage < 100){
                const newImageIndex = Math.floor(scrollPercentage / percentagePerChild);
                //console.log(`${scrollPercentage} / ${percentagePerChild} | ${newImageIndex}`);
                changeBackground(imageStates[newImageIndex].image)
            }
        })
    }, [imageStates, percentagePerChild, changeBackground, scrollYProgress]);

    return (
        <Box
            ref={appendixListHolder}
            component={"div"}
            className={classNames(Styles.listHolderMobile, Styles.prettyScroll)}
            sx={{
                a: {
                    color: theme.palette.text.primary,
                    textDecoration: "none"
                },
            }}
        >
            <AppendixItem
                id="c"
                header={CharacterProps.item.header}
                imageUrl={CharacterProps.item.image.imgix_url}
                url={CharacterProps.url}
            />
            {Documents.map((item) => {
                return (
                    <AppendixItem
                        id={item.document.slug}
                        key={item.document.slug}
                        slug={item.document.slug}
                        header={item.header}
                        imageUrl={item.image.imgix_url}
                    />
                );
            })}
            <AppendixItem
                id="s"
                header={StationProps.item.header}
                imageUrl={StationProps.item.image.imgix_url}
                url={StationProps.url}
            />
        </Box>
    );
}
