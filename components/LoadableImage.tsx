import { useState } from "react";
import Image, { ImageProps } from "next/image";
import fallbackImage from "@/public/placeholder.svg"; // Adjust the path according to your project structure

interface LoadableImageProps extends Omit<ImageProps, "src"> {
  src: string;
}

const LoadableImage: React.FC<LoadableImageProps> = ({
  src,
  alt,
  className,
  fill,
  sizes,
  ...props
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative">
      {!imageLoaded && (
        <Image
          src={fallbackImage}
          alt="Fallback image"
          fill={fill}
          sizes={sizes}
          className="absolute"
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        onLoadingComplete={() => setImageLoaded(true)}
        className={`transition-opacity duration-500 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        {...props}
      />
    </div>
  );
};

export default LoadableImage;
