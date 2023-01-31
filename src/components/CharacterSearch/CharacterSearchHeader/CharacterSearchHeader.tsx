import {
    Stack,
    Typography,
    Accordion,
    AccordionDetails,
    AccordionSummary
} from "@mui/material";
import ExpandMore from '@mui/icons-material/ExpandMore';

export interface CharacterSearchHeaderProps {
    isLargerScreen: boolean;
    isGiantScreen: boolean;
    aboutTitle: string;
    aboutHTML: string;
}

export const CharacterSearchHeader = ({
    isLargerScreen,
    isGiantScreen,
    aboutTitle,
    aboutHTML
}: CharacterSearchHeaderProps): JSX.Element => {
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
    </Stack>
}