import { Card, Grid, CardMedia, Typography} from '@mui/material';
import Link from 'next/link';
import * as React from 'react';
import { AppendixItem } from '../../../interfaces/appendices/home.interface';
import { ParsedUrlQuery } from 'querystring';

export default function DocItemComponent(props: AppendixItem): JSX.Element {
    return <Link href={{
        pathname: "/appendices/[docslug]",
        query: {
            docslug: props.document.slug
        } as ParsedUrlQuery
    }}>
        <Card sx={{
            height: '100%',
            maxHeight: '100%'
        }}>
            <CardMedia
                component="img"
                sx={{
                    margin: 'auto',
                    height: '75%'
                }}
                image={props.image.url}
                alt={`${props.header} cover image`}
            />
            <Typography gutterBottom variant="h4" component="h3" textAlign="center" sx={{
                margin: "1rem 0"
            }}>
                {props.header}
            </Typography>
        </Card>
    </Link>;
}
