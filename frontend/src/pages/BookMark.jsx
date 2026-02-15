import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";

const BookMark = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID if editing
  const isEditMode = !!id;

  const [form, setForm] = useState({
    url: "",
    title: "",
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchBookmark = async () => {
        try {
          // Since we don't have a specific get-one endpoint in the router shown, 
          // we might need to fetch all and filter, OR (better) just load it if passed via state
          // BUT, standard way is to fetch. 
          // Given the current backend routes, we only have GetBookMark (all).
          // Let's rely on fetching all and finding the one, 
          // OR assuming the user passed data via router state (navigated from list).
          // For robustness, let's try to fetch list and find it. 
          // Ideally backend should have a GetSingleBookmark, but I'll work with what I have 
          // or just rely on state if I implement it in BookMarkList. 
          // Let's implement fetching all for now as a fallback or if state is missing.
          const res = await api.get("/getBookmark", { withCredentials: true });
          const found = res.data.bookmark.find(b => b._id === id);
          if (found) {
            setForm({ url: found.url, title: found.title });
          }
        } catch (error) {
          console.log("Error fetching bookmark for edit", error);
        }
      };
      fetchBookmark();
    }
  }, [id, isEditMode]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await api.put(`/updatebookmark/${id}`, form, { withCredentials: true });
        toast.success("Bookmark Updated Successfully");
      } else {
        await api.post("/create", form, { withCredentials: true });
        toast.success("Bookmark Created Successfully");
      }

      // Broadcast update to other tabs
      const channel = new BroadcastChannel("bookmark_channel");
      console.log("Broadcasting update/create event");
      channel.postMessage("bookmark_updated");
      channel.close();

      navigate("/bookmarklist");
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-8 w-full max-w-md">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          {isEditMode ? "Edit Bookmark" : "Add New Bookmark"}
        </h2>

        <form onSubmit={handleOnSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Enter your url"
              name="url"
              value={form.url}
              onChange={handleOnChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter your title"
              name="title"
              value={form.title}
              onChange={handleOnChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
            >
              {isEditMode ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookMark;
