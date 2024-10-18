import React from 'react'
import Document, {Html, Head, Main, NextScript} from 'next/document'
import client from '../client'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return client.fetch('*[_type == "site-config"] {lang}.lang[0]').then((lang) => {
      return {...initialProps, lang}
    })
  }

  render() {
    return (
      <Html lang={this.props.lang || 'pt-BR'} style={{backgroundColor: '#372544', scrollBehavior: 'smooth !important'}}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
