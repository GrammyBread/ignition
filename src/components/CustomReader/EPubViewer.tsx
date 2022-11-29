import * as React from 'react';
import Epub from 'epubjs';
import Book, { BookOptions } from 'epubjs/types/book';
import Rendition, { DisplayedLocation, Location, RenditionOptions } from 'epubjs/types/rendition';
import { NavItem } from 'epubjs/types/navigation';
import { styled } from '@mui/material/styles';
import TableOfContents from '../TableOfContents/Table/Table';
import { ViewerFailed } from './ViewerError';
import { Orientiation } from './CustomerReader';

export interface EpubViewerProps {
    url: string | ArrayBuffer;
    loadingView: JSX.Element;
    epubInitOptions: BookOptions;
    bookTitle: string;
    styles: EpubViewerStyles;
    orientation: Orientiation;
    location?: DisplayedLocation;
    locationChanged?: (newLocation: DisplayedLocation) => void;
    tocChanged?: (newTableOfContents: NavItem[]) => void;
    renditionHeight?: string;
    renditionWidth?: string;
    renditionOptions?: RenditionOptions;
    renditionChanged?: (rendition: Rendition) => void;
    handleKeyPress?: (event: KeyboardEvent) => any;
};

export interface EpubViewerState {
    isLoaded: boolean;
    tableOfContents: NavItem[] | [];
    errorOccured: boolean;
    errorMessage?: string;
};

export interface EpubViewerStyles {
    view: React.CSSProperties;
    holder: React.CSSProperties;
}

const ViewerDiv = styled('div', {
    shouldForwardProp: (prop) => prop !== 'style',
})<{ style: React.CSSProperties }>(({ style }) => ({
    overflow: 'auto',
    ".epub-container": {
        overflow: "visible !important",
    },
    ...style
}));

export class EpubViewer extends React.Component<EpubViewerProps, EpubViewerState> {
    viewerRef: React.RefObject<HTMLDivElement>;
    book: Book | undefined;
    rendition: Rendition | undefined;
    location?: DisplayedLocation;
    prevPage?: () => void;
    nextPage?: () => void;

    constructor(props: EpubViewerProps) {
        super(props);
        this.state = {
            isLoaded: false,
            tableOfContents: [],
            errorOccured: false
        }
        this.viewerRef = React.createRef();
        this.location = this.props.location;
        this.book = this.rendition = this.prevPage = this.nextPage = undefined;
    }

    getBook(): Book | undefined {
        return this.book;
    }

    componentDidMount(): void {
        this.initBook()
        document.addEventListener('keyup', this.handleKeyPress, false)
    }

    componentWillUnmount(): void {
        if (this.book) {
            this.book.destroy();
        }
        this.book = this.rendition = this.prevPage = this.nextPage = undefined;
        document.removeEventListener('keyup', this.handleKeyPress, false);
    }

    shouldComponentUpdate(nextProps: Readonly<EpubViewerProps>, nextState: Readonly<EpubViewerState>, nextContext: any): boolean {
        return (
            !this.state.isLoaded ||
            nextProps.location !== this.props.location ||
            nextProps.location !== this.props.location
        )
    }

    componentDidUpdate(prevProps: Readonly<EpubViewerProps>, prevState: Readonly<EpubViewerState>, snapshot?: any): void {
        if (
            this.props.location && this.rendition &&
            prevProps.location !== this.props.location &&
            this.location !== this.props.location
        ) {
            this.rendition.display(this.props.location.location)
        }
        if (prevProps.url !== this.props.url) {
            this.initBook();
        }
        if(prevProps.orientation !== this.props.orientation) {
            this.initReader();
        }
    }

    initBook() {
        const { url, tocChanged, epubInitOptions } = this.props
        try {
            if (this.book) {
                this.book.destroy();
            }

            this.book = Epub(url, epubInitOptions);
            this.book.loaded.navigation.then(({ toc }) => {
                this.setState(
                    {
                        isLoaded: true,
                        tableOfContents: toc
                    },
                    () => {
                        tocChanged && tocChanged(toc)
                        this.initReader()
                    }
                )
            })
        }
        catch (error) {
            let errorMessage = "Unknown Error Occured";
            if (typeof error === "string") {
                errorMessage = error.toUpperCase();
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            this.setState(
                {
                    isLoaded: false,
                    tableOfContents: [],
                    errorOccured: true,
                    errorMessage: errorMessage
                }
            )
        }
    }

    async initReader() {
        const { tableOfContents } = this.state;
        const { location, renditionOptions, renditionChanged } = this.props;
        const node = this.viewerRef.current;
        const options = {
            flow: 'scrolled-doc',
            width: '100%',
            ...renditionOptions
        } as RenditionOptions

        try {
            if (node && this.book) {

                const renderRendition: (element: Element, options?: RenditionOptions) => Rendition = this.book.renderTo.bind(this.book);
                this.rendition  = await debounce(renderRendition, 30000)(node, options);

                if (this.rendition) {
                    this.prevPage = () => {
                        this.rendition!.prev();
                    }
                    this.nextPage = () => {
                        this.rendition!.next();
                    }
                    this.registerEvents();
                    renditionChanged && renditionChanged(this.rendition);

                    if (typeof location === "string" || typeof location === "number") {
                        this.rendition.display(location);
                    }
                    else if (tableOfContents.length > 0 && tableOfContents[0].href) {
                        this.rendition.display(tableOfContents[0].href);
                    }
                    else {
                        this.rendition.display();
                    }
                }
            }
        }
        catch (error) {
            let errorMessage = "Unknown error occured.";
            if (typeof error === "string") {
                errorMessage = error.toUpperCase();
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            this.setState(
                {
                    isLoaded: false,
                    tableOfContents: [],
                    errorOccured: true,
                    errorMessage: errorMessage
                }
            )
        }
    }

    handleKeyPress = ({ key }: KeyboardEvent): any => {
        key && key === 'ArrowRight' && this.nextPage && this.nextPage();
        key && key === 'ArrowLeft' && this.prevPage && this.prevPage();
    }

    registerEvents() {
        const { handleKeyPress } = this.props;
        if (this.rendition) {
            this.rendition.on('keyup', handleKeyPress || this.handleKeyPress);
        }
    }

    renderBook() {
        const { styles } = this.props
        return <ViewerDiv ref={this.viewerRef} style={styles.view} />
    }

    renderError() {
        const { errorOccured, errorMessage } = this.state
        const { bookTitle } = this.props;
        return errorOccured && <ViewerFailed errorMessage={errorMessage || ''} title={bookTitle} />
    }

    render() {
        const { isLoaded, errorOccured } = this.state
        const { loadingView, styles } = this.props
        return (
            <div className='holder' style={styles.holder}>
                {(isLoaded && this.renderBook()) ||
                    (errorOccured && this.renderError()) ||
                    loadingView}
            </div>
        );
    }
}


export const debounce = <F extends (...args: any) => any>(func: F, waitFor: number) => {
    let timeout: NodeJS.Timeout | null;  
    return (...args: Parameters<F>): Promise<ReturnType<F>> =>
      new Promise(resolve => {
        if (timeout) {
          clearTimeout(timeout)
        }
  
        timeout = setTimeout(() => resolve(func(...args)), waitFor)
      })
  }