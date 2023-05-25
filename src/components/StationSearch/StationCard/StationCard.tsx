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
    TableCell,
    Paper,
    TableHead
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Station } from '../../../interfaces/appendices/stations.interface';
import { Typography, CardActions } from '@mui/material';
import { purple, grey, cyan, yellow } from '@mui/material/colors';
import { Box } from '@mui/system';
import { Close } from '@mui/icons-material';
import { Table } from '../../TableOfContents/Table/Table';
import StationStyles from './StationCard.module.scss';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import classNames from 'classnames';

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
    shouldForwardProp: (prop) => prop !== 'stationColor',
})<{ stationColor: string }>(({ theme, stationColor }) => ({
    backgroundColor: 'transparent',
    fontColor: theme.palette.mode == 'dark' ? 'black' : 'white',

    ...theme.mixins.toolbar,
}));

const HeaderCell = styled(TableCell)(({ theme }) => ({
    borderRight: theme.palette.mode == 'dark' ? '1px solid rgb(81,81,81)' : '1px solid rgb(81,81,81)',
    fontSize: '1rem'
}));
const ChildCell = styled(TableCell)(({ theme }) => ({
    fontSize: '1rem',
    padding: '.25rem'
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
    const theme = useTheme();
    const isGiantScreen = useMediaQuery(theme.breakpoints.up('lg'));
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
        <SCard stationColor={stationColor} id={`${stationName}-card`} onClick={handleClickOpen}>
            <CardMedia
                component="img"
                sx={{
                    maxWidth: 'calc(100% - 2rem)',
                    backgroundColor: stationColor,
                    borderRadius: '50%',
                    padding: '0',
                    margin: '1rem auto auto auto'
                }}
                image={isGiantScreen ? props.metadata.station_symbol.url : props.metadata.station_symbol.imgix_url}
                alt={`${stationName} symbol`}
            />
            <CardContent sx={{
                marginTop: '.5rem',
                padding: '.5rem !important'
            }}>
                <Typography gutterBottom variant="h5" textAlign='center' component="div" sx={{                    
                    background: 'white',
                    color: 'black',
                    borderRadius: '.5rem'
                }}>
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
                            maxWidth: 'min(30vw, 30vh)',
                            background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,.5) 40%, rgba(255,255,255,1) 70%)',
                            border: 'solid white 2px',
                            borderRadius: '50%',
                            margin: 'auto'
                        }}
                        image={isGiantScreen ? props.metadata.station_symbol.url : props.metadata.station_symbol.imgix_url}
                        alt={`${stationName} symbol`}
                    />
                    <CardContent>
                        <Typography variant="h5" component="div" textAlign='center' sx={{
                            textDecoration: 'underline',
                            marginBottom: '1rem'
                        }}>
                            {stationName}
                        </Typography>
                        <Box className={classNames(StationStyles.stationDetails, StationStyles.prettyScroll)}>
                            <TableContainer component={Paper}>
                                <Table aria-label="station details table" sx={{
                                    width: '100% !important'
                                }}>
                                    <table className={StationStyles.detailsTables}>
                                        <TableHead></TableHead>
                                        <TableBody sx={{
                                            width: '100%'
                                        }}>
                                            <TableRow>
                                                <HeaderCell scope="row">
                                                    <strong>Orbiting Planet</strong>
                                                </HeaderCell>
                                                <ChildCell align="left">
                                                    {stationPlanet}
                                                </ChildCell>
                                            </TableRow>
                                            <TableRow>
                                                <HeaderCell scope="row">
                                                    <strong>Station Type</strong>
                                                </HeaderCell>
                                                <ChildCell align="left">
                                                    {stationType}
                                                </ChildCell>
                                            </TableRow>
                                            <TableRow>
                                                <HeaderCell scope="row">
                                                    <strong>Related Stations</strong>
                                                </HeaderCell>
                                                <ChildCell align="left">
                                                    <div dangerouslySetInnerHTML={{ __html: props.metadata.relations }} />
                                                </ChildCell>
                                            </TableRow>
                                            {
                                                stationNotes &&
                                                <TableRow>
                                                    <HeaderCell scope="row">
                                                        <strong>Notes</strong>
                                                    </HeaderCell>
                                                    <ChildCell align="left" >
                                                        <div dangerouslySetInnerHTML={{ __html: stationNotes }} />
                                                    </ChildCell>
                                                </TableRow>
                                            }
                                        </TableBody>
                                    </table>
                                </Table>
                            </TableContainer>
                        </Box>

                    </CardContent>
                </Card>
            </Slide>
        </Modal>
    </>;
}
