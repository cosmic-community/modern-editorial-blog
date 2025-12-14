// app/posts/[slug]/page.tsx
import { cosmic, is404 } from '@/lib/cosmic';
import { Post } from '@/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { Calendar, Tag } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'posts', slug })
      .props('id,title,slug,metadata,created_at')
      .depth(1);
    return object;
  } catch (error) {
    if (is404(error)) return null;
    throw error;
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const { title, metadata, created_at } = post;

  return (
    <article className="min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-muted/30 border-b border-border mb-12">
        <div className="container mx-auto px-4 py-16 md:py-24 text-center max-w-4xl">
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
            {metadata.category && (
              <Link 
                href={`/categories/${metadata.category.slug}`}
                className="flex items-center gap-1 font-medium text-primary hover:underline bg-background px-3 py-1 rounded-full border border-border"
              >
                <Tag className="w-3 h-3" />
                {metadata.category.title}
              </Link>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <time dateTime={created_at}>{format(new Date(created_at), 'MMMM d, yyyy')}</time>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-8 text-balance">
            {title}
          </h1>

          {metadata.author && (
            <div className="flex items-center justify-center gap-3">
              {metadata.author.metadata.avatar && (
                <img 
                  src={`${metadata.author.metadata.avatar.imgix_url}?w=100&h=100&fit=crop&auto=format`}
                  alt={metadata.author.title}
                  className="w-12 h-12 rounded-full object-cover border-2 border-background shadow-sm"
                />
              )}
              <div className="text-left">
                <p className="text-sm font-medium text-primary">
                  Written by <Link href={`/authors/${metadata.author.slug}`} className="underline decoration-muted-foreground/30 hover:decoration-primary">{metadata.author.title}</Link>
                </p>
                <p className="text-xs text-muted-foreground">Editor</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 lg:col-start-3">
          {metadata.cover_image && (
            <figure className="mb-12 rounded-xl overflow-hidden shadow-lg">
              <img 
                src={`${metadata.cover_image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`} 
                alt={title}
                className="w-full h-auto"
              />
            </figure>
          )}

          <div className="prose prose-lg prose-slate mx-auto font-serif">
            <ReactMarkdown>{metadata.content}</ReactMarkdown>
          </div>

          <hr className="my-12 border-border" />

          {metadata.author && (
            <div className="bg-muted/30 p-8 rounded-xl border border-border flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
              {metadata.author.metadata.avatar && (
                <Link href={`/authors/${metadata.author.slug}`} className="shrink-0">
                  <img 
                    src={`${metadata.author.metadata.avatar.imgix_url}?w=200&h=200&fit=crop&auto=format`}
                    alt={metadata.author.title}
                    className="w-24 h-24 rounded-full object-cover border-2 border-background shadow-md"
                  />
                </Link>
              )}
              <div>
                <h3 className="text-xl font-bold font-serif mb-2">About {metadata.author.title}</h3>
                <p className="text-muted-foreground mb-4">{metadata.author.metadata.bio}</p>
                <Link 
                  href={`/authors/${metadata.author.slug}`}
                  className="text-primary font-medium hover:underline text-sm"
                >
                  View all posts by {metadata.author.title} &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}