import { motion } from "framer-motion";
import useAuth from "./hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./shared/LoadingSpinner";
import { getUserProfile } from '@/Types/Api/UserApi';
import useUserApi from "./hooks/useUserApi";

interface WelcomeNoteProps {
  role: "tourist" | "admin" | "tourguide";
  displayName?: string;
}

const WelcomeNote = ({ role }: WelcomeNoteProps) => {
        const {getUserProfile} = useUserApi()
  const { user } = useAuth();
//   console.log(user, "from welcome note")

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: () => getUserProfile(user?.email || ""),
    enabled: !!user?.email,
    staleTime: 5 * 60 * 1000,
  });

  if (!user?.email || isLoading) return <LoadingSpinner />;
  if (isError || !profile) {
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        Failed to load user profile.
      </div>
    );
  }

  const messages = {
    tourist: {
      heading: `Welcome, ${profile.name || "Adventurer"}!`,
      sub: "Get ready to explore new destinations and book exciting adventures.",
    },
    admin: {
      heading: `Hello, Admin ${profile.name || ""}`,
      sub: "Monitor, manage and lead the ExploreEase platform with control.",
    },
    tourguide: {
      heading: `Greetings, Guide ${profile.name || ""}`,
      sub: "Show the world your travel stories and lead new experiences.",
    },
  };

//   console.log(profile, "from welcome note")

const normalRole = profile?.role?.toLowerCase() as keyof typeof messages
  const content = messages[normalRole];
//   console.log(role)
//   console.log(content)

  return (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="max-w-2xl mx-auto text-center bg-white  shadow-md p-6 rounded-xl border  mt-10 text-gray-900 dark:text-white min-h-[30vh] flex flex-col justify-center items-center"
        >
          <h1 className="text-3xl font-bold text-gray-700 ">
            {content?.heading} 
            
          </h1>
          <p className="mt-4 text-gray-600 ">{content?.sub}</p>
        </motion.div>
      );
      
};

export default WelcomeNote;
