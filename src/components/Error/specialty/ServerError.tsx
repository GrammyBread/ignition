import * as React from 'react';
import { ErrorPage } from "../Error";

interface ServerErrorProps {
    id?: string;
}

export default function ServerErrorPage({ id }: ServerErrorProps): JSX.Element {
    if (id) {
        let message = `<p style="text-align: center;">Sorry! We&#39;re having trouble serving your request 😭&nbsp;</p>
        <p style="text-align: center;">ErrorCode: ${id}</p>
        <p style="text-align: center;">Things are on fire 🔥! Check back later.</p>`;
        return <ErrorPage isHTML={true} message={message} />
    }
    return <ErrorPage message="Things are on fire 🔥! Check back later." />;
}
