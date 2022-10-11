import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Stack } from '@mui/material';
import { Character } from '../../interfaces/appendices/character.interface';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import Image from 'next/image';
import { styled } from '@mui/material/styles';

const CCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    ...theme.mixins.toolbar,
    color: theme.palette.primary.contrastText
}));

export default function CharacterCard(props: Character): JSX.Element {
    const whitespace = /\W/gi;
    const characterName = props.metadata.name.first_name.replace(whitespace, '');

    return (
        <CCard>
            <CardMedia
                component="img"
                sx={{
                    maxWidth: 'calc(100% - 2rem)',
                    paddingTop: '1rem',
                    margin: 'auto'
                }}
                image={props.metadata.character_image.url}
                alt={`${characterName} cover image`}
            />
            <CardContent>
                <audio src={props.metadata.pronunciation.url}></audio>
                <Accordion elevation={0} sx={{
                    backgroundColor: 'transparent',
                    color: 'primary.contrastText'
                }}>
                    <AccordionSummary
                        expandIcon={<TouchAppIcon sx={{
                            color: 'primary.contrastText'
                        }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Stack spacing={0}>
                            <Typography gutterBottom variant="h4" component="p">
                                {props.metadata.name.first_name.toUpperCase()}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="p">
                                {props.metadata.name.additional_names}
                                {
                                    props.metadata.name.station_image.url &&
                                    <Box sx={{
                                        width: '1.6rem',
                                        height: '1.6rem',
                                        zIndex: 1000,
                                        position: 'relative',
                                        marginLeft: '.5rem',
                                        float: 'right'
                                    }}>
                                        <Image 
                                        src={props.metadata.name.station_image.url} 
                                        alt={`${props.metadata.name.first_name} ${props.metadata.name.additional_names} character station image`} 
                                        layout="fill" />
                                    </Box>
                                }
                            </Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p dangerouslySetInnerHTML={{ __html: props.metadata.description }} />
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </CCard>
    );
}
