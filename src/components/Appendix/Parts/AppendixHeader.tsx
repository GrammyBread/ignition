import * as React from 'react';
import {
    Button,
    Card,
    CardActions,
    ButtonGroup
} from '@mui/material';
import { Facebook, Reddit, Twitter } from '@mui/icons-material';

export interface AppendixHeaderProps {
    content: string;
    title: string;
    url: string;
}

export function AppendixHeader(props: AppendixHeaderProps): JSX.Element {
    return (
        <Card>
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