import * as React from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Typography,
    IconButton,
    IconButtonProps,
    styled,
    Box,
} from "@mui/material";
import { EpubHeader } from "../../../../../interfaces/epub/epub-reader.interface";
import Styles from "./TitleCover.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    IconDefinition,
    faFacebookF,
    faRedditAlien,
    faTumblr,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { ExpandMore as ExpandMoreIcon, Share } from "@mui/icons-material";
import { Grid } from '@mui/material';
import Image from "next/image";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

interface SocialLinkDetails {
    key: string;
    link: string;
    label: string;
    icon: IconDefinition;
}

export default function TitleCoverWide(props: EpubHeader): JSX.Element {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const socialLinks = [
        {
            key: "twitter",
            link: props.twitterShare,
            label: "Share on Twitter",
            icon: faTwitter
        },
        {
            key: "facebook",
            link: props.facebookShare,
            label: "Share on Facebook",
            icon: faFacebookF
        },
        {
            key: "reddit",
            link: props.redditShare,
            label: "Share on Reddit",
            icon: faRedditAlien
        },
        {
            key: "tumblr",
            link: props.tumblrShare,
            label: "Share on Tumblr",
            icon: faTumblr
        }
    ] as SocialLinkDetails[];

    return (
        <Card>
            <CardContent>
                <Grid container flexDirection={"row"} wrap={"nowrap"}>
                    <Grid
                        item
                        container
                        flexDirection="column"
                        xs={8}
                        sm={8}
                        md={8}
                        lg={8}
                        xl={8} >
                        <Grid item>
                            <Typography gutterBottom variant="h4" component="h1">
                                {props.title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography gutterBottom variant="subtitle1" component="h2">
                                Publish Date
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" component="h3">
                                {props.description}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item
                        xs={4}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}>
                        <Box sx={{
                            margin: 'auto',
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                        }}>
                            <Image

                                className={Styles.coverImage}
                                src={props.coverUrl}
                                fill
                                alt={`${props.title} cover image`}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    endIcon={<Share />}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="Share Section"
                    sx={{
                        marginLeft: 'auto'
                    }}>
                    Share
                </Button>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Grid container spacing={1} justifyContent={"center"} >
                        {
                            socialLinks.map((link) => {
                                return <Grid item key={link.key}>
                                    <Button variant="contained" size="large" color={"secondary"} aria-label={link.label} href={link.link}>
                                        <FontAwesomeIcon icon={link.icon} />
                                    </Button>
                                </Grid>;
                            })
                        }
                    </Grid>
                </CardContent>
            </Collapse>
        </Card>
    );
}
