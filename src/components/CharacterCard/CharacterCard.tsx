import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Stack, Button, CardActions, ButtonGroup } from '@mui/material';
import { Character } from '../../interfaces/appendices/character.interface';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { Mic, ReadMore, Twitter, Facebook, Reddit } from '@mui/icons-material';

const CCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    ...theme.mixins.toolbar,
    color: theme.palette.text.primary
}));

interface Colors {
    primary: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    accent: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

function GetCardType(type: string): Colors {
    if (type === "U") {
        return {
            primary: "warning",
            accent: "secondary"
        } as Colors
    }
    if (type === "L") {
        return {
            primary: "secondary",
            accent: "primary"
        } as Colors
    }
    else if (type === "S") {
        return {
            primary: "primary",
            accent: "secondary"
        } as Colors
    }

    return {
        primary: "warning",
        accent: "secondary"
    } as Colors
}

export interface CardProps {
    info: Character,
    baseURL: string
}

export default function CharacterCard({ info, baseURL }: CardProps): JSX.Element {
    const whitespace = /\W/gi;
    const characterName = info.metadata.name.first_name.replace(whitespace, '');
    const audioRef = React.useRef<HTMLAudioElement>(null);

    const coloring = GetCardType(info.metadata.card_type.key);
    const characterURL = `${baseURL}#${characterName}`;

    const handleClick = () => {
        if (audioRef.current !== null) {
            audioRef.current.play()
        }
    }

    return (
        <CCard id={characterName}>
            <CardActions disableSpacing>
                <ButtonGroup sx={{ margin: 'auto' }}
                    disableElevation
                    color={coloring.primary}
                    size="large"
                    variant="contained"
                    aria-label="text button group">
                    <Button href="https://twitter.com/intent/tweet">
                        <Twitter></Twitter>
                    </Button>
                    <Button href={`https://www.facebook.com/sharer/sharer.php?u=${characterURL}`}>
                        <Facebook></Facebook>
                    </Button>
                    <Button href={`https://reddit.com/submit?url=${characterURL}&title=${info.title}`}>
                        <Reddit></Reddit>
                    </Button>
                </ButtonGroup>
            </CardActions>
            <CardMedia
                component="img"
                sx={{
                    maxWidth: 'calc(100% - 2rem)',
                    paddingTop: '1rem',
                    margin: 'auto'
                }}
                image={info.metadata.character_image.url}
                alt={`${characterName} cover image`}
            />
            <CardMedia
                ref={audioRef}
                component="audio"
                src={info.metadata.pronunciation_section.audio.url}
            />
            <CardContent>
                <Accordion elevation={0} sx={{
                    backgroundColor: `${coloring.primary}.main`,
                    color: `${coloring.primary}.contrastText`
                }}>
                    <AccordionSummary
                        expandIcon={<ReadMore sx={{
                            color: `${coloring.primary}.contrastText`
                        }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Stack spacing={0}>
                            <Typography gutterBottom variant="h4" component="div">
                                {info.metadata.name.first_name.toUpperCase()}
                            </Typography>
                            <Typography variant="h6" component="div">
                                {info.metadata.name.additional_names}
                                {
                                    info.metadata.name.station_image.url &&
                                    <Box sx={{
                                        width: '1.6rem',
                                        height: '1.6rem',
                                        zIndex: 1000,
                                        position: 'relative',
                                        marginLeft: '.5rem',
                                        float: 'right'
                                    }}>
                                        <Image
                                            src={info.metadata.name.station_image.imgix_url}
                                            alt={`${info.metadata.name.first_name} ${info.metadata.name.additional_names} character station image`}
                                            fill />
                                    </Box>
                                }
                            </Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                        backgroundColor: `${coloring.primary}.light`,
                        color: `${coloring.primary}.contrastText`,
                        margin: "1rem",
                        borderRadius: "1rem",
                        display: "flex",
                        flexFlow: "column nowrap",
                        alignItems: "center"
                    }}>
                        <Button onClick={handleClick} variant="contained" color={coloring.accent} endIcon={<Mic />} aria-label="hear my name">
                            {info.metadata.pronunciation_section.header}
                        </Button>
                        <div dangerouslySetInnerHTML={{ __html: info.metadata.description }}>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </CCard>
    );
}
