import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;display=swap"></link>
          <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;800&amp;display=swap"></link>
          <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        </Head>
        <body className="bg-slate-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
