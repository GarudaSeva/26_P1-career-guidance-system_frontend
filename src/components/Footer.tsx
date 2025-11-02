import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>© 2025 AI Career Discovery</span>
          <span className="hidden md:inline">•</span>
          <span className="flex items-center gap-1">
            Built with <Heart className="h-4 w-4 text-primary fill-primary" /> using GenAI
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
