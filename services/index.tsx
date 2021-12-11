import { gql } from "graphql-request";
// Client
import { graphqlClient } from "./client";
// Interface
import { ICategories, IComment, IPost, IPostsData } from "../interfaces/index";

// Get posts
export const getPosts = async () => {
  const query = gql`
    query getPostQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            featuredpost
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const data: IPostsData = await graphqlClient.request(query);
  return data.postsConnection.edges;
};
// Get Post details
export const getPostDetails = async (slug) => {
  const query = gql`
  query GetPostDetails($slug: String!) {
    post(where: {slug: $slug}) {
      id
      author {
        bio
        name
        id
        photo {
          url
        }
      }
      slug
      title
      createdAt
      featuredpost
      excerpt
      featuredImage {
        url
      }
      categories {
        name
        slug
      }
      content {
        raw
      }
    }
  }
  `;
  const data: { post: IPost } = await graphqlClient.request(query, {
    slug,
  });
  return data.post;
};

// Get Recent Post
export const getRecentPosts = async () => {
  const query = gql`
    query getRecentPost {
      posts(orderBy: createdAt_ASC, last: 3) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const data: { posts: IPost[] } = await graphqlClient.request(query);
  return data.posts;
};
// Get Similar Post
export const getSimilarPosts = async (categories: string[], slug: string) => {
  const query = gql`
    query getSimilarPost($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const data: { posts: IPost[] } = await graphqlClient.request(query, {
    slug,
    categories,
  });
  return data.posts;
};

export const getCategories = async () => {
  const query = gql`
    query getCategories {
      categories {
        name
        slug
      }
    }
  `;
  const data: { categories: ICategories[] } = await graphqlClient.request(
    query
  );
  return data.categories;
};

export const submitComment = async (obj: IComment) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify(obj)
  })
  return result.json()
}

export const getComments = async (slug) => {
  const query = gql`
  query getPostComments($slug:String!) {
    comments(where:{post:{slug:$slug}}){
      comment
      name
      email
    }
  }`

  const data: { comments: IComment[] } = await graphqlClient.request(
    query,
    {
      slug
    }

  );
  return data.comments;
}

export const getFeaturedPosts = async () => {
  const query = gql`
  query getFeaturedPosts {
    posts(where: {featuredpost: true}) {
      author {
        name
        photo {
          url
        }
      }
      featuredImage {
        url
      }
      title
      slug
      createdAt
    }
  }
  
  `;

  const result: { posts: IPost[] } = await graphqlClient.request(query);

  return result.posts;
};
export const getCategoryPost = async (slug) => {
  const query = gql`
  query GetCategoryPost($slug: String!) {
    postsConnection(where: {categories_some: {slug: $slug}}) {
      edges {
        cursor
        node {
          author {
            bio
            name
            id
            photo {
              url
            }
          }
          createdAt
          slug
          title
          excerpt
          featuredImage {
            url
          }
          categories {
            name
            slug
          }
        }
      }
    }
  }
  
  
  `;

  const result: IPostsData = await graphqlClient.request(query, { slug });

  return result.postsConnection.edges;
};
