"use client";
import Image from "next/image";
import { HTMLAttributes, useEffect, useState } from "react";

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

type ImageWithFallbackProps = HTMLAttributes<HTMLDivElement> & {
  fallback?: string;
  alt: string;
  src: string;
  objectFit: string;
};

export function ImageWithFallback({
  fallback = "/fallback.jpg",
  alt,
  src,
  objectFit,
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
    <div {...props}>
      <Image
        fill
        alt={alt}
        objectFit={objectFit}
        onErrorCapture={() => setUrl(fallback)}
        src={url}
        className="pointer-events-none"
        style={{
          borderRadius: props.style.borderRadius,
        }}
      />
    </div>
  );
}
