import { useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material';
import * as React from 'react';
import SpecialItem, { SpecialItemProps } from './HomeItems/SpecialItem';
import AppendixHomeStyles from '../../styles/appendix.module.scss';
import DocItemComponent from './HomeItems/DocItems';
import { AppendixItem } from '../../interfaces/appendices/home.interface';

const AppendixListContainer = styled( 'ul' )( ( { theme } ) => ( {
    display: 'flex',
    listStyle: 'none',
    height: 'fit-content',
    [ theme.breakpoints.only( 'xs' ) ]: {
        overflowY: 'scroll',
        flexFlow: 'column'
    },
    [ theme.breakpoints.between( 'sm', 'xl' ) ]: {
        overflowX: 'scroll',
        flexFlow: 'row'
    },
    alignItems: 'center',
    padding: '20px 0',
    flex: '0 0 600px',
    margin: '0 auto',
    [ `& li` ]: {
        [ theme.breakpoints.only( 'xs' ) ]: {
            margin: '20px'
        },
        [ theme.breakpoints.between('xs', 'md') ]: {
            flex: '0 0 30vh'
        },
        [ theme.breakpoints.between('md', 'xl') ]: {
            flex: '0 0 40vh'
        },
        [ theme.breakpoints.only('xl') ]: {
            flex: '0 0 50vh'
        },
        [ theme.breakpoints.between( 'sm', 'xl' ) ]: {
            margin: '0 20px 0 0'
        },
    }
} ) );

export interface AppendixListProps
{
    CharacterProps: SpecialItemProps;
    StationProps: SpecialItemProps;
    Documents: AppendixItem[];
}

export default function AppendixList ( props: AppendixListProps ): JSX.Element
{
    const theme = useTheme();
    const isTinyScreen = useMediaQuery( theme.breakpoints.only( 'xs' ) );

    return <AppendixListContainer className={ isTinyScreen ? '' : AppendixHomeStyles.appendixList }>
        <li>
            <SpecialItem { ...props.CharacterProps } />
        </li>
        { props.Documents.map( ( item ) =>
        {
            return <li key={ item.document.slug }>
                <DocItemComponent key={ item.document.slug } { ...item } />
            </li>;
        } )
        }
        <li>
            <SpecialItem { ...props.StationProps } />
        </li>
    </AppendixListContainer>;
}
