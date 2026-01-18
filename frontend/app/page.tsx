import { HeroSection } from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import { getHomePage, getStrapiData } from "@/lib/strapi";

export async function generateMetadata() {
  const strapiData = await getHomePage();
  const { title, description } = strapiData || {};
  return {
    title: title || "Default Title",
    description: description || "Default description",
  };
}
export default async function Home() {
  
  const strapiData = await getHomePage();
  const { title, description } = strapiData || {};
  const [heroSection] = strapiData?.sections ||[];
  return (
    <main className="container mx-auto py-6">
      <HeroSection data={{...heroSection, title, description}} />
    </main>
    
  );
}
