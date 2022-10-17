import * as React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Slide,
    Modal,
    IconButton,
    TableContainer,
    TableBody,
    TableRow,
    TableCell
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Station } from '../../interfaces/appendices/stations.interface';
import { Typography, CardActions } from '@mui/material';
import { purple, grey, cyan, yellow } from '@mui/material/colors';
import Image from 'next/image';
import { Box } from '@mui/system';
import { Close } from '@mui/icons-material';
import { Table } from '../TableOfContents/Table/Table';
import StationStyles from './StationCard.module.scss';

const style = (color: string) => ({
    position: 'absolute' as 'absolute',
    top: '10%',
    left: '0',
    transform: 'translate(-50%, -50%)',
    width: 'calc(100% - 2rem)',
    margin: '1rem',
    bgcolor: color,
    color: 'black',
    borderRadius: '.5rem'
});

const SCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== 'isPrimary',
})<{ stationColor: string }>(({ theme, stationColor }) => ({
    backgroundColor: stationColor,
    ...theme.mixins.toolbar,
    color: theme.palette.primary.contrastText
}));

function GetStationBg(type: string) {
    if (type.toLocaleLowerCase() === "ma") {
        return yellow['A200']
    }
    else if (type.toLocaleLowerCase() === "s") {
        return cyan['A200']
    }
    else if (type.toLocaleLowerCase() === "c") {
        return purple['A100'];
    }
    else {
        return grey['A400']
    }
}

export default function StationCard(props: Station): JSX.Element {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const stationName = props.title;
    const stationNotes = props.metadata.notes;
    const stationType = props.metadata.station_type.value;
    const stationPlanet = props.metadata.orbiting_planet;
    const stationColor = GetStationBg(props.metadata.station_type.key);

    return <>
        <SCard stationColor={stationColor} onClick={handleClickOpen}>
            <CardMedia
                component="img"
                sx={{
                    maxWidth: 'calc(100% - 2rem)',
                    paddingTop: '1rem',
                    margin: 'auto'
                }}
                image={props.metadata.station_symbol.url}
                alt={`${stationName} symbol`}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" textAlign='center' component="div">
                    {stationName}
                </Typography>
            </CardContent>
        </SCard>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
        >
            <Slide in={open}>
                <Card sx={style(stationColor)}>
                    <CardActions sx={{
                        justifyContent: 'end'
                    }}>
                        <IconButton onClick={handleClose}>
                            <Close htmlColor='black' />
                        </IconButton>
                    </CardActions>
                    <CardMedia
                        component="img"
                        sx={{
                            maxWidth: 'calc(50%)',
                            background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,.5) 40%, rgba(255,255,255,1) 70%)',
                            border: 'solid white 2px',
                            borderRadius: '50%',
                            margin: 'auto'
                        }}
                        image={props.metadata.station_symbol.url}
                        alt={`${stationName} symbol`}
                    />
                    <CardContent>
                        <Typography variant="h5" component="div" textAlign='center' sx={{
                            textDecoration: 'underline',
                            marginBottom: '1rem'
                        }}>
                            {stationName}
                        </Typography>
                        <TableContainer component={Box}
                            className={StationStyles.stationDetails}
                            sx={{ backgroundColor: 'background.default' }}>
                            <Table aria-label="simple table">
                                <TableBody sx={{
                                    '&:last-child td, &:last-child th, &:last-child div': {
                                        border: 1,
                                        padding: '.5rem .75rem',
                                    },
                                    width: '100%'
                                }}>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <strong>Orbiting Planet</strong>
                                        </TableCell>
                                        <TableCell align="left">
                                            {stationPlanet}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <strong>Station Type</strong>
                                        </TableCell>
                                        <TableCell align="left">
                                            {stationType}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <strong>Related Stations</strong>
                                        </TableCell>
                                        <TableCell align="left" component="div" dangerouslySetInnerHTML={{ __html: props.metadata.relations }}>
                                        </TableCell>
                                    </TableRow>
                                    {
                                        stationNotes &&
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                <strong>Notes</strong>
                                            </TableCell>
                                            <TableCell align="left" component="div" dangerouslySetInnerHTML={{ __html: stationNotes }}>
                                            </TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Slide>
        </Modal>
    </>;
}
