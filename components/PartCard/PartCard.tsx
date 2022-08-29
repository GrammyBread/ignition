import * as React from 'react';
import { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import Link from 'next/link';
import { Book } from '@mui/icons-material';
import { Resource } from '../../interfaces/read/read-metadata.interfaces';
import Styles from './PartCard.module.scss';
import { Part } from '../../interfaces/read/view-data.interfaces';
import { ItemStatus } from '../../mappers/availability/state.mappers';

export interface PartCardProps {
    data: Part;
    partImage: Resource;
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

    return (
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
                    <Typography component="h2" variant="h5" sx={{
                        color: 'primary.main'
                    }}>
                        <Box className={Styles.partTitle}>
                            {props.data.header}
                        </Box>
                    </Typography>
                    <Box className={Styles.loglineHolder} onClick={toggleScroll}>
                        <Typography className={Styles.partLoglineContainer} variant="subtitle1" component="h3" sx={{
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
                {
                    (props.data.itemSlug != '' && shouldShowLink)
                    &&
                    <Link href={props.data.itemSlug ?? '/read'}>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                            <Book></Book>
                            <Typography variant="subtitle1">
                                Read Now
                            </Typography>
                        </Box>
                    </Link>
                }
            </Box>
        </Card>
    );
}
