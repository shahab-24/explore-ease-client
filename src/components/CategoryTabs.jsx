import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Title from "./shared/Title";

const CategoryTabs = ({ subtitle, title }) => {
  return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-screen-xl mx-auto">
  {/* Section Title */}
  <Title
    title={"Packages & Tour Guides"}
    subtitle={"Choose Your Packages & Tourmate"}
  />

  {/* Tabs Section */}
  <div className="mt-6">
    <Tabs>
      <TabList className="flex flex-wrap justify-center gap-4 overflow-x-auto whitespace-nowrap border-b border-gray-300 pb-2">
        <Tab className="px-4 py-2 text-sm sm:text-base font-semibold border-b-2 border-transparent hover:border-blue-500 focus:outline-none focus:border-blue-500 transition duration-300">
          Our Packages
        </Tab>
        <Tab className="px-4 py-2 text-sm sm:text-base font-semibold border-b-2 border-transparent hover:border-blue-500 focus:outline-none focus:border-blue-500 transition duration-300">
          Meet Our Tour Guides
        </Tab>
      </TabList>

      <TabPanel>
        <h2 className="text-center text-lg sm:text-xl font-medium mt-6">Any content 1</h2>
      </TabPanel>
      <TabPanel>
        <h2 className="text-center text-lg sm:text-xl font-medium mt-6">Any content 2</h2>
      </TabPanel>
    </Tabs>
  </div>
</div>

      
  );
};

export default CategoryTabs;
