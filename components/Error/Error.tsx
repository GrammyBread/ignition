import Image from "next/image";
import { FallbackProps } from 'react-error-boundary';
import { Paper, Button } from '@mui/material';
import Styles from '../../styles/shared.module.scss';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps): JSX.Element {
    return <CustomErrorPage message="We're having trouble getting what you requested" />;
}

interface ErrorPageProps {
    message: string;
}

export function CustomErrorPage({ message }: ErrorPageProps): JSX.Element {
    let randomErrorImageNum = Math.floor(Math.random() * 4) + 1;
    let errorImage = `/assets/error/Error${randomErrorImageNum}.svg`;
    return (
        <>
            <div className={Styles.errorContentHolder} >
                <Paper className={Styles.mainContentError} >
                    <h1><strong>Sorry!</strong></h1>
                    <p dangerouslySetInnerHTML={{ __html: message }} />
                </Paper>
                <Button className={Styles.errorReturnButton} color="warning" variant="contained">Take Me To Safety</Button>
            </div>
            <Image className={Styles.backgroundImageError} priority={true} src={errorImage} layout='fill' objectFit='cover' objectPosition='center' />
        </>
    );
}
