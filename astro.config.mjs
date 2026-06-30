import { defineConfig, fontProviders } from "astro/config";

const sansWeights = [400, 500, 600, 700];
const serifWeights = [400, 500, 600, 700];

const googleSans = [
  ["Lato", "--font-lato"],
  ["Source Sans 3", "--font-source-sans-3"],
  ["IBM Plex Sans", "--font-ibm-plex-sans"],
  ["Manrope", "--font-manrope"],
  ["Plus Jakarta Sans", "--font-plus-jakarta-sans"]
];

const googleSerif = [
  ["Literata", "--font-literata"],
  ["Newsreader", "--font-newsreader"],
  ["Source Serif 4", "--font-source-serif-4"],
  ["Crimson Pro", "--font-crimson-pro"],
  ["Spectral", "--font-spectral"]
];

const fontshareSans = [
  ["Cabinet Grotesk", "--font-cabinet-grotesk"],
  ["General Sans", "--font-general-sans"],
  ["Satoshi", "--font-satoshi"]
];

export default defineConfig({
  site: "https://rishavbroy.github.io",
  fonts: [
    ...googleSans.map(([name, cssVariable]) => ({
      name,
      cssVariable,
      provider: fontProviders.google(),
      weights: sansWeights,
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"]
    })),
    ...googleSerif.map(([name, cssVariable]) => ({
      name,
      cssVariable,
      provider: fontProviders.google(),
      weights: serifWeights,
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["serif"]
    })),
    ...fontshareSans.map(([name, cssVariable]) => ({
      name,
      cssVariable,
      provider: fontProviders.fontshare(),
      weights: sansWeights,
      styles: ["normal"],
      fallbacks: ["sans-serif"]
    }))
  ]
});