
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import useAxiosSecure from "@/components/hooks/useAxiosSecure";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
// import useAuth from "@/components/hooks/useAuth";

interface User {
  _id: string; name: string; email: string; role: "tourist" | "guide" | "admin";
}

const ManageUsers: React.FC = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
//   const {loading} = useAuth()
  const [roleFilter, setRoleFilter] = useState<{value:string,label:string} | null>(null);

  const { data, isLoading, refetch } = useQuery<User[]>({
    queryKey: ["admin-users", search, roleFilter?.value],
    queryFn: () => axiosSecure.get(`/admin/manage-users`, { params: { search, role: roleFilter?.value } }).then(res=>res.data),
  });

//   console.log(data, "manage users")

  const handleSearch = () => refetch();

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Manage Users</h2>

      <div className="flex gap-2 flex-wrap">
        <input type="text" placeholder="Search name or email" value={search} onChange={e=>setSearch(e.target.value)} className="input input-bordered flex-1"/>
        <Select
          value={roleFilter}
          onChange={setRoleFilter}
          options={[{value:"tourist",label:"Tourist"},{value:"guide",label:"Guide"},{value:"admin",label:"Admin"}]}
          isClearable
        />
        <button onClick={handleSearch} className="btn btn-primary">Apply</button>
      </div>

      {isLoading ? <LoadingSpinner /> : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-base-100 dark:bg-base-200">
            <thead>
              <tr>
                {["Name","Email","Role","Actions"].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {data?.map(u => (
                <tr key={u._id}>
                  <td>{u.name}</td><td>{u.email}</td><td>{u.role}</td>
                  <td className="flex gap-2">
                    <button onClick={() => {/* upgrade or delete logic */}} className="btn btn-sm btn-warning">Change Role</button>
                    <button onClick={() => {/* delete logic */}} className="btn btn-sm btn-error">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
