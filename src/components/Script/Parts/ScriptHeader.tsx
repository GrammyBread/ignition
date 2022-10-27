import * as React from 'react';
import Link from 'next/link';
import {
    Button,
    CardMedia,
    Card,
    CardActionArea,
    CardActions,
    ButtonGroup,
    Fab
} from '@mui/material';
import { Facebook, Instagram, Reddit, Twitter } from '@mui/icons-material';

export interface ScriptHeaderProps {
    headerUrl: string;
    title: string;
    url: string;
}

export function ScriptHeader(props: ScriptHeaderProps): JSX.Element {
    return (
        <Card>
            <CardMedia
                component="img"
                image={props.headerUrl}
                alt={props.title}
            />
            <CardActions>
                <ButtonGroup sx={{ margin: 'auto' }}
                    disableElevation
                    color="secondary"
                    size="large"
                    variant="contained"
                    aria-label="text button group">
                    <Button href="https://twitter.com/intent/tweet">
                        <Twitter></Twitter>
                    </Button>
                    <Button href={`https://www.facebook.com/sharer/sharer.php?u=${props.url}`}>
                        <Facebook></Facebook>
                    </Button>
                    <Button href={`https://reddit.com/submit?url=${props.url}&title=${props.title}`}>
                        <Reddit></Reddit>
                    </Button>
                </ButtonGroup>
            </CardActions>
        </Card>
    );
}