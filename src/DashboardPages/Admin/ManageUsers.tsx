import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Select from "react-select";
import Swal from "sweetalert2";
import useAxiosSecure from "@/components/hooks/useAxiosSecure";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "tourist" | "guide" | "admin";
}

const roleOptions = [
  { value: "tourist", label: "Tourist" },
  { value: "guide", label: "Guide" },
  { value: "admin", label: "Admin" },
];

const ManageUsers: React.FC = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<{ value: string; label: string } | null>(null);

  const { data: users, isLoading, refetch } = useQuery<User[]>({
    queryKey: ["admin-users", search, roleFilter?.value],
    queryFn: () =>
      axiosSecure
        .get(`/admin/manage-users`, {
          params: { search, role: roleFilter?.value },
        })
        .then((res) => res.data),
  });

  const changeRoleMutation = useMutation({
    mutationFn: async ({ email, newRole }: { email: string; newRole: string }) => {
      await axiosSecure.patch(`/admin/${email}/role`, { newRole });
    },
    onSuccess: () => {
      Swal.fire("Success!", "Role updated successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: () => {
      Swal.fire("Error", "Failed to update role", "error");
    },
  });

  const handleSearch = () => {
    refetch();
  };

  const handleChangeRole = async (user: User) => {
    const { value: selectedRole } = await Swal.fire({
      title: `Change Role for ${user.name}`,
      input: "select",
      inputOptions: {
        tourist: "Tourist",
        guide: "Guide",
        admin: "Admin",
      },
      inputPlaceholder: "Select a role",
      inputValue: user.role,
      showCancelButton: true,
    });

    if (selectedRole && selectedRole !== user.role) {
      changeRoleMutation.mutate({ email: user.email, newRole: selectedRole });
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 animate-fadeIn">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-primary">👥 Manage Users</h2>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch">
        <input
          type="text"
          placeholder="🔍 Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full"
        />
        <div className="w-full md:w-60">
          <Select
            value={roleFilter}
            onChange={setRoleFilter}
            options={roleOptions}
            isClearable
            placeholder="Filter by role"
            className="text-black dark:text-white"
          />
        </div>
        <button onClick={handleSearch} className="btn btn-primary w-full md:w-auto">
          Apply Filters
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="table w-full table-zebra bg-base-100 dark:bg-base-200">
            <thead>
              <tr className="text-base-content text-sm md:text-base">
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id} className="hover transition duration-200">
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="badge badge-info capitalize">{user.role}</span>
                  </td>
                  <td className="flex flex-wrap justify-center gap-2 py-2">
                    <button
                      onClick={() => handleChangeRole(user)}
                      className="btn btn-sm btn-warning"
                      disabled={changeRoleMutation.isPending}
                    >
                      Change Role
                    </button>
                    <button className="btn btn-sm btn-error" disabled>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users?.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
