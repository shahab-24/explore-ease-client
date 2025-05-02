import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router-dom";
import Title from "../../components/shared/Title";

const TourismSection = () => {
  const [packages, setPackages] = useState([]);
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/package`)
      .then((res) => {
        // console.log(res.data);
        setPackages(res.data);
      })
      .catch((error) => console.log(error.message));


    axios.get(`${import.meta.env.VITE_API_URL}/tourGuides?mode=random`)
    .then((res) => {
//       console.log(res.data?.data);
      setGuides(res.data);
    });
  }, []);

  
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {Array.isArray(packages) && packages?.map((pkg) => (
              <div key={pkg._id} className="card bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={pkg?.photo}
                    alt={pkg.title}
                    className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="text-xl font-bold">{pkg.title}</h3>
                  <p className="text-green-600 font-semibold">{pkg.tourType}</p>
                  <p>৳ {pkg.price}</p>
                  <Link
                    to={`/packages/${pkg._id}`}
                    className="btn btn-primary btn-sm mt-2"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {Array.isArray(guides) && guides.map((guide, idx) => (
              <div key={idx} className="card bg-base-100 shadow-lg">
                <figure>
                  <img
                    src={guide.photo}
                    alt={guide.name}
                    className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="text-xl font-bold">{guide.name}</h3>
                  <p className="text-gray-600">{guide.specialty}</p>
                  <Link
                    to={`/guides/${idx}`}
                    className="btn btn-outline btn-sm mt-2"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </section>
  );
};

export default TourismSection;
