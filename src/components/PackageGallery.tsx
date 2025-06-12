// components/PackageGallery.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

interface PackageGalleryProps {
  images: string[];
  isTrending?: boolean;
}

export default function PackageGallery({ images, isTrending }: PackageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState('');

  const handleImageClick = (img: string) => {
    setSelectedImg(img);
    setIsOpen(true);
  };

  return (
    <div className="relative">
      {isTrending && (
        <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 text-sm font-semibold rounded z-10 shadow">
          🔥 Trending
        </div>
      )}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        spaceBetween={10}
        slidesPerView={1}
        className="rounded-lg"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img}
              onClick={() => handleImageClick(img)}
              alt={`Slide ${idx + 1}`}
              className="h-48 md:h-56 lg:h-64 w-full object-cover cursor-zoom-in transition duration-300 hover:scale-105"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal for zoom view */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50">
        <div className="flex items-center justify-center min-h-screen bg-black/70">
          <Dialog.Panel className="relative bg-white rounded max-w-3xl mx-auto p-2">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-red-600"
            >
              <X size={24} />
            </button>
            <img src={selectedImg} alt="Zoomed" className="max-h-[80vh] w-auto mx-auto rounded" />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
