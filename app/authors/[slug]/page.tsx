// app/authors/[slug]/page.tsx
import { cosmic, is404 } from '@/lib/cosmic';
import { Author, Post } from '@/types';
import PostCard from '@/components/PostCard';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getAuthor(slug: string): Promise<Author | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'authors', slug })
      .props('id,title,slug,metadata')
      .depth(1);
    return object;
  } catch (error) {
    if (is404(error)) return null;
    throw error;
  }
}

async function getAuthorPosts(authorId: string): Promise<Post[]> {
  try {
    const { objects } = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.author': authorId
      })
      .props('id,title,slug,metadata,created_at')
      .depth(1);
    return objects || [];
  } catch (error) {
    if (is404(error)) return [];
    return [];
  }
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const author = await getAuthor(slug);

  if (!author) {
    notFound();
  }

  const posts = await getAuthorPosts(author.id);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto mb-16 text-center">
        {author.metadata.avatar && (
          <img 
            src={`${author.metadata.avatar.imgix_url}?w=300&h=300&fit=crop&auto=format`}
            alt={author.title}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-background shadow-lg mx-auto mb-6"
          />
        )}
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{author.title}</h1>
        <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {author.metadata.bio}
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold font-serif mb-8 pb-4 border-b border-border">
          Articles by {author.title}
        </h2>
        
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground italic">No articles published yet.</p>
        )}
      </div>
    </div>
  );
}