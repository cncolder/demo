import type { AppProps } from 'next/app';
import './styles.css';

const _App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default _App;
