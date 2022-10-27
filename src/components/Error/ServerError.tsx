import * as React from 'react';
import { CustomErrorPage } from "./Error";

interface ServerErrorProps {
    id?: string;
}

export default function ServerErrorPage({ id }: ServerErrorProps): JSX.Element {
    if (id != undefined) {
        let message = `<p style="text-align: center;">Sorry! We&#39;re having trouble serving your request 😭&nbsp;</p>
        <p style="text-align: center;">ErrorCode: ${id}</p>
        <p style="text-align: center;">Things are on fire 🔥! Check back later.</p>`;
        return <CustomErrorPage isHTML={true} message={message} />
    }
    return <CustomErrorPage message="Things are on fire 🔥! Check back later." />;
}
