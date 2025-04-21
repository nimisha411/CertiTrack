"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManageAdminsPage = () => {
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    const fetchAdmins = async () => {
      const response = await axios.get("/api/admin");
      if (response.data) {
        console.log(response.data.admins);
        setAdmins(response.data.admins);
      }
    };
    fetchAdmins();
  }, []);
  const handleApprove = async (adminId: string, status: boolean) => {
    const response = axios.patch(
      `/api/admin/approve?id=${adminId}&status=${status}`
    );
    toast.promise(response, {
      loading: "Updating admin status...",
      success: (data) => {
        if (data.status === 200) {
          setAdmins((prevAdmins) =>
            prevAdmins.map((admin) =>
              admin._id === adminId
                ? { ...admin, isApproved: !admin.isApproved }
                : admin
            )
          );
          return "Admin status updated successfully";
        } else {
          return "Failed to update admin status";
        }
      },
      error: (error) => {
        console.log(error);
        return "Failed to update admin status";
      },
    });
  };
  return (
    <>
      <h1 className="text-4xl font-bold text-center uppercase">
        Manage Admins
      </h1>
      <div className="overflow-x-auto mt-6">
        <table className="table table-zebra bg-base-200">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No.</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {admins.length > 0 ? (
              admins.map((admin, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={admin.profileImage} alt={admin.name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{admin.name}</div>
                        <div className="text-sm opacity-50">{admin.state}</div>
                      </div>
                    </div>
                  </td>
                  <td>{admin.email}</td>
                  <td>{admin.phone}</td>
                  <th>
                    {admin.isApproved ? (
                      <button
                        className="btn btn-success font-bold"
                        onClick={() => handleApprove(admin._id, false)}
                      >
                        Revoke Approval
                      </button>
                    ) : (
                      <button
                        className="btn btn-error font-bold"
                        onClick={() => handleApprove(admin._id, true)}
                      >
                        Approve
                      </button>
                    )}
                  </th>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  No admins found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageAdminsPage;
