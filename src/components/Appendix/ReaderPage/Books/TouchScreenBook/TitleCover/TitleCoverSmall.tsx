import * as React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardActions,
  CardMedia,
  CardContent,
  Collapse,
  Typography,
  IconButton,
  IconButtonProps,
  styled,
} from "@mui/material";
import { EpubHeader } from "../../../../../../interfaces/epub/epub-reader.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { coverSocialLinks } from "../../helpers";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TitleCoverSmall(props: EpubHeader): JSX.Element {
  const [expanded, setExpanded] = React.useState(false);

  const socialLinks = coverSocialLinks(props);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        maxWidth: "3in",
      }}
    >
      <CardHeader title={props.title} subheader="<Publish Date>" />
      <CardMedia
        component="img"
        image={props.coverUrl}
        alt={`${props.title} cover image`}
      />
      <CardActions>
        <Grid
          container
          spacing={1}
          columns={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }}
        >
          {socialLinks.map((link) => {
            return (
              <Grid item key={link.key} xs={1} sm={1} md={1} lg={1} xl={1}>
                <Button
                  variant="contained"
                  size="large"
                  aria-label={link.label}
                  href={link.link}
                >
                  <FontAwesomeIcon icon={link.icon} />
                </Button>
              </Grid>
            );
          })}
        </Grid>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body1" component="h3" textAlign={"center"}>
            {props.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
