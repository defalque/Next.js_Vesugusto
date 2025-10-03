import { notoSerif } from "@/app/_lib/font";

// import slide1 from "../../../public/hero1.jpg";
// import slide2 from "../../../public/hero2.jpg";
// import slide3 from "../../../public/hero3.jpg";

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
    src: "/hero1.jpg",
    alt: "Varietà di ciambelle glassate e farcite disposte su sfondo bianco, con diverse decorazioni tra cui cioccolato, granella, zuccherini colorati e glasse rosa.",
    heroHeading: "Ogni stagione ha il suo sapore",
    heroSubHeading:
      "Esplora le novità stagionali dei nostri prodotti prima che finiscano!",
    link: "/shop",
  },
  {
    src: "/hero2.jpg",
    alt: "Tre biscotti artigianali su un piatto bianco: uno con noci pecan e gocce di cioccolato, uno con cioccolato bianco e frutta secca, e uno rosso tipo red velvet con decorazioni di glassa. Accanto, una tazza di tè e una piantina su tavolo in legno chiaro.",
    heroHeading: "Porta a tavola l’anima vesuviana",
    heroSubHeading:
      "Un viaggio gastronomico caratterizzato da sapori intensi, tradizionali e sorprendenti.",
    link: "/shop?page=1&category=food",
  },
  {
    src: "/hero3.jpg",
    alt: "Cocktail ambrato servito in un bicchiere basso con grandi cubetti di ghiaccio, guarnito con scorza d’arancia tenuta da una mini molletta, mentre viene versato con un colino da barista su un bancone dorato.",
    heroHeading: "Dal cratere al calice",
    heroSubHeading:
      "Esplora la nostra selezione di drink unici e territoriali, un'autenticità da sorseggiare.",
    link: "/shop?page=1&category=drink",
  },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-[95rem]">
      <MainCarousel>
        {slides.map((slide, index) => (
          <MainCarouselSlide
            key={index}
            src={slide.src}
            alt={slide.alt}
            heroHeading={slide.heroHeading}
            heroSubHeading={slide.heroSubHeading}
            link={slide.link}
            index={index}
            totalSlides={slides.length}
          />
        ))}
      </MainCarousel>

      <BestSellers font={notoSerif} />

      <NewArrivals font={notoSerif} />

      <Newsletter font={notoSerif} />
    </div>
  );
}
