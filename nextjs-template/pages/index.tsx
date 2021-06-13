import React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import './index.css';

interface IndexPageProps {
    locale?: string;
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async (context) => {
    return { props: { locale: context.locale } };
};

const IndexPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ locale }) => {
    return <div className="page">{locale}</div>;
};

export default IndexPage;
