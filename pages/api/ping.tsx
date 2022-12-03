import { GetStaticProps } from 'next';
import { PingPage } from '../../src/interfaces/static/home.interfaces';
import { pingCosmic } from '../../src/lib/api/client';

interface PingProps {
    page: PingPage | boolean;
}

const Ping = (props: PingProps): JSX.Element => {
    if (props.page === undefined) {
        return <div>Loading...</div>
    }
    else if (!props.page) {
        return <div>Down</div>
    }
    return <div>Up</div>
}

export const getStaticProps: GetStaticProps = async (context) => {
    let pingResult = undefined;
    try {
        pingResult = await pingCosmic();
    }
    catch (ex) {
        pingResult = false;
    }

    return {
        props: {
            page: pingResult
        } as PingProps,
        revalidate: 1
    };
}

export default Ping;
