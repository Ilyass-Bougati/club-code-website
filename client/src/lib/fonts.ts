import { JetBrains_Mono } from "next/font/google";

export const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"], // normal + bold
  style: ["normal", "italic"], // tu peux forcer italic aussi
  display: "swap",
});
