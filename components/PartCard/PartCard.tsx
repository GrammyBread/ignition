import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Book } from '@mui/icons-material';
import { Part } from '../../interfaces/read-metadata.interfaces';
import Styles from './PartCard.module.scss';

export default function PartCard(props: Part) {
    const url = props.metadata?.part_image?.url;
    const [shouldShowOverlay, setShowOverlay] = useState(true);
    const [shouldAllowScroll, setShouldAllowScroll] = useState(false);

    const toggleScroll = ():void => {
        setShowOverlay(!shouldShowOverlay);
        setShouldAllowScroll(!shouldAllowScroll);
    }


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
                image={url}
                alt={`${props.title} cover image`}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5" sx={{
                        color: 'primary.main'
                    }}>
                        <Box className={Styles.partTitle}>
                            {props.title}
                        </Box>
                    </Typography>
                    <Box className={Styles.loglineHolder} onClick={toggleScroll}>
                        <Typography className={Styles.partLoglineContainer} variant="subtitle1" component="div" sx={{
                            overflow: shouldAllowScroll ? 'auto' : 'hidden'
                        }}>
                            <Box className={Styles.partLogline}>
                                {props.metadata?.part_logline}
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
}
