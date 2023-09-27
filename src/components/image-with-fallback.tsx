"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const isValidUrl = (urlString: string) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

type ImageWithFallbackProps = typeof Image & {
  fallback: string;
  alt: string;
  src: string;
};

export function ImageWithFallback({
  fallback = "/fallback.jpg",
  alt,
  src,
  ...props
}: ImageWithFallbackProps) {
  const [url, setUrl] = useState(fallback);

  useEffect(() => {
    if (isValidUrl(src)) {
      setUrl(src);
    } else {
      setUrl(fallback);
    }
  }, [src]);

  return (
    <Image
      alt={alt}
      onErrorCapture={() => setUrl(fallback)}
      src={url}
      {...props}
    />
  );
}
