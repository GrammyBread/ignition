import { GetStaticProps } from 'next';
import { getAllArches, getAllStations, getStationPage } from '../../src/lib/api/client';
import * as React from 'react';
import Layout from '../../src/components/Main/Layout';
import { CleanedNavigation } from '../../src/interfaces/read/cleaned-types.interface';
import NotFoundPage from '../../src/components/Error/NotFound';
import {
    Autocomplete,
    TextField,
    Paper,
    Stack,
    Grid,
    Typography,
    Card,
    CardHeader
} from '@mui/material';
import getCleanSiteData from '../../src/lib/api/sitedata/cache-site-data';
import { Arch, Station } from '../../src/interfaces/appendices/stations.interface';
import StationCard from '../../src/components/StationCard/StationCard';
import { AppendixPage } from '../../src/interfaces/appendices/documents.interface';
import ArchCard from '../../src/components/ArchCard/ArchCard';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { PublicBackground } from '../../public/backgroundImage';
import { StationSearchHeader } from '../../src/components/Appendix/StationSearchHeader/StationSearchHeader';

interface Props {
    navData: CleanedNavigation;
    stations: Station[];
    arches: Arch[];
    pageDetails: AppendixPage;
}

const StationSearch = (props: Props): JSX.Element => {
    const [filterName, setFilterName] = React.useState<string | null>('');
    const theme = useTheme();
    const isGiantScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const isLargerScreen = useMediaQuery('(min-width:760px)', { noSsr: true });

    if (props == undefined || props.arches == undefined || props.stations == undefined) {
        return <NotFoundPage requestedItem={`Character Page`} />
    }

    props.stations.sort((a, b) => (a.title < b.title) ? -1 : 1);
    let stationNames = props.stations.map((station) => station.title);
    if (!isLargerScreen) {
        props.arches.forEach((arch) => stationNames.push(arch.title))
    }

    return (
        <Layout navData={props.navData} backgroundImageUrl={"/assets/SiteBack.svg"}>
            <Stack spacing={2}>
                <Card>
                    <CardHeader sx={{
                        background: "black"
                    }}
                        title={<Typography gutterBottom variant="h2" component="h1" textAlign={"center"} sx={{ lineHeight: "1" }}>
                            {props.pageDetails.title}
                        </Typography>}
                    />
                    <StationSearchHeader
                        isLargerScreen={isLargerScreen}
                        isGiantScreen={isGiantScreen}
                        arches={props.arches}
                        aboutHTML={props.pageDetails.content}
                        aboutTitle="About This Appendix Item" />
                    <Autocomplete
                        disablePortal
                        id="search-by-station-box"
                        options={stationNames}
                        onChange={(event: any, newValue: string | null) => {
                            if (newValue) setFilterName(newValue);
                            else setFilterName(null);
                        }}
                        sx={{
                            maxWidth: '400',
                            margin: '1rem',
                            '& input': {
                                fontWeight: '500'
                            }
                        }}
                        renderInput={(params) => <TextField {...params} label="Search by Station Name" />}
                    />
                </Paper>
                <Grid container spacing={2} sx={{
                    paddingRight: '2rem'
                }}>
                    {
                        props.stations.length > 0 && props.stations
                            .filter((station) => !filterName || filterName && station.title.includes(filterName))
                            .map((station) => {
                                return (
                                    <Grid key={station.id} item xs={6} sm={6} md={4} lg={2} xl={2}>
                                        <StationCard {...station}></StationCard>
                                    </Grid>
                                );
                            })
                    }
                    {
                        !isLargerScreen && props.arches.length > 0 && props.arches
                            .filter((arch) => !filterName || filterName && arch.title.includes(filterName))
                            .map((arch) => {
                                return (
                                    <Grid key={arch.id} item xs={6} sm={6} md={4} lg={2} xl={2} sx={{
                                        display: !filterName || filterName && arch.title.includes(filterName) ? 'inherit' : 'none'
                                    }}>
                                        <ArchCard {...arch}></ArchCard>
                                    </Grid>
                                );
                            })
                    }
                </Grid>
            </Stack>
        </Layout>
    );
};

export default StationSearch;

export const getStaticProps: GetStaticProps = async (context) => {
    const cleanSiteData = await getCleanSiteData();
    if (!cleanSiteData) {
        throw Error("Could not get site data!")
    }

    const normalStations = await getAllStations();
    const archStations = await getAllArches();
    const pageDetails = await getStationPage();

    return {
        props: {
            navData: cleanSiteData.getSimpleNav(),
            stations: normalStations,
            arches: archStations,
            pageDetails
        } as Props,
        revalidate: (30*24*60*60)
    };
};