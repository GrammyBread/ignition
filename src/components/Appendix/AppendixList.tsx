import { useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material';
import * as React from 'react';
import SpecialItem, { SpecialItemProps } from './HomeItems/SpecialItem';
import AppendixHomeStyles from '../../styles/appendix.module.scss';
import DocItemComponent from './HomeItems/DocItems';
import { AppendixItem } from '../../interfaces/appendices/home.interface';
import { useScroll } from 'framer-motion';
import { useState } from 'react';

const AppendixListContainer = styled('ul')(({ theme }) => ({
    display: 'flex',
    listStyle: 'none',
    height: 'fit-content',
    [theme.breakpoints.down('sm')]: {
        flexFlow: 'column'
    },
    [theme.breakpoints.between('sm', 'xl')]: {
        overflowX: 'scroll',
        flexFlow: 'row'
    },
    [theme.breakpoints.up('xl')]: {
        flexFlow: 'row',
        justifyContent: 'space-between'
    },
    alignItems: 'center',
    padding: '20px 0',
    flex: '0 0 600px',
    margin: '0 auto',
    [`& li`]: {
        [theme.breakpoints.down('sm')]: {
            margin: '20px'
        },
        [theme.breakpoints.between('xs', 'xl')]: {
            flex: '0 0 30vh'
        },
        [theme.breakpoints.only('xl')]: {
            flex: '0 0 50vh'
        },
        [theme.breakpoints.up('xl')]: {
            flex: '0 0 35vh',
            margin: '0 20px 0 0'
        },
        [theme.breakpoints.between('sm', 'xl')]: {
            margin: '0 20px 0 0'
        },
    }
}));

export interface AppendixListProps {
    CharacterProps: SpecialItemProps;
    StationProps: SpecialItemProps;
    Documents: AppendixItem[];
    changeBackground: (newImage?: string) => {};
}

interface specialLIProps {
    setInside: (val: boolean, id: string) => void;
    children: React.ReactNode;
    id: string;
}

const SpecialLi = ({ setInside, children, id }: specialLIProps) => {
    const ref = React.useRef(null);
    const [isInside, setIsInside] = useState(false)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["end end", "start start"]
    });

    React.useEffect(() => {
        scrollYProgress.onChange((progress) => {
            const areWeInside = (progress * 100) > 10 && (progress * 100) < 20;
            if (isInside !== areWeInside) {
                setInside(areWeInside, id);
                setIsInside(areWeInside)
            }
        });
    }, [scrollYProgress, setInside, isInside])

    return <li ref={ref}>
        {children}
    </li>
}

export default function AppendixList(props: AppendixListProps): JSX.Element {
    const theme = useTheme();
    const isTinyScreen = useMediaQuery(theme.breakpoints.down('sm'));

    let imageStates = props.Documents.map((doc) => ({ id: doc.document.slug, image: doc.image.url, state: false }));
    imageStates.push(({ id: 'c', image: props.CharacterProps.item.image.url, state: false }));
    imageStates.push(({ id: 's', image: props.StationProps.item.image.url, state: false }));

    const [childStates, setChildStates] = useState(imageStates)

    // The scroll listener
    React.useEffect(() => {
        if (isTinyScreen) {
            const insideOfChild = childStates.find((child) => child.state == true)
            if (insideOfChild) {
                props.changeBackground(insideOfChild.image);
            }
        }
        else {
            props.changeBackground();
        }
    }, [childStates, isTinyScreen]);

    const changeChildState = (state: boolean, id: string) => {
        let hasChangeHappened = false;
        let newStates = childStates.map((child) => {
            if (child.id === id && child.state != state) {
                hasChangeHappened = true;
                return {
                    id: child.id,
                    image: child.image,
                    state
                }
            }
            else {
                return child;
            }
        })
        if (hasChangeHappened) {
            setChildStates(newStates);
        }
    }

    return <AppendixListContainer className={isTinyScreen ? '' : AppendixHomeStyles.appendixList}>
        <SpecialLi setInside={changeChildState} id='c'>
            <SpecialItem {...props.CharacterProps} />
        </SpecialLi>
        {props.Documents.map((item) => {
            return <SpecialLi setInside={changeChildState} id={item.document.slug} key={item.document.slug}>
                <DocItemComponent key={item.document.slug} {...item} />
            </SpecialLi>;
        })
        }
        <SpecialLi setInside={changeChildState} id='s'>
            <SpecialItem {...props.StationProps} />
        </SpecialLi>
    </AppendixListContainer>;
}
