import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "Donate Bangladesh",
    description: "A donation platform built with React, Firebase, and MongoDB.",
    live: "https://donate-bd-demo.netlify.app",
    code: "https://github.com/your-username/donate-bangladesh",
  },
  {
    title: "Eco Adventure Blog",
    description: "A travel blog showcasing eco-friendly destinations.",
    live: "https://eco-travel-demo.netlify.app",
    code: "https://github.com/your-username/eco-adventure-blog",
  },
  {
    title: "Movie Portal",
    description: "A full-stack CRUD movie portal with authentication.",
    live: "https://movie-portal-demo.netlify.app",
    code: "https://github.com/your-username/movie-portal",
  },
];

const AboutMePage = () => {
  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-b from-white to-green-50 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-green-700 mb-6 text-center"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h1>

        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-lg">
            Hi, I’m <span className="font-semibold text-green-600">Shahab Uddin</span>, a passionate junior web developer with experience in React, JavaScript, MongoDB, Firebase, and more. I love creating beautiful and functional web apps that solve real-world problems.
          </p>
          <p className="mt-2">I've built over <span className="font-bold">6+ projects</span> using MERN stack & Firebase Authentication.</p>
        </motion.div>

        <motion.h2
          className="text-2xl font-semibold text-green-600 mb-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Featured Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-6 border hover:shadow-green-100 transition duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <h3 className="text-xl font-bold text-green-700">{project.title}</h3>
              <p className="text-gray-600 mt-2 mb-4 text-sm">{project.description}</p>
              <div className="flex gap-4 text-green-600">
                <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-green-800 transition">
                  <FaExternalLinkAlt /> Live
                </a>
                <a href={project.code} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-green-800 transition">
                  <FaGithub /> Code
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;
