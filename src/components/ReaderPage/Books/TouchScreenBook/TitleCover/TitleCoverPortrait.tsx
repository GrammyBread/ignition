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
  ButtonGroup,
  Divider,
  Stack
} from "@mui/material";
import { EpubHeader } from "../../../../../interfaces/epub/epub-reader.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExpandMore as ExpandMoreIcon, AutoStories } from '@mui/icons-material';
import { Orientation } from "../../Helpers/enums";
import { coverSocialLinks } from "../../Helpers/functions";
import { ExpandToggle } from "../../Helpers/Pieces/ExpandToggle";
import { useTheme } from "@mui/material/styles";
import { Container } from '@mui/system';

export interface TitleCoverProps extends EpubHeader {
  orientation: Orientation;
  openReader: () => void;
}

export default function TitleCoverPortrait(props: TitleCoverProps): JSX.Element {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  const socialLinks = coverSocialLinks(props);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        maxWidth: "75vw",
        margin: `${theme.spacing(3)} auto`,
      }}
    >
      <CardHeader title={props.title} subheader={
        <Stack direction="row" spacing={1} alignItems="baseline">
          <Typography gutterBottom variant="subtitle1" component="h2">
            Last Updated:
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="h2">
            <em>{props.modifiedDate.toLocaleDateString()}</em>
          </Typography>
        </Stack>
      }/>
      <CardMedia
        component="img"
        image={props.coverUrl}
        alt={`${props.title} cover image`}
      />
      <CardActions
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" endIcon={<AutoStories />} onClick={props.openReader}>
          Read Now
        </Button>
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
        <Divider />
        <Container>
          <Typography variant="body1" fontWeight={500} component="div" textAlign="center">
            SHARE
          </Typography>
          <CardActions>
            <ButtonGroup
              variant="contained"
              color="secondary"
              aria-label="outlined primary button group"
              sx={{ margin: 'auto' }}
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
        <CardContent>
          <Typography variant="body1" component="h3" textAlign={"center"}>
            {props.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
