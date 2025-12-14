export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-center">About Us</h1>
      <div className="prose prose-lg prose-slate mx-auto">
        <p>
          Welcome to Editorial Blog, a demonstration of what's possible when you combine modern web technologies with a powerful headless CMS.
        </p>
        <p>
          Our mission is to provide a seamless reading experience that puts content first. We believe that great typography and clean design are essential for digital storytelling.
        </p>
        <h3>Technology Stack</h3>
        <ul>
          <li><strong>Next.js 16</strong>: For server-side rendering and optimal performance.</li>
          <li><strong>Cosmic CMS</strong>: For flexible content management and API delivery.</li>
          <li><strong>Tailwind CSS</strong>: For utility-first styling and responsive design.</li>
          <li><strong>TypeScript</strong>: For type safety and better developer experience.</li>
        </ul>
        <p>
          This application is fully responsive, accessible, and optimized for search engines. It fetches content dynamically from the Cosmic API, ensuring that updates are reflected instantly.
        </p>
      </div>
    </div>
  );
}