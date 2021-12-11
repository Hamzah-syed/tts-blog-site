import React, { useState, useEffect, FC } from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { getRecentPosts, getSimilarPosts } from "../../services";
import { IPost, ICategories } from "../../interfaces";

// import { grpahCMSImageLoader } from '../util';
// import { getSimilarPosts, getRecentPosts } from '../services';

interface IProps {
  slug?: string;
  categories?: string[];
}

const PostWidget: FC<IProps> = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState<IPost[]>([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <Image
              // loader={grpahCMSImageLoader}
              alt={post.title}
              height="60px"
              width="60px"
              unoptimized
              className="align-middle rounded-full"
              src={post.featuredImage.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </p>
            <Link href={`/post/${post.slug}`} key={index}>
              <a className="text-md"> {post.title}</a>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;

export const getStaticProps = async () => {
  const recentPosts = (await getRecentPosts()) || [];
  return {
    props: recentPosts,
  };
};