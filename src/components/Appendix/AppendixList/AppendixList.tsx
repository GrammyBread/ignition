import { Box, Stack, useTheme } from "@mui/material";
import * as React from "react";
import Styles from "./AppendixList.module.scss";
import { AppendixItem as AppendixPiece, SpecialAppendixItem } from '../../../interfaces/appendices/home.interface';
import { Resource } from "../../../interfaces/read/read-metadata.interfaces";
import { AppendixItem } from "./AppendixListItem";
import classNames from "classnames";
import { PublicBackground } from "../../../../public/backgroundImage";

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

export default function AppendixList({
    CharacterProps,
    StationProps,
    Documents,
    changeBackground,
}: AppendixListProps): JSX.Element {
    const theme = useTheme();
    
    React.useEffect( () => {
        changeBackground(PublicBackground);
    },[]);

    return (
        <Box
            className={classNames(Styles.listHolder, Styles.prettyScroll)}
            sx={{
                a: {
                    color: theme.palette.text.primary,
                    textDecoration: "none"
                },
            }}
        >
            <Stack
                component="div"
                direction="row"
                className={Styles.appendixList}
                spacing={0}
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
            </Stack>
        </Box>
    );
}
