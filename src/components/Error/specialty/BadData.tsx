import * as React from 'react';
import { ErrorPage } from "../Error";

interface ServerErrorProps {
    id?: string;
}

export default function BadDataPage({ id }: ServerErrorProps): JSX.Element {
    if (id) {
        let message = `<p style="text-align: center;">Something wen&#39;t wrong! 😣</p>
        <p style="text-align: center;">ErrorCode: ${id}</p>
        <p style="text-align: center;">We recieved data that doesn&#39;t make sense.</p>`;
        return <ErrorPage isHTML={true} message={message} />
    }
    return <ErrorPage message="Something wen&#39;t wrong! 😣 Check back later." />;
}
