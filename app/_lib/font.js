import {
  Playfair_Display,
  Roboto,
  Open_Sans,
  Noto_Sans,
  Noto_Serif,
} from "next/font/google";

export const playfair = Noto_Serif({
  subsets: ["latin"],
  display: "swap",
});

export const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
});

export const noto = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
});

// export const notoSerif = Noto_Serif({
//   subsets: ["latin"],
//   display: "swap",
// });

export const open = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});
