import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router-dom";
import Title from "../../components/shared/Title";

import 'swiper/css';
import 'swiper/css/pagination';
import PackageGallery from '../../components/PackageGallery';
import TourGuideCard from "../../components/TourGuideCard";

const TourismSection = () => {
        // const {id} = useParams()
  const [packages, setPackages] = useState([]);
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/packages`)
      .then((res) => {
        // console.log(res.data);
        setPackages(res.data);
      })
      .catch((error) => console.log(error.message));


    axios.get(`${import.meta.env.VITE_API_URL}/tourGuides?mode=random`)
    .then((res) => {
      console.log(res.data);
      setGuides(res.data);
    });

    axios.get(`${import.meta.env.VITE_API_URL}/tourGuidesProfile/${guides._id}`)
    .then((res) => {
//       console.log(res.data);
      setGuides(res.data);
    });


  }, [guides._id]);

  
  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700">
        
      </h2>
      <Title title={"Tourism & Travel Guide"} subtitle={"Choose Your Packages & Tourmate"}></Title>
      <Tabs>
        <TabList>
          <Tab>Our Packages</Tab>
          <Tab>Meet Our Tour Guides</Tab>
        </TabList>

        {/* Our Packages Tab */}
        <TabPanel>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
  {packages.map((pkg) => (
    <div key={pkg._id} className="card bg-base-100 shadow-xl">
      <PackageGallery images={pkg.images} isTrending={true} />
      <div className="card-body">
        <h3 className="text-xl font-bold">{pkg.name}</h3>
        <p className="text-green-600 font-semibold">৳ {pkg.price}</p>
        <Link
          to={`/packages/${pkg._id}`}
          className="btn btn-success btn-sm mt-2"
        >
          View Details
        </Link>
      </div>
    </div>
  ))}
</div>
        </TabPanel>

        {/* Tour Guides Tab */}
        <TabPanel>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
    {Array.isArray(guides) &&
      guides.map((guide) => <TourGuideCard key={guide._id} guide={guide} />)}
  </div>
        </TabPanel>
      </Tabs>
    </section>
  );
};

export default TourismSection;
