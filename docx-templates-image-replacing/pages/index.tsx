import React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import styles from './index.module.css';

interface IndexPageStaticProps {}

export const getStaticProps: GetStaticProps<IndexPageStaticProps> = async (context) => {
  return { props: {} };
};

const IndexPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  return (
    <div className={styles.page}>
      <a className={styles.download} href="/api/random-resume">
        Download random resume
      </a>
      <a className={styles.template} href="/resume-template.docx">
        View resume template
      </a>
    </div>
  );
};

export default IndexPage;
