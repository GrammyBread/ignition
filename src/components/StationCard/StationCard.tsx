import * as React from 'react';
import { Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Station } from '../../interfaces/appendices/stations.interface';

const SCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    ...theme.mixins.toolbar,
    color: theme.palette.primary.contrastText
}));

export default function StationCard(props: Station): JSX.Element {
    const stationName = props.title

    return (
        <SCard>
            <CardMedia
                component="img"
                sx={{
                    maxWidth: 'calc(100% - 2rem)',
                    paddingTop: '1rem',
                    margin: 'auto'
                }}
                image={props.metadata.station_symbol.url}
                alt={`${stationName} symbol`}
            />
            <CardContent>
               
            </CardContent>
        </SCard>
    );
}
