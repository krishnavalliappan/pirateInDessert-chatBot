import { Noto_Sans, Noto_Sans_Mono } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-noto-sans",
});
const notoMono = Noto_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-noto-mono",
});

export { notoSans, notoMono };
