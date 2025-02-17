export type PostCardType = {
  id: string;
  post: {
    id: string;
    title: string;
    slug: string;
    image: string | null;
    excerpt: string | null;
    readingTime: number | null;
    createdAt: Date;
    category: {
      slug: string;
      name: string;
    } | null;
    author: {
      id: string;
      image: string | null;
      name: string | null;
    } | null;
  };
};
