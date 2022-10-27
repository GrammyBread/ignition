import { Card, Grid, CardMedia, Typography, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';
import { AppendixItem } from '../../../interfaces/appendices/home.interface';
import { ParsedUrlQuery } from 'querystring';

export default function DocItemComponent ( props: AppendixItem ): JSX.Element
{
    return <Link href={ {
        pathname: "/appendices/[docslug]",
        query: {
            docslug: props.document.slug
        } as ParsedUrlQuery
    } }>
        <Card>
            <CardMedia
                component="img"
                sx={ {
                    maxWidth: '100%',
                    margin: 'auto'
                } }
                image={ props.image.url }
                alt={ `${ props.header } cover image` }
            />
            <Typography gutterBottom variant="h4" component="h3" textAlign="center">
                { props.header }
            </Typography>
        </Card>
    </Link>;
}
