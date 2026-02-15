import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground">
            Sorry, we could not find the page you are looking for. The page may have been moved or does not exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-4">
            You might be looking for:
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/" className="text-sm text-primary hover:underline">
              Homepage
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/sectors/it-stocks" className="text-sm text-primary hover:underline">
              IT Stocks
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/sectors/banking-stocks" className="text-sm text-primary hover:underline">
              Banking Stocks
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/stocks/reliance" className="text-sm text-primary hover:underline">
              Reliance
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}