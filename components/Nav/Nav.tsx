import { Slide, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { FooterProps } from '../Footer/Footer';
import Styles from './Nav.module.scss';
import * as React from 'react';

export default function Navigation(props: FooterProps) {
    const containerRef = React.useRef(null);
    const imageStyle = {
        opacity: props.state ? '1' : '.5'
    }

    return (
        <Box className={Styles.navbar} sx={{ backgroundColor: 'background.paper' }}
        ref={containerRef}>
            <Button className={Styles.logoButton} onClick={props.setState(true)}>
                <Image priority={true} src='/assets/Only1Logo.svg' layout='fill' style={imageStyle}/>
            </Button>
            <Slide in={props.state} direction="down" container={containerRef.current} unmountOnExit>
                <Typography>Only One Way To Burn It Down</Typography>
            </Slide>
        </Box>
    )
}