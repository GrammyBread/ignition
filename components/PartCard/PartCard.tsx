import * as React from 'react';
import { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import Link from 'next/link';
import { Book } from '@mui/icons-material';
import { Image } from '../../interfaces/read-metadata.interfaces';
import Styles from './PartCard.module.scss';
import { Part } from '../../interfaces/view-data.interfaces';
import { ItemStatus } from '../../mappers/availability/state.mappers';

export interface PartCardProps {
    data: Part;
    partImage: Image;
    logline: string;
}

export default function PartCard(props: PartCardProps): JSX.Element {
    const [shouldShowOverlay, setShowOverlay] = useState(true);
    const [shouldAllowScroll, setShouldAllowScroll] = useState(false);

    const toggleScroll = (): void => {
        setShowOverlay(!shouldShowOverlay);
        setShouldAllowScroll(!shouldAllowScroll);
    }

    const shouldShowLink = props.data.publishStatus != ItemStatus.Unpublished && props.data.itemSlug != undefined;

    const card = (
        <Card sx={{
            display: 'flex',
            marginTop: '.5rem',
            backgroundColor: 'background.default',
            color: 'text.secondary'
        }}>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={props.partImage.url}
                alt={`${props.data.header} cover image`}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5" sx={{
                        color: 'primary.main'
                    }}>
                        <Box className={Styles.partTitle}>
                            {props.data.header}
                        </Box>
                    </Typography>
                    <Box className={Styles.loglineHolder} onClick={toggleScroll}>
                        <Typography className={Styles.partLoglineContainer} variant="subtitle1" component="div" sx={{
                            overflow: shouldAllowScroll ? 'auto' : 'hidden'
                        }}>
                            <Box className={Styles.partLogline}>
                                {props.logline}
                            </Box>
                        </Typography>
                        <Box className={Styles.loglineOverlay} sx={{
                            display: shouldShowOverlay ? 'inherit' : 'none'
                        }}
                        ></Box>
                    </Box>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <Book></Book>
                    <Typography variant="subtitle1" component="div">
                        Read Now
                    </Typography>
                </Box>
            </Box>
        </Card>
    );

    return shouldShowLink ?
        // @ts-ignore
        //Should show link check should solve null ref here
        <Link href={props.data.itemSlug}>
            {card}
        </Link>
        :
        card;
}
