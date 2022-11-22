import * as React from 'react';
import {
    Button,
    Card,
    CardActions,
    ButtonGroup,
    CardMedia
} from '@mui/material';
import { Facebook, Reddit, Twitter } from '@mui/icons-material';
import { EpubHeader } from '../../../interfaces/epub/epub-reader.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faRedditAlien, faTumblr, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function EPubCover(props: EpubHeader): JSX.Element {
    return (
        <Card>
        <CardMedia
            component="img"
            sx={{
                maxWidth: 'calc(100% - 2rem)',
                paddingTop: '1rem',
                margin: 'auto'
            }}
            image={props.coverUrl}
            alt={`${props.title} cover image`}
        />
            <CardActions>
                <ButtonGroup sx={{ 
                    margin: 'auto',
                    'svg': {
                        height: '1.25rem'
                    }
                 }}
                    disableElevation
                    color="secondary"
                    size="large"
                    variant="contained"
                    aria-label="text button group">
                    <Button href={props.twitterShare}>
                        <FontAwesomeIcon icon={faTwitter} />
                    </Button>
                    <Button href={props.facebookShare}>
                        <FontAwesomeIcon icon={faFacebookF} />
                    </Button>
                    <Button href={props.redditShare}>                        
                        <FontAwesomeIcon icon={faRedditAlien} />
                    </Button>
                    <Button href={props.tumblrShare}>
                        <FontAwesomeIcon icon={faTumblr} />
                    </Button>
                </ButtonGroup>
            </CardActions>
        </Card>
    );
}