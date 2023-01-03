import * as React from "react";
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Divider,
  ButtonGroup,
  Stack,
  Slide,
} from "@mui/material";
import { EpubHeader } from "../../../../../../interfaces/epub/epub-reader.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutoStories, ExpandMore, Info } from "@mui/icons-material";
import { coverSocialLinks } from "../../Helpers/functions";
import { useTheme } from "@mui/material/styles";
import { Container } from "@mui/system";
import { useRef } from "react";

interface TitleCover extends EpubHeader {
  openReader: () => void;
}

export default function TitleCoverLandscape(props: TitleCover): JSX.Element {
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();
  const containerRef = useRef(null);

  const socialLinks = coverSocialLinks(props);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      ref={containerRef}
      sx={{
        width: "fit-content",
        margin: theme.spacing(1),
      }}
    >
      <CardContent
        sx={{
          maxHeight: "75vh",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Grid
            item
            container
            flexDirection="column"
            justifyContent="space-between"
          >
            <Grid item>
              <Typography gutterBottom variant="h4" component="h1">
                {props.title}
              </Typography>
            </Grid>
            <Grid item>
              <Stack direction="row" spacing={1} alignItems="baseline">
                <Typography gutterBottom variant="subtitle1" component="h2">
                  Last Updated:
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="h2">
                  <em>{props.modifiedDate.toLocaleDateString()}</em>
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <ButtonGroup>
                <Button variant="contained" endIcon={<AutoStories />} onClick={props.openReader}>
                  Read Now
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleExpandClick}
                  endIcon={<Info />}
                >
                  More Info
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <CardMedia
            component="img"
            image={props.coverUrl}
            sx={{
              maxWidth: expanded ? "25vw" : "50vw",
              width: "max-content",
              height: "max-content",
              margin: `auto auto auto ${theme.spacing(2)} !important`,
              maxHeight: `calc(70vh - ${theme.spacing(2)})`,
            }}
            alt={`${props.title} cover image`}
          />
          {expanded && <Divider orientation="vertical" flexItem />}
          <Slide
            in={expanded}
            container={containerRef.current}
            direction="left"
            unmountOnExit
          >
            <div>
              <Container>
                <Typography
                  variant="body1"
                  fontWeight={500}
                  component="p"
                  textAlign="center"
                >
                  SHARE
                </Typography>
                <CardActions>
                  <ButtonGroup
                    variant="contained"
                    color="secondary"
                    aria-label="outlined primary button group"
                    sx={{
                      margin: "auto",
                    }}
                  >
                    {socialLinks.map((link) => {
                      return (
                        <Button
                          key={link.key}
                          variant="contained"
                          size="large"
                          color="secondary"
                          aria-label={link.label}
                          href={link.link}
                        >
                          <FontAwesomeIcon icon={link.icon} />
                        </Button>
                      );
                    })}
                  </ButtonGroup>
                </CardActions>
              </Container>
              <Divider />
              <CardContent
                sx={{
                  maxHeight: `calc(50vh - ${theme.spacing(2)})`,
                  overflowY: "auto",
                }}
              >
                <Typography variant="body1" component="h3" textAlign={"center"}>
                  {props.description}
                </Typography>
              </CardContent>
            </div>
          </Slide>
        </Stack>
      </CardContent>
    </Card>
  );
}
