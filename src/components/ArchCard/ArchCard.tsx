import * as React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Slide,
    Modal,
    IconButton,
    Grid,
    Box,
    Stack,
    Container,
    Button,
    Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Arch } from '../../interfaces/appendices/stations.interface';
import { Typography, CardActions, ButtonGroup } from '@mui/material';
import { Close } from '@mui/icons-material';
import Image from 'next/image';
import Styles from './ArchCard.module.scss';
import { borderTop } from '@mui/system';

const style = () => ({
    position: 'absolute' as 'absolute',
    top: '10%',
    left: '0',
    transform: 'translate(-50%, -50%)',
    width: 'calc(100% - 2rem)',
    margin: '1rem',
    color: 'white',
    background: 'black',
    borderRadius: '.5rem'
});

const ACard = styled(Card, { shouldForwardProp: (prop) => prop !== 'backgroundImageUrl' })<{
    backgroundImageUrl?: string;
}>(({ theme, backgroundImageUrl }) => ({
    background: `url(${backgroundImageUrl})`,
    fontColor: theme.palette.mode == 'dark' ? 'black' : 'white',
    ...theme.mixins.toolbar,
}));

function MakeStationBox(image: string, name: string) {
    return <Box
        sx={{
            width: '100%',
            height: '100%'
        }}
    >
        <Stack>
            <div>
                <Image src={image} alt={"Arch's Image"} width={600} height={600} />
            </div>
            <Typography variant="body1" component="div" textAlign='center' sx={{
                marginBottom: '1rem',
                minWidth: '100px'
            }}>
                {name}
            </Typography>
        </Stack>
    </Box>;
}

export default function ArchCard(props: Arch): JSX.Element {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleStationClick = (stationName: string) => {
        const relatedCard = document.getElementById(`${stationName}-card`);
        if (relatedCard) {
            setOpen(false);
            relatedCard.click();
        }
    }

    const stationName = props.title;

    return <>
        <ACard onClick={handleClickOpen} backgroundImageUrl={props.metadata.card_background.url}>
            <CardMedia
                component="img"
                sx={{
                    maxWidth: 'calc(100% - 2rem)',
                    padding: '0',
                    margin: '1rem auto auto auto'
                }}
                image={props.metadata.arch_symbol.url}
                alt={`${stationName} symbol`}
            />
            <CardContent sx={{
                marginTop: '.5rem',
                padding: '.5rem !important'
            }}>
                <Typography gutterBottom variant="h5" textAlign='center' component="div" sx={{
                    background: 'black',
                    color: 'white',
                    borderRadius: '.5rem'
                }}>
                    {stationName}
                </Typography>
            </CardContent>
        </ACard>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
        >
            <Slide in={open}>
                <Card sx={style()}>
                    <CardActions sx={{
                        justifyContent: 'end'
                    }}>
                        <IconButton onClick={handleClose}>
                            <Close htmlColor='white' />
                        </IconButton>
                    </CardActions>
                    <Stack direction="row">
                        <CardMedia
                            component="img"
                            sx={{
                                maxWidth: 'min(30vw, 30vh)',
                                background: `url(${props.metadata.card_background.url})`,
                                border: 'solid transparent 2px',
                                borderRadius: '10%',
                                margin: 'auto'
                            }}
                            image={props.metadata.arch_symbol.url}
                            alt={`${stationName} symbol`}
                        />
                        <Container>
                            <Typography variant="h5" component="div" textAlign='center' sx={{
                                textDecoration: 'underline',
                                marginBottom: '1rem'
                            }}>
                                {stationName}
                            </Typography>
                            <Typography variant="body1" component="div" textAlign='center' sx={{
                                marginBottom: '1rem'
                            }}>
                                <div dangerouslySetInnerHTML={{ __html: props.metadata.notes }}>

                                </div>
                            </Typography>
                        </Container>
                    </Stack>
                    <Divider variant='middle' role="presentation" sx={[
                        { marginTop: '1rem' },
                        {
                            '&:before': {
                                borderColor: 'white',
                            },
                        }, {
                            '&:after': {
                                borderColor: 'white',
                            }
                        }]}> <Typography variant="h6" component="p" textAlign='center' sx={{
                            marginBottom: '1rem'
                        }}>
                            {props.metadata.fallen_station_header}
                        </Typography></Divider>
                    <CardContent>
                        <Container sx={{
                            display: "flex",
                            flexFlow: "column",
                            alignItems: "center"
                        }}>

                            <ButtonGroup>
                                {props.metadata.stations.map((station) => <Button key={station.id} variant="contained">
                                    <div onClick={() => handleStationClick(station.title)} >
                                        {MakeStationBox(station.metadata.station_symbol.imgix_url, station.title)}
                                    </div>
                                </Button>)}
                            </ButtonGroup>
                        </Container>
                    </CardContent>
                </Card>
            </Slide>
        </Modal>
    </>;
}
