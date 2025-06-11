
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '@/components/hooks/useAuth';
import useAxiosSecure from '@/components/hooks/useAxiosSecure';

type GuideApplicationData = {
  title: string;
  reason: string;
  cvLink: string;
};

const JoinAsTourGuide = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GuideApplicationData>();

  const onSubmit = async (data: GuideApplicationData) => {
    try {
      await axiosSecure.post(`/guide-requests`, {
        userEmail: user?.email,
        ...data,
        status: 'pending',
        appliedAt: new Date(),
      });

      Swal.fire('Success!', 'Your application has been submitted.', 'success');
      reset();
      navigate('/dashboard');
    } catch (error) {
      Swal.fire('Error', 'Failed to submit request', 'error');
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto my-10 bg-base-100 dark:bg-base-200 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        Join as a Tour Guide
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        <div>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            placeholder="Application Title"
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="text-error text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        
        <div>
          <textarea
            {...register('reason', { required: 'Reason is required' })}
            className="textarea textarea-bordered w-full"
            placeholder="Why do you want to become a tour guide?"
          />
          {errors.reason && (
            <p className="text-error text-sm mt-1">{errors.reason.message}</p>
          )}
        </div>

        
        <div>
          <input
            type="url"
            {...register('cvLink', {
              required: 'CV link is required',
              pattern: {
                value: /^(https?:\/\/)/,
                message: 'Must be a valid URL',
              },
            })}
            placeholder="CV Link (e.g., Google Drive/Dropbox)"
            className="input input-bordered w-full"
          />
          {errors.cvLink && (
            <p className="text-error text-sm mt-1">{errors.cvLink.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-success w-full">
          Submit Application
        </button>
      </form>
    </motion.div>
  );
};

export default JoinAsTourGuide;
