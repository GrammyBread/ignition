import React from 'react';
import { Skeleton } from "@mui/material";

export function ViewerLoading(): JSX.Element {
    return <Skeleton animation="wave" variant="rectangular" width="100%" height="100%" />;
}