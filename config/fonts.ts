import {
  Fira_Code as FontMono,
  Inter as FontSans,
  EB_Garamond as FontEBGaramond,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
export const fontEBGaramond = FontEBGaramond({
  subsets: ["latin"],
  variable: "--font-garamond",
});
