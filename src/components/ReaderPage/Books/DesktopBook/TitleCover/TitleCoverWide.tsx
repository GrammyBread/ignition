import * as React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Typography,
  CardMedia,
} from "@mui/material";
import { EpubHeader } from "../../../../../interfaces/epub/epub-reader.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Share } from "@mui/icons-material";
import { Grid } from "@mui/material";
import Link from "next/link";
import { coverSocialLinks } from "../../Helpers/functions";

export default function TitleCoverWide(props: EpubHeader): JSX.Element {
  const [expanded, setExpanded] = React.useState(false);

  const socialLinks = coverSocialLinks(props);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Link href={"#reader"}>
      <Card>
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
                <Typography variant="body1" component="h3">
                  {props.description}
                </Typography>
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
          <Button
            variant="contained"
            endIcon={<Share />}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Share Section"
            sx={{
              marginLeft: "auto",
            }}
          >
            Share
          </Button>
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
    </Link>
  );
}
