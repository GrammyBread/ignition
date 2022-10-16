import { Card, Grid, CardMedia, Typography } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';
import { SpecialAppendixItem } from '../../../interfaces/appendices/home.interface';

export interface SpecialItemProps {
    url: string;
    item: SpecialAppendixItem;
}

export default function SpecialItem(props: SpecialItemProps): JSX.Element {
    return <Grid item xs={12} sm={8} md={6} lg={7} xl={4}>
        <Link href={props.url}>
            <Card>
                <CardMedia
                    component="img"
                    sx={{
                        maxWidth: '100%',
                        margin: 'auto'
                    }}
                    image={props.item.image.url}
                    alt={`${props.item.header} cover image`}
                />
                <Typography 
                    gutterBottom 
                    variant="h4" 
                    component="h3" 
                    textAlign="center" 
                    sx={{margin: "1rem 0"}}>
                    {props.item.header}
                </Typography>
            </Card>
        </Link>
    </Grid>;
}
