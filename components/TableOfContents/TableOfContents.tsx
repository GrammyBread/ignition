import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { TableOfContents } from '../../interfaces/view-data.interfaces';
import { Part } from '../../interfaces/read-metadata.interfaces';
import { Paper } from '@mui/material';

export interface TOCProps {
    data: TableOfContents;
    partDetails: Part;
}

export default function TableOfContents(props: TOCProps) {
  return (
    <>
        <Paper elevation={0}></Paper>
    </>
  )
};