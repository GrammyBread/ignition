import { GetStaticProps } from "next";
import {
    getAllArches,
    getAllStations,
    getStationPage,
} from "../../src/lib/api/client";
import * as React from "react";
import Layout from "../../src/components/Main/Layout";
import { CleanedNavigation } from "../../src/interfaces/read/cleaned-types.interface";
import NotFoundPage from "../../src/components/Error/NotFound";
import {
    Autocomplete,
    TextField,
    Stack,
    Grid,
    Typography,
    Divider,
    Card,
    CardHeader,
} from "@mui/material";
import getCleanSiteData from "../../src/lib/api/sitedata/cache-site-data";
import {
    Arch,
    Station,
} from "../../src/interfaces/appendices/stations.interface";
import StationCard from "../../src/components/StationCard/StationCard";
import { AppendixPage } from "../../src/interfaces/appendices/documents.interface";
import ArchCard from "../../src/components/ArchCard/ArchCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Container } from "@mui/system";
import { PublicBackground } from "../../public/backgroundImage";

interface Props {
    navData: CleanedNavigation;
    stations: Station[];
    arches: Arch[];
    pageDetails: AppendixPage;
}

const StationSearch = (props: Props): JSX.Element => {
    const [filterName, setFilterName] = React.useState<string | null>("");
    const theme = useTheme();
    const isMidSized = useMediaQuery(theme.breakpoints.only("md"));
    const isSmallSized = useMediaQuery(theme.breakpoints.only("sm"));
    const isTinyScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isLargerScreen = useMediaQuery(theme.breakpoints.up("sm"));

    if (
        props == undefined ||
        props.arches == undefined ||
        props.stations == undefined
    ) {
        return <NotFoundPage requestedItem={`Character Page`} />;
    }

    props.stations.sort((a, b) => (a.title < b.title ? -1 : 1));
    let stationNames = props.stations.map((station) => station.title);
    if (isTinyScreen) {
        props.arches.forEach((arch) => stationNames.push(arch.title));
    }

    return (
        <Layout backgroundImageUrl={PublicBackground}>
            <Stack spacing={2}>
                <Card>
                    <CardHeader
                        sx={{
                            background: "black",
                        }}
                        title={
                            <Typography
                                gutterBottom
                                variant="h2"
                                component="h1"
                                textAlign={"center"}
                                sx={{ lineHeight: "1" }}
                            >
                                {props.pageDetails.title}
                            </Typography>
                        }
                    />
                    <Stack direction="row">
                        <Stack
                            sx={{
                                margin: isMidSized ? "1rem" : isSmallSized ? ".25rem" : "2rem",
                            }}
                        >
                            <Typography
                                gutterBottom
                                variant="h4"
                                component="h2"
                                textAlign={"center"}
                                sx={{
                                    lineHeight: "1",
                                    marginTop: isMidSized ? ".5rem" : "1rem",
                                }}
                            >
                                About this Appendix Item
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="body1"
                                component="h2"
                                sx={{ margin: "0rem 0rem 0rem 1rem" }}
                            >
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: props.pageDetails.content,
                                    }}
                                />
                            </Typography>
                        </Stack>
                        {(isMidSized || isLargerScreen) && (
                            <Divider
                                variant="middle"
                                orientation="vertical"
                                sx={{
                                    minHeight: "100%",
                                    height: "auto",
                                }}
                            />
                        )}
                        {(isMidSized || isLargerScreen) && (
                            <Container
                                sx={{
                                    margin: isMidSized
                                        ? "1rem"
                                        : isSmallSized
                                            ? ".25rem"
                                            : "2rem",
                                    maxWidth: isMidSized ? "30vw" : "inherit",
                                }}
                            >
                                <Typography
                                    gutterBottom
                                    variant="h4"
                                    component="h2"
                                    textAlign={"center"}
                                    sx={{
                                        lineHeight: "1",
                                        marginTop: isMidSized ? ".5rem" : "1rem",
                                    }}
                                >
                                    Arches
                                </Typography>
                                <Stack
                                    direction={isMidSized || isSmallSized ? "column" : "row"}
                                    spacing={2}
                                >
                                    {props.arches.map((arch) => (
                                        <ArchCard key={arch.id} {...arch}></ArchCard>
                                    ))}
                                </Stack>
                            </Container>
                        )}
                    </Stack>
                    <Autocomplete
                        disablePortal
                        id="search-by-station-box"
                        options={stationNames}
                        onChange={(event: any, newValue: string | null) => {
                            if (newValue) setFilterName(newValue);
                            else setFilterName(null);
                        }}
                        sx={{
                            maxWidth: "400",
                            margin: "1rem",
                            "& input": {
                                fontWeight: "500",
                            },
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Search by Station Name" />
                        )}
                    />
                </Card>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        paddingRight: "2rem",
                    }}
                >
                    {props.stations.length > 0 &&
                        props.stations.map((station) => {
                            return (
                                <Grid
                                    key={station.id}
                                    item
                                    xs={6}
                                    sm={6}
                                    md={4}
                                    lg={2}
                                    xl={2}
                                    sx={{
                                        display:
                                            !filterName ||
                                                (filterName && station.title.includes(filterName))
                                                ? "inherit"
                                                : "none",
                                    }}
                                >
                                    <StationCard {...station}></StationCard>
                                </Grid>
                            );
                        })}
                    {isTinyScreen &&
                        props.arches.length > 0 &&
                        props.arches
                            .filter(
                                (arch) =>
                                    !filterName || (filterName && arch.title.includes(filterName))
                            )
                            .map((arch) => {
                                return (
                                    <Grid
                                        key={arch.id}
                                        item
                                        xs={6}
                                        sm={6}
                                        md={4}
                                        lg={2}
                                        xl={2}
                                        sx={{
                                            display:
                                                !filterName ||
                                                    (filterName && arch.title.includes(filterName))
                                                    ? "inherit"
                                                    : "none",
                                        }}
                                    >
                                        <ArchCard {...arch}></ArchCard>
                                    </Grid>
                                );
                            })}
                </Grid>
            </Stack>
        </Layout>
    );
};

export default StationSearch;

export const getStaticProps: GetStaticProps = async (context) => {
    const cleanSiteData = await getCleanSiteData();
    if (!cleanSiteData) {
        throw Error("Could not get site data!");
    }

    const normalStations = await getAllStations();
    const archStations = await getAllArches();
    const pageDetails = await getStationPage();

    return {
        props: {
            navData: cleanSiteData.getSimpleNav(),
            stations: normalStations,
            arches: archStations,
            pageDetails,
        } as Props,
        revalidate: 30 * 24 * 60 * 60,
    };
};
