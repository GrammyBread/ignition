import * as React from "react";
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Collapse,
  Typography,
  Grid
} from "@mui/material";
import { EpubHeader } from "../../../../../../interfaces/epub/epub-reader.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BookOnline, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { coverSocialLinks } from "../../Helpers/functions";
import { ExpandToggle } from "../../Helpers/Components/ExpandToggle";
import { useTheme } from "@mui/material/styles";
import { Container } from '@mui/system';

export default function TitleCoverLandscape(props: EpubHeader): JSX.Element {
  const [expanded, setExpanded] = React.useState(false);

  const socialLinks = coverSocialLinks(props);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        maxWidth: "50vw",
      }}
    >
      <CardContent>
        <Grid container flexDirection={"row"} wrap={"nowrap"}>
          <Grid
            item
            container
            flexDirection="column"
            xs={8}
            sm={8}
            md={8}
            lg={8}
            xl={8}
          >
            <Grid item>
              <Typography gutterBottom variant="h4" component="h1">
                {props.title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="subtitle1" component="h2">
                Publish Date
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" endIcon={<BookOnline />}>
                Read Now
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
            <CardMedia
              component="img"
              image={props.coverUrl}
              alt={`${props.title} cover image`}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <ExpandToggle
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{
            marginRight: 0,
          }}
        >
          <ExpandMoreIcon />
        </ExpandToggle>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container spacing={1} justifyContent={"center"}>
            {socialLinks.map((link) => {
              return (
                <Grid item key={link.key}>
                  <Button
                    variant="contained"
                    size="large"
                    color={"secondary"}
                    aria-label={link.label}
                    href={link.link}
                  >
                    <FontAwesomeIcon icon={link.icon} />
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
}
