import * as React from "react";
import {
  Button,
  Card,
  CardMedia,
  CardHeader,
  CardActions,
  CardContent,
} from "@mui/material";
import { Book } from "@mui/icons-material";
import Link from "next/link";
import {
  INTRO_SECTION_PATH,
  NORMAL_SECTION_PATH,
} from "../../../mappers/pathname.mapper";
import { FeaturedScript } from "../../../mappers/availability/nav-script.mappers";
import Styles from "./FeaturedSection.module.scss";
import { Theme } from "@mui/material";

export default function FeaturedSection(
  script: FeaturedScript,
  theme: Theme
): JSX.Element {
  return (
    <Card
      sx={{
        margin: `${theme.spacing(3)} ${theme.spacing(3)} 0 0 !important`,
        backgroundColor: "background.paper",
        color: "text.secondary",
      }}
    >
      <CardHeader
        title={script.section.header}
        subheader={`Released on ${script.section.releaseDate}`}
      />
      <CardContent
        sx={{
          height: "60vh",
          overflow: "hidden",
          width: "100%",
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            position: "absolute",
            width: "100% !important",
            margin: "0",
            top: "0",
            bottom: "0",
            right: "0",
            left: "0",
          }}
          image={script.image.imgix_url}
          alt={`${script.section.header} cover image`}
        />
      </CardContent>
      {script.section.fullPath && (
        <CardActions
          disableSpacing
          sx={{
            justifyContent: "center",
            a: {
              textDecoration: "none",
              width: "100%"
            }
          }}
        >
          <Link
            href={{
              pathname: script.isHead
                ? INTRO_SECTION_PATH
                : NORMAL_SECTION_PATH,
              query: script.section.fullPath,
            }}
          >
            <Button
              className={Styles.readButton}
              variant="contained"
              startIcon={<Book />}
              sx={{
                width: "100%"
              }}
            >
              Read Now
            </Button>
          </Link>
        </CardActions>
      )}
    </Card>
  );
}
