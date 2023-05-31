import * as React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  useTheme,
  Box,
  Stack,
  styled,
} from "@mui/material";
import { Book } from "@mui/icons-material";
import Link from "next/link";
import {
  INTRO_SECTION_PATH,
  NORMAL_SECTION_PATH,
} from "../../../mappers/pathname.mapper";
import Styles from "./FeaturedSection.module.scss";
import { NavigationSection } from "../../../interfaces/read/nav-data.interfaces";
import { CosmicSectionImages } from "../../../interfaces/read/cosmic/cosmic-metadata.interfaces";
import Typography from '@mui/material/Typography';
import MainStyles from "../../../styles/shared.module.scss";

export interface FeaturedSectionProps extends NavigationSection {
  releaseDate: string;
  images: CosmicSectionImages;
}

const TitleComponent = (): JSX.Element => (
  <Typography
    component="h2"
    variant="h5"
    sx={{
      color: "primary.main"
    }} >
    <Box className={MainStyles.titles}>
      {"Featured Section"}
    </Box>
  </Typography>);

interface SubtitleComponentProps {
  title: string;
  releaseDate: string;
}

const SubtitleComponent = ({ title, releaseDate }: SubtitleComponentProps): JSX.Element => (
  <Stack direction="column" >
    <Typography variant="button" component="h2" sx={{ fontSize: "1rem" }}>
      {title}
    </Typography>
    <Typography variant="caption" component="p" sx={{ fontWeight: 100 }}>
      Released on {releaseDate}
    </Typography>
  </Stack>);

const FeaturedSectionHeader = styled(CardHeader, { shouldForwardProp: (prop) => prop !== 'backgroundImageUrl' })<{
  backgroundImageUrl?: string;
}>(({ theme, backgroundImageUrl }) => ({
  margin: `${theme.spacing(1)} ${theme.spacing(1)} 0px ${theme.spacing(1)}`,
  padding: `0px 0px 200px 0px`,
  backgroundImage: `url(${backgroundImageUrl})`,
  backgroundSize: "cover",
  borderRadius: `${theme.spacing(1)}`,
  ".MuiCardHeader-content": {
    background: "rgba(0, 0, 0, .8)",
    padding: `${theme.spacing(1)} ${theme.spacing(1)} ${theme.spacing(1)} ${theme.spacing(1)}`,
    borderRadius: `${theme.spacing(1)} ${theme.spacing(1)} 0px 0px`
  }
}));

export default function FeaturedSection(props: FeaturedSectionProps): JSX.Element {
  const theme = useTheme();

  return (
    <Card sx={{
      backgroundColor: "background.paper",
      color: "text.secondary",
    }}>
      <FeaturedSectionHeader
        backgroundImageUrl={props.images.background.imgix_url}
        title={<TitleComponent />}
        subheader={<SubtitleComponent title={props.title} releaseDate={props.releaseDate} />}
        sx={{
        }} />
      <CardContent sx={{
        padding: `0px ${theme.spacing(1)}`
      }}>
      </CardContent>
      {props.slug && (
        <CardActions
          disableSpacing
          sx={{
            justifyContent: "center",
            a: {
              textDecoration: "none",
              width: "100%"
            }
          }}>
          <Link
            href={{
              pathname: props.isHead
                ? INTRO_SECTION_PATH
                : NORMAL_SECTION_PATH,
              query: props.slug,
            }}>
            <Button
              className={Styles.readButton}
              variant="contained"
              startIcon={<Book />}
              sx={{
                width: "100%"
              }}>
              Read Now
            </Button>
          </Link>
        </CardActions>
      )}
    </Card>
  );
}
