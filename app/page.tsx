import { cosmic, is404 } from '@/lib/cosmic';
import PostCard from '@/components/PostCard';
import { Post, Stretch } from '@/types';
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

async function getStretches(): Promise<Stretch[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'stretches' })
      .props('id,title,slug,metadata')
      .depth(1)
      .limit(6);
    return objects || [];
  } catch (error) {
    if (is404(error)) return [];
    console.error('Error fetching stretches:', error);
    return [];
  }
}

export default async function HomePage() {
  const posts = await getPosts();
  const categories = await getCategories();
  const stretches = await getStretches();
  
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

      {/* Featured Post */}
      {featuredPost && (
        <section className="mb-16">
          <PostCard post={featuredPost} featured={true} />
        </section>
      )}

      {/* Stretches Section */}
      {stretches.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold">Swimming Stretches</h2>
            <div className="h-px bg-border flex-1 ml-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stretches.map((stretch) => (
              <div key={stretch.id} className="group flex flex-col h-full bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {stretch.metadata.animation && (
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <img 
                      src={`${stretch.metadata.animation.imgix_url}?w=800&auto=format,compress`}
                      alt={stretch.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {stretch.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs font-medium px-2 py-1 bg-secondary text-secondary-foreground rounded-md">
                      {stretch.metadata.duration_seconds}s
                    </span>
                    {stretch.metadata.target_strokes?.map((stroke) => (
                      <span key={stroke.id} className="text-xs font-medium px-2 py-1 bg-muted text-muted-foreground rounded-md">
                        {stroke.title}
                      </span>
                    ))}
                  </div>
                  <div className="text-muted-foreground text-sm line-clamp-3 flex-1 prose prose-sm max-w-none">
                    {stretch.metadata.instructions}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {posts.length === 0 && stretches.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No content found. Add some content to your Cosmic dashboard.
        </div>
      )}

      {/* Recent Posts */}
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