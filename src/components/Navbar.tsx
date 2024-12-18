import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";

export function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-sm border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          phelipe.com.ph
        </Link>
        
        <div className="flex items-center space-x-6">
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
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
}