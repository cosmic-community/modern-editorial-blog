export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  type: string;
  created_at: string;
  modified_at: string;
  metadata: Record<string, any>;
}

export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    bio: string;
    avatar: {
      url: string;
      imgix_url: string;
    };
  };
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    description: string;
  };
}

export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    content: string;
    cover_image: {
      url: string;
      imgix_url: string;
    };
    author: Author;
    category: Category;
  };
}