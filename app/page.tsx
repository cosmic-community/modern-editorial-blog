import { cosmic, is404 } from '@/lib/cosmic';
import PostCard from '@/components/PostCard';
import { Post } from '@/types';
import Link from 'next/link';

// Helper to fetch posts safely
async function getPosts(): Promise<Post[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'posts' })
      .props('id,title,slug,metadata,created_at')
      .depth(1)
      .limit(10);
      
    return objects || [];
  } catch (error) {
    if (is404(error)) return [];
    console.error('Error fetching posts:', error);
    return [];
  }
}

async function getCategories() {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'categories' })
      .props('id,title,slug,metadata')
      .depth(1);
    return objects || [];
  } catch (error) {
    if (is404(error)) return [];
    return [];
  }
}

export default async function HomePage() {
  const posts = await getPosts();
  const categories = await getCategories();
  
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Category Nav */}
      <div className="flex flex-wrap gap-4 mb-12 justify-center border-b border-border pb-6">
        <Link 
          href="/" 
          className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium"
        >
          All Stories
        </Link>
        {categories.map((category: any) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="px-4 py-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            {category.title}
          </Link>
        ))}
      </div>

      {featuredPost ? (
        <section>
          <PostCard post={featuredPost} featured={true} />
        </section>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          No posts found. Add some content to your Cosmic dashboard.
        </div>
      )}

      {recentPosts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold">Latest Stories</h2>
            <div className="h-px bg-border flex-1 ml-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}