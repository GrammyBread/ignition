import { Grid, styled, Card, useMediaQuery, CardContent, useTheme } from "@mui/material";
import Styles from "./DesktopBook.module.scss";
import TitleCover from "../TitleCover/TitleCover";
import { EpubDetails } from "../../../../../interfaces/epub/epub-reader.interface";
import { useEffect, useState } from "react";
import { EpubReaderType } from "../helpers";

const ReadingArea = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: "100%",
  borderRadius: "4px 4px 0 0"
}));

const BookArea = styled(Grid)(({ theme }) => ({
  height: '100%',
  marginTop: 0,
  marginLeft: 0,
}));

function DetermineReaderType(
  isFullpageWidth: boolean,
  isHalfPageWidth: boolean
): EpubReaderType {
  if (isFullpageWidth) return EpubReaderType.fullPageWidth;
  else if (isHalfPageWidth) return EpubReaderType.halfPageWidth;
  else return EpubReaderType.fullWidth;
}

function DetermineContentWidth(type: EpubReaderType): string {
  if (type === EpubReaderType.fullPageWidth) return "calc(8.5in + 10px)";
  else if (type === EpubReaderType.halfPageWidth) return "calc(5.5in + 10px)";
  else return "100%";
}

export default function DesktopBook(details: EpubDetails): JSX.Element {
  const theme = useTheme();
  const [script, setScriptPdf] = useState(details.smallEpub);
  const [readerType, setReaderType] = useState(EpubReaderType.fullWidth);
  const isSmallReader = useMediaQuery(`(min-width: calc(5.5in + 3in + ${theme.spacing(6)})`);
  const isLargeReader = useMediaQuery(`(min-width: calc(8.5in + 3in + ${theme.spacing(6)})`);

  useEffect(() => {
    const newReaderType = DetermineReaderType(isLargeReader, isSmallReader);
    if (readerType != newReaderType) {
      setReaderType(newReaderType);
      setScriptPdf(
        readerType === EpubReaderType.fullPageWidth
          ? details.largeEpub
          : details.smallEpub
      );
    }
  }, [isSmallReader, isLargeReader]);

  return (
    <BookArea container spacing={3}>
      <Grid item>
        <ReadingArea className={Styles.readerArea}>
          <CardContent
            sx={{
              width: DetermineContentWidth(readerType),
            }}
          ></CardContent>
        </ReadingArea>
      </Grid>
      <Grid item>
        <TitleCover {...details}></TitleCover>
      </Grid>
    </BookArea>
  );
}
