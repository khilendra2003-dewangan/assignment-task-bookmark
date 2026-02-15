import React, { useState, useEffect } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

import toast from "react-hot-toast";

const BookMarkList = () => {
  const navigate = useNavigate();
  const [bookmark, setBookmark] = useState([]);

  const fetchBookmark = async () => {
    try {
      const res = await api.get("/getBookmark", { withCredentials: true });
      setBookmark(res.data.bookmark);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load bookmarks");
    }
  };

  useEffect(() => {
    fetchBookmark();

    const channel = new BroadcastChannel("bookmark_channel");
    console.log("Channel initialized in List");
    channel.onmessage = (event) => {
      console.log("Message received in List:", event.data);
      if (event.data === "bookmark_updated") {
        fetchBookmark();
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  const handleDelete = async (id) => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p className="font-medium">Are you sure you want to delete this bookmark?</p>
        <div className="flex gap-2 justify-end">
          <button
            className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await api.delete(`/deletebookmark/${id}`, { withCredentials: true });
                toast.success("Bookmark deleted successfully");

                // Broadcast update
                const channel = new BroadcastChannel("bookmark_channel");
                console.log("Broadcasting delete event");
                channel.postMessage("bookmark_updated");
                channel.close();

                fetchBookmark();
              } catch (error) {
                console.log("Error deleting bookmark:", error);
                toast.error("Failed to delete bookmark");
              }
            }}
          >
            Yes, Delete
          </button>
          <button
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-sm hover:bg-gray-300"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      position: 'top-center',
    });
  };

  const handleEdit = (id) => {
    navigate(`/edit-bookmark/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">📚 My Bookmarks</h2>

          <button
            onClick={() => navigate("/bookmark")}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            <Plus size={18} />
            Add New
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-indigo-100 text-gray-700">
                <th className="p-3 text-left">URL</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-600">
              {bookmark.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {item.url}
                    </a>
                  </td>
                  <td className="p-3">{item.title}</td>
                  <td className="p-3 flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {bookmark.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">No bookmarks found. Add one!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookMarkList;
