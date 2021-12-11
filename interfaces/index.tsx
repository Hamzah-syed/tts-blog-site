export interface IPostsData {
  postsConnection: {
    edges: IPosts[];
  };
}
export interface IPosts {
  node: IPost;
  cursor?: string
}
export interface IPost {
  id: string;
  author: IAuthor;
  slug: string;
  title: string;
  createdAt: string;
  featuredpost: string;
  excerpt: string;
  featuredImage: {
    url: string;
  };
  categories: ICategories[];
  content: {
    raw: any;
  };
  comments?: IComment
}

export interface IAuthor {
  bio: string;
  name: string;
  id: string;
  photo: {
    url: string;
  };
}
export interface IComment {
  name: string
  email: string
  comment: string
  slug: string
  createdAt?: string
}

export interface ICategories {
  name: string;
  slug: string;
}
