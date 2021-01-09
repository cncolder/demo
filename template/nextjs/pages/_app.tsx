import type { AppProps } from 'next/app';
import './styles.css';

export default ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
};
