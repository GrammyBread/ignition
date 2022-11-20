import Image from "next/image";
import { Paper, Button } from '@mui/material';
import Styles from '../../styles/shared.module.scss';

interface ErrorPageProps {
    message: string;
    isHTML?: boolean;
}

export function CustomErrorPage({ message, isHTML }: ErrorPageProps): JSX.Element {
    let randomErrorImageNum = Math.floor(Math.random() * 4) + 1;
    let errorImage = `/assets/error/Error${randomErrorImageNum}.svg`;
    return (
        <>
            <div className={Styles.errorContentHolder} >
                <Paper className={Styles.mainContentError} >
                    <h1><strong>Sorry!</strong></h1>
                    {isHTML ? <p dangerouslySetInnerHTML={{ __html: message }} />
                        :
                        <p>{message}</p>
                    }
                </Paper>
                <Button className={Styles.errorReturnButton} color="warning" variant="contained">Take Me To Safety</Button>
            </div>
            <Image className={Styles.backgroundImageError} alt="" priority={true} src={errorImage} fill style={{
                objectFit: 'cover',
                objectPosition: 'center'
            }} />
        </>
    );
}
