import Link from 'next/link';
import { Waves } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-primary hover:opacity-80 transition-opacity">
          <Waves className="w-6 h-6" />
          <span>SwimStretch</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="text-foreground hover:text-primary/80 transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
            About
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link 
            href="https://www.cosmicjs.com" 
            target="_blank"
            className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Powered by Cosmic
          </Link>
        </div>
      </div>
    </header>
  );
}