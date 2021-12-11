import React, { FC } from "react";
import { getPostDetails, getPosts } from "../../services/index";
import {
  PostWidget,
  Categories,
  PostDetail,
  Author,
  CommentsForm,
  Comments,
} from "../../components/shared";
import { IPost } from "../../interfaces";

interface IProps {
  post: IPost;
}

const Post: FC<IProps> = ({ post }) => {
  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post.author} />
            {/* <AdjacentPosts slug={post.slug} createdAt={post.createdAt} /> */}
            <CommentsForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget
                slug={post.slug}
                categories={post.categories.map((category) => category.slug)}
              />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;

export const getStaticProps = async ({ params }) => {
  const post = await getPostDetails(params.slug);
  return {
    props: { post },
  };
};

export const getStaticPaths = async () => {
  const posts = await getPosts();

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: false,
  };
};
