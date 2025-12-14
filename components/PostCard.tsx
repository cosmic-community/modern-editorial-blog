import Link from 'next/link';
import { Post } from '@/types';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const { title, slug, metadata, created_at } = post;
  
  if (featured) {
    return (
      <article className="group relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
        <div className="aspect-[16/9] md:aspect-[4/3] overflow-hidden rounded-lg bg-muted">
          {metadata.cover_image && (
            <img 
              src={`${metadata.cover_image.imgix_url}?w=1200&h=900&fit=crop&auto=format,compress`} 
              alt={title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {metadata.category && (
              <Link 
                href={`/categories/${metadata.category.slug}`}
                className="font-medium text-primary hover:underline"
              >
                {metadata.category.title}
              </Link>
            )}
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <time dateTime={created_at}>{format(new Date(created_at), 'MMMM d, yyyy')}</time>
            </div>
          </div>
          
          <Link href={`/posts/${slug}`} className="group-hover:text-primary/80 transition-colors">
            <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight">
              {title}
            </h2>
          </Link>
          
          <p className="text-muted-foreground line-clamp-3 md:line-clamp-4">
            {metadata.content.replace(/[#*`]/g, '').slice(0, 200)}...
          </p>
          
          {metadata.author && (
            <div className="flex items-center gap-3 mt-4">
              {metadata.author.metadata.avatar && (
                <img 
                  src={`${metadata.author.metadata.avatar.imgix_url}?w=100&h=100&fit=crop&auto=format`}
                  alt={metadata.author.title}
                  className="w-10 h-10 rounded-full object-cover border border-border"
                />
              )}
              <div className="text-sm">
                <p className="font-medium text-primary">{metadata.author.title}</p>
                <Link href={`/authors/${metadata.author.slug}`} className="text-muted-foreground hover:text-primary text-xs">
                  View Profile
                </Link>
              </div>
            </div>
          )}
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col gap-4">
      <Link href={`/posts/${slug}`} className="aspect-[3/2] overflow-hidden rounded-lg bg-muted">
        {metadata.cover_image && (
          <img 
            src={`${metadata.cover_image.imgix_url}?w=800&h=533&fit=crop&auto=format,compress`} 
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </Link>
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {metadata.category && (
            <Link 
              href={`/categories/${metadata.category.slug}`}
              className="font-medium text-primary hover:underline"
            >
              {metadata.category.title}
            </Link>
          )}
          <span>•</span>
          <time dateTime={created_at}>{format(new Date(created_at), 'MMM d, yyyy')}</time>
        </div>
        
        <Link href={`/posts/${slug}`} className="group-hover:text-primary/80 transition-colors">
          <h3 className="text-xl font-serif font-bold leading-snug">
            {title}
          </h3>
        </Link>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {metadata.content.replace(/[#*`]/g, '').slice(0, 120)}...
        </p>
        
        {metadata.author && (
          <div className="flex items-center gap-2 mt-2">
             <span className="text-xs text-muted-foreground">By</span>
             <Link href={`/authors/${metadata.author.slug}`} className="text-xs font-medium hover:underline">
               {metadata.author.title}
             </Link>
          </div>
        )}
      </div>
    </article>
  );
}