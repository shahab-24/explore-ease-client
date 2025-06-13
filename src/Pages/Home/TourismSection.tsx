import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router-dom";
import Title from "../../components/shared/Title";
import PackageGallery from "../../components/PackageGallery";
import TourGuideCard from "../../components/TourguideCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

// Fetch packages
const fetchPackages = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/packages`);
  return res.data;
};

// Fetch random tour guides
const fetchRandomGuides = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/tourGuides?mode=random`);
  return res.data;
};

const TourismSection = () => {
  const { data: packages = [], isLoading: loadingPackages } = useQuery({
    queryKey: ["packages"],
    queryFn: fetchPackages,
  });

  const { data: tourGuides = [], isLoading: loadingGuides } = useQuery({
    queryKey: ["random-tour-guides"],
    queryFn: fetchRandomGuides,
  });

  return (
    <section className="py-16 px-4">
      <Title title="Tourism & Travel Guide" subtitle="Choose Your Packages & Tourmate" />

      <Tabs>
        <TabList>
          <Tab>Our Packages</Tab>
          <Tab>Meet Our Tour Guides</Tab>
        </TabList>

        {/* --- Our Packages --- */}
        <TabPanel>
          {loadingPackages ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {packages.map((pkg: any) => (
                <div key={pkg._id} className="card bg-base-100 shadow-xl">
                  <PackageGallery images={pkg.images} isTrending={true} />
                  <div className="card-body">
                    <h3 className="text-xl font-bold">{pkg.name}</h3>
                    <p className="text-green-600 font-semibold">৳ {pkg.price}</p>
                    <Link to={`/packages/${pkg._id}`} className="btn btn-success btn-sm mt-2">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabPanel>

        {/* --- Meet Our Tour Guides --- */}
        <TabPanel>
          {loadingGuides ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              {tourGuides.map((guide: any) => (
                <div key={guide._id} className="card bg-base-100 shadow-md">
                  <TourGuideCard guide={guide} />
                  {/* <div className="p-4">
                    <Link to={`/tourGuidesProfile/${guide._id}`} className="btn btn-info btn-sm w-full">
                      View Details
                    </Link>
                  </div> */}
                </div>
              ))}
            </div>
          )}
        </TabPanel>
      </Tabs>
    </section>
  );
};

export default TourismSection;
