import * as React from "react";
import Epub from "epubjs";
import Book, { BookOptions } from "epubjs/types/book";
import Rendition, { RenditionOptions } from "epubjs/types/rendition";
import { NavItem } from "epubjs/types/navigation";
import { ViewerFailed } from "./ViewerError";
import Styles from "./EPubViewer.module.scss";
import { Orientiation } from "../Books/helpers";

export interface EpubViewerProps {
  url: string | ArrayBuffer;
  loadingView: JSX.Element;
  epubInitOptions: BookOptions;
  bookTitle: string;
  orientation: Orientiation;
  location?: NavItem;
  tocChanged?: (newTableOfContents: NavItem[]) => void;
  renditionHeight?: string;
  renditionWidth?: string;
  renditionOptions?: RenditionOptions;
  renditionChanged?: (rendition: Rendition) => void;
  handleKeyPress?: (event: KeyboardEvent) => any;
}

export interface EpubViewerState {
  isLoaded: boolean;
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

  constructor(props: EpubViewerProps) {
    super(props);
    this.state = {
      isLoaded: false,
      tableOfContents: [],
      errorOccured: false,
    };
    this.viewerRef = React.createRef();
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
      !this.state.isLoaded ||
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
      this.initReader();
    }
  }

  initBook() {
    const { url, tocChanged, epubInitOptions } = this.props;
    try {
      if (this.book) {
        this.book.destroy();
      }

      this.book = Epub(url, epubInitOptions);
      this.book.loaded.navigation.then(({ toc }) => {
        this.setState(
          {
            isLoaded: true,
            tableOfContents: toc,
          },
          () => {
            tocChanged && tocChanged(toc);
            this.initReader();
          }
        );
      });
    } catch (error) {
      let errorMessage = "Unknown Error Occured";
      if (typeof error === "string") {
        errorMessage = error.toUpperCase();
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      this.setState({
        isLoaded: false,
        tableOfContents: [],
        errorOccured: true,
        errorMessage: errorMessage,
      });
    }
  }

  async initReader() {
    const { tableOfContents } = this.state;
    const { location, renditionOptions, renditionChanged } = this.props;
    const node = this.viewerRef.current;
    const options = {
      flow: "scrolled-doc",
      width: "calc(100% - 5px)",
      ...renditionOptions,
    } as RenditionOptions;

    if (node && this.book) {
      const viewer = this;
      const renderRendition: (
        element: Element,
        options?: RenditionOptions
      ) => Rendition = this.book.renderTo.bind(this.book);
      debounce(renderRendition, 1000)(node, options)
        .then((val) => {
          if (val) {
            viewer.rendition = val;
            viewer.prevPage = () => {
              viewer.rendition!.prev();
            };
            viewer.nextPage = () => {
              viewer.rendition!.next();
            };
            viewer.registerEvents();
            renditionChanged && renditionChanged(viewer.rendition);

            if (location) {
              viewer.rendition.display(location.href);
            } else if (tableOfContents.length > 0 && tableOfContents[0].href) {
              viewer.rendition.display(tableOfContents[0].href);
            } else {
              viewer.rendition.display();
            }
          }
        })
        .catch((error) => {
          let errorMessage = "Unknown error occured.";
          if (typeof error === "string") {
            errorMessage = error.toUpperCase();
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }
          this.setState({
            isLoaded: false,
            tableOfContents: [],
            errorOccured: true,
            errorMessage: errorMessage,
          });
        });
    }
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
    const { isLoaded, errorOccured } = this.state;
    const { loadingView } = this.props;
    return (
      <div className={Styles.viewerHolder}>
        {(isLoaded && this.renderBook()) ||
          (errorOccured && this.renderError()) ||
          loadingView}
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
