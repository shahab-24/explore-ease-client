import { useForm } from "react-hook-form";
import { User } from "../../Types/UserTypes";

type Props = {
  user: User;
  onSubmit: (data: Partial<User>) => void;
};

const EditProfileForm = ({ user, onSubmit }: Props) => {
  const { register, handleSubmit } = useForm<Partial<User>>({
    defaultValues: {
      name: user.name,
      photo: user.photo,
      phone: user.phone || "",
      address: user.address || "",
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("name")}
        className="input input-bordered w-full "
        placeholder="Name"
      />
      <input
        {...register("photo")}
        className="input input-bordered w-full "
        placeholder="Photo"
      />
      <input
        {...register("phone")}
        className="input input-bordered w-full "
        placeholder="Phone"
      />
      <input
        {...register("address")}
        className="input input-bordered w-full "
        placeholder="Address"
      />
      <button type="submit" className="btn btn-success w-full">
        {" "}
        Save Changes
      </button>
    </form>
  );
};

export default EditProfileForm;
