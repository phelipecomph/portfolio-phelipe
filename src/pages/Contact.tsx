import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

const Contact = () => {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-2xl animate-fadeIn">
      <h1 className="text-4xl font-bold mb-12 text-center">
        {t("contact.title")}
      </h1>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              {t("contact.name")}
            </label>
            <Input id="name" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              {t("contact.email")}
            </label>
            <Input id="email" type="email" required />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              {t("contact.message")}
            </label>
            <Textarea id="message" required className="min-h-[150px]" />
          </div>
          <Button type="submit" className="w-full">
            {t("contact.send")}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Contact;