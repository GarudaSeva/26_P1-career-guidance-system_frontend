import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>© 2025 AI Career Discovery</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
