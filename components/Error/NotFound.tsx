import * as React from 'react';
import { CustomErrorPage } from "./Error";

interface NotFoundProps {
    requestedItem?: string;
}

export default function NotFoundPage({ requestedItem }: NotFoundProps): JSX.Element {
    if (requestedItem != undefined) {
        let message = `<p style="text-align: center;">Sorry! We&#39;re having trouble finding&nbsp;</p>
        <p style="text-align: center;">&quot;${requestedItem}&quot;</p>
        <p style="text-align: center;">Are you sure that&#39;s what you&#39;re looking for? 🤔</p>`;
        return <CustomErrorPage message={message} />
    }
    return <CustomErrorPage message="We can't seem to find what you're looking for... 😟" />;
}
