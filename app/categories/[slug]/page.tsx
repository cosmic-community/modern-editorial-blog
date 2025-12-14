// app/categories/[slug]/page.tsx
import { cosmic, is404 } from '@/lib/cosmic';
import { Category, Post } from '@/types';
import PostCard from '@/components/PostCard';
import { notFound } from 'next/navigation';
import { Tag } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getCategory(slug: string): Promise<Category | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props('id,title,slug,metadata')
      .depth(1);
    return object;
  } catch (error) {
    if (is404(error)) return null;
    throw error;
  }
}

async function getCategoryPosts(categoryId: string): Promise<Post[]> {
  try {
    const { objects } = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.category': categoryId
      })
      .props('id,title,slug,metadata,created_at')
      .depth(1);
    return objects || [];
  } catch (error) {
    if (is404(error)) return [];
    return [];
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const posts = await getCategoryPosts(category.id);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-6">
          <Tag className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{category.title}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {category.metadata.description}
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold font-serif mb-8 pb-4 border-b border-border">
          Latest in {category.title}
        </h2>
        
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground italic">No articles found in this category.</p>
        )}
      </div>
    </div>
  );
}