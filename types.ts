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

export interface Stroke extends CosmicObject {
  type: 'strokes';
  metadata: {
    icon: {
      url: string;
      imgix_url: string;
    };
    description: string;
  };
}

export interface Event extends CosmicObject {
  type: 'events';
  metadata: {
    distance_range: string;
    description: string;
  };
}

export interface Stretch extends CosmicObject {
  type: 'stretches';
  metadata: {
    video_guide?: {
      url: string;
    };
    animation?: {
      url: string;
      imgix_url: string;
    };
    instructions: string;
    duration_seconds: number;
    target_strokes?: Stroke[];
    target_events?: Event[];
  };
}