import React from "react";
import {
    Stack,
    Typography,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    Container
} from "@mui/material";
import { Arch } from "../../../interfaces/appendices/stations.interface";
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArchCard from "../../ArchCard/ArchCard";

export interface StationHeaderProps {
    isLargerScreen: boolean;
    isGiantScreen: boolean;
    aboutTitle: string;
    aboutHTML: string;
    arches: Arch[];
}

export const StationSearchHeader = ({
    isLargerScreen,
    isGiantScreen,
    aboutTitle,
    aboutHTML,
    arches
}: StationHeaderProps): JSX.Element => {
    return <Stack direction="row">
        {isLargerScreen ?
            <Stack sx={{
                margin: isGiantScreen ? "2rem" : "1rem"
            }}>
                <Typography gutterBottom variant="h4" component="h2" textAlign={"center"} sx={{
                    lineHeight: "1",
                    marginTop: isGiantScreen ? "1rem" : ".25rem"
                }}>
                    {aboutTitle}
                </Typography>
                <Typography gutterBottom variant="body1" component="h2" sx={{ margin: "0rem 0rem 0rem 1rem" }}>
                    <div dangerouslySetInnerHTML={{ __html: aboutHTML }} />
                </Typography>
            </Stack>
            :
            <Accordion sx={{
                margin: '1rem'
            }}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="about-appendix-content"
                    id="about-appendix-header"
                >
                    <Typography variant="h6" component="h2" textAlign={"center"}>
                        {aboutTitle}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography gutterBottom variant="body1" component="h2" sx={{ margin: "0rem 0rem 0rem 1rem" }}>
                        <div dangerouslySetInnerHTML={{ __html: aboutHTML }} />
                    </Typography>
                </AccordionDetails>
            </Accordion>
        }
        {isLargerScreen &&
            <>
                <Divider variant='middle' orientation="vertical"
                    sx={{
                        minHeight: '100%',
                        height: 'auto'
                    }} />
                <Container sx={{
                    margin: isGiantScreen ? '2rem' : '1rem',
                    maxWidth: isGiantScreen ? 'inherit' : '30vw',
                }} >
                    <Typography gutterBottom variant="h4" component="h2" textAlign={"center"} sx={{
                        lineHeight: "1",
                        marginTop: isGiantScreen ? "1rem" : ".5rem"
                    }}>
                        Arches
                    </Typography>
                    <Stack direction={isGiantScreen ? 'row' : 'column'} spacing={2}>
                        {arches.map((arch) => <ArchCard key={arch.id} {...arch}></ArchCard>)}
                    </Stack>
                </Container>
            </>
        }
    </Stack>
}