
import { Html, Head, Main, NextScript } from 'next/document'
import { ReactElement } from 'react'

class IgnitionDocument extends Document {
    render(): ReactElement {
        return (
            <Html>
            <Head>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap">
            </Head>
            <body>
              <Main />
              <NextScript />
            </body>
          </Html>
        );
    }
}

export default IgnitionDocument