import * as React from "react";
import Epub from "epubjs";
import Book, { BookOptions } from "epubjs/types/book";
import Rendition, { RenditionOptions } from "epubjs/types/rendition";
import { NavItem } from "epubjs/types/navigation";
import { ViewerFailed } from "./ViewerError";
import Styles from "./EPubViewer.module.scss";
import { Orientiation } from "../Books/Helpers/enums";
import { ViewerLoading } from "./ViewerLoading";
import { ThreeSixty } from "@mui/icons-material";

export interface EpubViewerProps {
  url: string | ArrayBuffer;
  epubInitOptions: BookOptions;
  bookTitle: string;
  orientation: Orientiation;
  setIsLoading: (value: boolean) => void;
  tocChanged: (newTableOfContents: NavItem[]) => void;
  location?: NavItem;
  renditionHeight?: string;
  renditionWidth?: string;
  renditionOptions?: RenditionOptions;
  renditionChanged?: (rendition: Rendition) => void;
  handleKeyPress?: (event: KeyboardEvent) => any;
}

export interface EpubViewerState {
  isLoaded: boolean;
  isLoading: boolean;
  tableOfContents: NavItem[] | [];
  errorOccured: boolean;
  errorMessage?: string;
}

export interface EpubViewerStyles {
  view: string;
  holder: string;
}

export class EpubViewer extends React.Component<
  EpubViewerProps,
  EpubViewerState
> {
  viewerRef: React.RefObject<HTMLDivElement>;
  book: Book | undefined;
  rendition: Rendition | undefined;
  location?: NavItem;
  prevPage?: () => void;
  nextPage?: () => void;
  setIsLoading: (state: boolean) => void;
  tocChanged: (newTableOfContents: NavItem[]) => void;

  constructor(props: EpubViewerProps) {
    super(props);
    this.state = {
      isLoaded: false,
      isLoading: false,
      tableOfContents: [],
      errorOccured: false,
    };
    this.viewerRef = React.createRef();
    this.setIsLoading = this.props.setIsLoading;
    this.tocChanged = this.props.tocChanged;
    this.location = this.props.location;
    this.book = this.rendition = this.prevPage = this.nextPage = undefined;
  }

  getBook(): Book | undefined {
    return this.book;
  }

  componentDidMount(): void {
    this.initBook();
    document.addEventListener("keyup", this.handleKeyPress, false);
  }

  componentWillUnmount(): void {
    if (this.book) {
      this.book.destroy();
    }
    this.book = this.rendition = this.prevPage = this.nextPage = undefined;
    document.removeEventListener("keyup", this.handleKeyPress, false);
  }

  shouldComponentUpdate(
    nextProps: Readonly<EpubViewerProps>,
    nextState: Readonly<EpubViewerState>,
    nextContext: any
  ): boolean {
    return (
      !this.state.isLoaded &&
      !this.state.isLoading ||
      nextProps.url !== this.props.url ||
      nextProps.location !== this.props.location ||
      nextProps.orientation !== this.props.orientation
    );
  }

  componentDidUpdate(
    prevProps: Readonly<EpubViewerProps>,
    prevState: Readonly<EpubViewerState>,
    snapshot?: any
  ): void {
    if (
      this.props.location &&
      this.rendition &&
      prevProps.location !== this.props.location &&
      this.location !== this.props.location &&
      this.props.location.href
    ) {
      this.rendition.display(this.props.location.href);
    }
    if (prevProps.url !== this.props.url) {
      this.initBook();
    }
    if (prevProps.orientation !== this.props.orientation) {
      this.initBook();
    }
  }

  setErrorState(errorMessage: string, error?: any) {
    let detailedErrors = errorMessage;
    if (error) {
      if (typeof error === "string") {
        detailedErrors = `${errorMessage}\nDetails: ${error.toUpperCase()}`;
      } else if (error instanceof Error) {
        detailedErrors = `${errorMessage}\nDetails: ${error.message}`;
      }
    }

    console.log(detailedErrors);

    this.setState({
      isLoaded: false,
      tableOfContents: [],
      errorOccured: true,
      errorMessage: errorMessage,
    });

    this.setIsLoading(false);
  }

  initBook() {
    const { url, epubInitOptions } = this.props;
    const node = this.viewerRef.current;

    this.setState({
      isLoaded: false,
      isLoading: true,
      errorOccured: false,
      errorMessage: undefined,
    });
    this.setIsLoading(true);

    try {
      if (this.book) {
        this.book.destroy();
      }
    } catch (error) {
      let errorMessage = "Could not destory existing book. Please reload page.";
      this.setErrorState(errorMessage, error);
    }

    try {
      const viewer = this;
      this.book = Epub(url);
      const book = this.book;    
      if (this.book && node) {
          this.rendition = book.renderTo(node, {
            manager: "continuous",
            flow: "scrolled",
            width: "100%",
            height: "100%"
          });
          const rendition = this.rendition;

          var displayed = rendition.display();

          book.ready.then(() => {            
            displayed.then(function (renderer) {
              book.loaded.navigation.then(({toc}) => {
                viewer.setState({
                  isLoaded: true,
                  isLoading: false,
                  errorOccured: false,
                  errorMessage: undefined
                },
                () => {
                  viewer.tocChanged && viewer.tocChanged(toc)
                  viewer.setIsLoading(false);
                })
              });
              //Add location logic later
            });
          });
        }
    } catch (error) {
      let errorMessage = "Could not load book! Please reload page.";
      this.setErrorState(errorMessage, error);
    };
  }

  handleKeyPress = ({ key }: KeyboardEvent): any => {
    key && key === "ArrowRight" && this.nextPage && this.nextPage();
    key && key === "ArrowLeft" && this.prevPage && this.prevPage();
  };

  registerEvents() {
    const { handleKeyPress } = this.props;
    if (this.rendition) {
      this.rendition.on("keyup", handleKeyPress || this.handleKeyPress);
    }
  }

  renderBook() {
    return <div ref={this.viewerRef} className={Styles.epubViewer} />;
  }

  renderError() {
    const { errorOccured, errorMessage } = this.state;
    const { bookTitle } = this.props;
    return (
      errorOccured && (
        <ViewerFailed errorMessage={errorMessage || ""} title={bookTitle} />
      )
    );
  }

  render() {
    const { isLoading, errorOccured } = this.state;
    return (
      <div className={Styles.viewerHolder}>
        {!errorOccured ? this.renderBook()
        : this.renderError()}
        {isLoading && <ViewerLoading/>}
      </div>
    );
  }
}

export const debounce = <F extends (...args: any) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: NodeJS.Timeout | null;
  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise((resolve) => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
};
