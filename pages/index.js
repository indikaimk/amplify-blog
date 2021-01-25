import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout, {siteTitle} from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import {getSortedPostsData} from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return{
    props: {
      allPostsData
    }
  }
}

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>freelance programmer</p>
        <p>This is a simple website built on Mac M1, based on <a href="https://nextjs.org/learn">Next.js tutorial.</a></p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({id, title, date}) =>(
            <li className={utilStyles.listItem} key={id}>
              {title} <br/>
              {id} <br/>
              {date} <br/>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
