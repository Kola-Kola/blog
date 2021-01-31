import dynamic from "next/dynamic"
import { fetchPostSlugs } from "../../setup/fetchPostSlugs"

export async function getStaticPaths() {
  const slugs = await fetchPostSlugs()

  return {
    paths: slugs?.map((slug) => ({
      params: { slug }
    })),
    fallback: false,
  };
}

export const getStaticProps = (ctx) => {
  const slug = ctx.params?.slug

  return {
    props: {
      slug,
    },
  }
}

const Post = ({ slug }) => {
  const Mdx = dynamic(() => import(`../../content/posts/${slug}/index.mdx`));

  return (
    <div>Post page <Mdx /></div>
  )
}

export default Post