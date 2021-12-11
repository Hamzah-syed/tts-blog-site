import Head from "next/head";
import { Categories, Loader, PostCard, PostWidget } from "../components/shared/index";
import { getPosts } from "../services/index";
import { IPosts } from "../interfaces/index";
import { FeaturedPosts } from "../components/sections/home"
import router from "next/router";

// const posts = [
//   { title: "React Testing", excerpt: "Learn React Testing" },
//   { title: "React with Tailwind", excerpt: "Learn React with Tailwind" },
// ];
interface IProps {
  posts: IPosts[];
}

export default function Home({ posts }: IProps) {
  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className="grid gird-col-1 lg:grid-cols-12 ">
        <div className="lg:col-span-8 col-span-1 ">
          <div>
            {posts.map((post, index) => (
              <div key={index}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4 relative col-span-1">
          <div className="relative lg:ml-8 ml-0 lg:sticky top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
};
