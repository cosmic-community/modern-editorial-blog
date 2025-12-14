import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Editorial</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              A modern publishing platform built to showcase the power of headless content management.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-muted-foreground">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-muted-foreground">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Editorial Blog. All rights reserved.</p>
          <p>Built with Next.js and Cosmic.</p>
        </div>
      </div>
    </footer>
  );
}