import React, { useState} from "react";
import Styles from "./TouchScreenBook.module.scss";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BookHolder, Orientiation } from "../helpers";
import { ViewerLoading } from "../../EpubViewer/ViewerLoading";
import { EpubDetails } from "../../../../../interfaces/epub/epub-reader.interface";
import useEffect from 'react';

export default function TouchScreenBook(details: EpubDetails) {

  const loadingView = <ViewerLoading />;

  return <BookHolder>
    Mobile View    
  </BookHolder>;

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
