import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'

export default function Post({ post, morePosts, preview }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
   <p>You're reached part {post.slug}</p>
  )
}

export async function getStaticProps({ params, preview = null }) {
  const data = await getPostAndMorePosts(params.slug, preview)

  return {
    props: {
      data: data
    },
  }
}

export async function getStaticPaths() {
  const allPosts = (await getAllPostsWithSlug()) || []
  return {
    paths: allPosts.map((post) => `/posts/${post.slug}`),
    fallback: true,
  }
}
