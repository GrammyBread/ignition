import * as React from 'react';
import {
    Button,
    Card,
    CardActions,
    ButtonGroup,
    CardMedia
} from '@mui/material';
import { EpubHeader } from '../../../interfaces/epub/epub-reader.interface';
import Styles from "./ReaderPage.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faRedditAlien, faTumblr, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function EPubCover(props: EpubHeader): JSX.Element {
    return (
        <Card id="cover">
        <CardMedia
            component="img"            
            className={Styles.titleCoverImage}
            image={props.coverUrl}
            alt={`${props.title} cover image`}
        />
            <CardActions>
                <ButtonGroup 
                orientation={props.verticalButtons ? "vertical" : "horizontal"}
                className={Styles.buttonGroup}
                sx={{ 
                    'svg': {
                        height: props.verticalButtons ? '2rem' : '1.25rem'
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