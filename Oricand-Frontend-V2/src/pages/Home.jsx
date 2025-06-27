import DropThemeScene from "../components/layout/DropTheme/DropThemeScene";
import Footer from "../components/layout/Footer/Footer";
import HeroSection from "../components/layout/HeroSection/HeroSection";
import Marquee from "../components/ui/Marquee";
import PoeticLine from "../components/ui/PoeticLine";
import { useCategories } from "../hooks/useCategories";
import HighlightedProducts from "../components/product/HighlightedProducts";
import OricandConcept from "../components/layout/HeroSection/OricandConcept";
import MissionSection from "../components/layout/HeroSection/MissionSection";

export default function Home() {
  const { categories, loading, error } = useCategories();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <HeroSection />
      <Marquee />
      <HighlightedProducts />
      {categories?.map((category, index) => (
        <div key={category.id}>
          <DropThemeScene category={category} />
          {index === 0 && (
            <div className="my-16 md:my-24">
              <MissionSection />
            </div>
          )}
          {index === categories.length - 2 && <OricandConcept />}
        </div>
      ))}
      <PoeticLine />    
    </>
  );
}
