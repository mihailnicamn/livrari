import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import md5 from "md5";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const shrink = (text: string, length: number) => {
  if (text.length > length) {
    return text.slice(0, length) + "...";
  }
  return text;
};

const fingerPrint = () => {
  const hash = md5(
    JSON.stringify({
      appCodeName: window.navigator.appCodeName,
      appName: window.navigator.appName,
      appVersion: window.navigator.appVersion,
      cookieEnabled: window.navigator.cookieEnabled,
      hardwareConcurrency: window.navigator.hardwareConcurrency,
      language: window.navigator.language,
      languages: window.navigator.languages,
      maxTouchPoints: window.navigator.maxTouchPoints,
      onLine: window.navigator.onLine,
      platform: window.navigator.platform,
      product: window.navigator.product,
      productSub: window.navigator.productSub,
      userAgent: window.navigator.userAgent,
      vendor: window.navigator.vendor,
      vendorSub: window.navigator.vendorSub,
      webdriver: window.navigator.webdriver,
    })
  );
  console.log(hash);
  return hash;
};
fingerPrint();
