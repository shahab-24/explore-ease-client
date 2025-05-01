import { motion } from "framer-motion";
import Title from "../../components/shared/Title";

const destinations = [
  {
    name: "Cox's Bazar",
    image: "https://i.ibb.co/example1.jpg",
    location: "Chattogram",
    description: "World’s longest natural sea beach with golden sands and blue waves.",
  },
  {
    name: "Sajek Valley",
    image: "https://i.ibb.co/example2.jpg",
    location: "Rangamati",
    description: "Clouds at your feet and hills above your head. Welcome to Sajek!",
  },
  {
    name: "Sundarbans",
    image: "https://i.ibb.co/example3.jpg",
    location: "Khulna",
    description: "Mangrove magic, tigers, rivers, and silence all in one package.",
  },
  {
    name: "Srimangal",
    image: "https://i.ibb.co/example4.jpg",
    location: "Sylhet",
    description: "Tea gardens, seven-color lake, and peaceful green trails.",
  },
];

const TopDestinations = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        
        <Title title="Top Destinations in Bangladesh" subtitle="Discover the most breathtaking travel spots across the country."></Title>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-lg shadow group bg-base-100"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-48 w-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="p-4 text-left">
                <h3 className="text-xl font-bold text-green-700">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{item.location}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-10 transition" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDestinations;
