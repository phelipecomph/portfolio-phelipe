import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, Github, Linkedin, Youtube } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { Button } from "./ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function Navbar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link to="/" className="hover:text-primary transition-colors">
        {t("nav.home")}
      </Link>
      <Link to="/projects" className="hover:text-primary transition-colors">
        {t("nav.projects")}
      </Link>
      <Link to="/blog" className="hover:text-primary transition-colors">
        {t("nav.blog")}
      </Link>
      <Link to="/contact" className="hover:text-primary transition-colors">
        {t("nav.contact")}
      </Link>
    </>
  );

  const SocialLinks = () => (
    <div className="flex items-center gap-4">
      <a href="https://github.com/phelipecomph" target="_blank" rel="noopener noreferrer">
        <Github className="w-5 h-5" />
      </a>
      <a href="https://linkedin.com/in/phelipemuller" target="_blank" rel="noopener noreferrer">
        <Linkedin className="w-5 h-5" />
      </a>
      <a href="https://www.youtube.com/@_scientist" target="_blank" rel="noopener noreferrer">
        <Youtube className="w-5 h-5" />
      </a>
    </div>
  );

  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-sm border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          phelipe.com.ph
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLinks />
          <SocialLinks />
          <ThemeToggle />
          <LanguageToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                <NavLinks />
                <div className="pt-4">
                  <SocialLinks />
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <ThemeToggle />
                  <LanguageToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}