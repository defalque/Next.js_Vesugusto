import { notoSerif } from "@/app/_lib/font";

import slide1 from "../../../public/hero.jpg";
import slide2 from "../../../public/slide2.jpg";
import slide3 from "../../../public/drinkslide.jpg";

import MainCarousel from "@/app/_components/home/MainCarousel";
import MainCarouselSlide from "@/app/_components/home/MainCarouselSlide";
import Newsletter from "@/app/_components/home/Newsletter";
import NewArrivals from "@/app/_components/home/NewArrivals";
import BestSellers from "@/app/_components/home/BestSellers";

export const metadata = {
  title: "Home",
  description:
    "Benvenuto su Vesugusto: vivi un viaggio tra sapori unici, prodotti tipici vesuviani e nuove selezioni da non perdere.",
};

const slides = [
  {
    src: slide1,
    alt: "Slide 1",
    heroHeading: "Ogni stagione ha il suo sapore",
    heroSubHeading:
      "Esplora le novità stagionali dei nostri prodotti prima che finiscano!",
    link: "/shop",
  },
  {
    src: slide2,
    alt: "Slide 2",
    heroHeading: "Porta a tavola l’anima vesuviana",
    heroSubHeading:
      "Un viaggio gastronomico caratterizzato da sapori intensi, tradizionali e sorprendenti.",
    link: "/shop?page=1&category=food",
  },
  {
    src: slide3,
    alt: "Slide 3",
    heroHeading: "Dal cratere al calice",
    heroSubHeading:
      "Esplora la nostra selezione di drink unici e territoriali, un'autenticità da sorseggiare.",
    link: "/shop?page=1&category=drink",
  },
];

export default function Page() {
  return (
    <>
      <MainCarousel>
        {slides.map((slide, index) => (
          <MainCarouselSlide
            key={index}
            src={slide.src}
            alt={slide.alt}
            heroHeading={slide.heroHeading}
            heroSubHeading={slide.heroSubHeading}
            link={slide.link}
            priority={index === 0}
            index={index}
            totalSlides={slides.length}
          />
        ))}
      </MainCarousel>

      <BestSellers font={notoSerif} />

      <NewArrivals font={notoSerif} />

      <Newsletter font={notoSerif} />
    </>
  );
}
