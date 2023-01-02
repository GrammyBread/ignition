import React, { useState, useEffect } from "react";
import Styles from "./TouchScreenBook.module.scss";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BookHolder } from "../Helpers/Pieces/BookHolder";
import { Orientiation } from "../Helpers/enums";
import { ViewerLoading } from "../../EpubViewer/ViewerLoading";
import { EpubDetails } from "../../../../../interfaces/epub/epub-reader.interface";
import TitleCoverPortrait from "./TitleCover/TitleCoverPortrait";
import { useTheme } from "@mui/material";
import TitleCoverLandscape from './TitleCover/TitleCoverLandscape';

export default function TouchScreenBook(details: EpubDetails) {
    const theme = useTheme();
    const isLandscapeMode = useMediaQuery("(orientation: landscape)");
    const isPortraitMode = useMediaQuery("(orientation: portrait)");
    const [orientation, setOrientation] = useState<Orientiation>(
        isPortraitMode ? Orientiation.portrait : Orientiation.landscape
    );

    const loadingView = <ViewerLoading />;

    useEffect(() => {
        setOrientation(
            isPortraitMode ? Orientiation.portrait : Orientiation.landscape
        );
    }, [isLandscapeMode, isPortraitMode]);

    return (
        <BookHolder className={Styles.BookArea}>
            {orientation === Orientiation.portrait ?
                <TitleCoverPortrait {...details} />
                :
                <TitleCoverLandscape {...details} />
            }
        </BookHolder>
    );

    /* 
      <Paper square elevation={0} id="reader" sx={{
          backgroundColor: theme.palette.primary.main,
          position: 'relative',
          maxHeight: '100%',
          height: '90vh',
          width: '100%'
      }}>
          <div className={classNames(Styles.bookCover)}>
              {
                  showPullTab &&
                  <div className={classNames(Styles.puller)}>
                      {bookOpen ?
                              <ChevronLeft fontSize='large'></ChevronLeft>
                          :
                              <ChevronRight fontSize='large'></ChevronRight>
                      }
                  </div>
              }
              <div className={classNames(Styles.tocToggle, readerTypeStyles.className)}>
                  {title}
              </div>
              <Reader className={classNames(Styles.reader, readerTypeStyles.className)}
                  color={theme.palette.mode === 'dark' ? '#424242' : '#EEEEEE'}>
                  <EpubViewer
                      url={resourceUrl}
                      bookTitle="testDocument"
                      orientation={orientation}
                      loadingView={loadingView}
                      epubInitOptions={initConfig}
                      renditionWidth={readerTypeStyles.viewerWidth}
                      locationChanged={epubcifi => console.log(epubcifi)}
                  />
              </Reader>
          </div>
      </Paper>; */
}
