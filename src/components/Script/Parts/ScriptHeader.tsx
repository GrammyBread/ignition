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
import { Facebook, Reddit, Twitter } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Resource } from '../../../interfaces/read/read-metadata.interfaces';

export interface ScriptHeaderProps {
    headerImage: Resource;
    title: string;
    url: string;
}

export function ScriptHeader(props: ScriptHeaderProps): JSX.Element {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Card>
            <CardMedia
                component="img"
                image={isLargeScreen ? props.headerImage.url : props.headerImage.imgix_url}
                sx={{
                    maxHeight: 'calc(88vh - 5rem)'
                }}
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