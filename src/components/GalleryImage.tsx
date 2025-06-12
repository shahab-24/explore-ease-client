
import { motion } from "framer-motion";
import React from "react";

interface GalleryImageProps {
  src: string;
  alt: string;
  index: number;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ src, alt, index }) => {
  return (
    <motion.div
      className="relative w-full h-40 md:h-48 lg:h-56 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="w-full h-full overflow-hidden clip-diamond group-hover:shadow-xl transition duration-300">
        <img
          src={src}
          alt={alt}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
      </div>
    </motion.div>
  );
};

export default GalleryImage;
