import { ChangeEvent, useState } from "react";
import AppBar from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handlePublish = async () => {
    const res = await axios.post(
      `${BACKEND_URL}/blog`,
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    navigate(`/blog/${res.data.post.id}`);
  };
  return (
    <div className="">
      <AppBar />
      <div className="flex justify-center w-full">
        <div className="w-screen flex flex-col max-w-6xl mt-20">
          <h1 className="text-4xl font-bold">Publish your blog</h1>
          <TextArea
            onInputChange={(e) => {
              setTitle(e.target.value);
            }}
            onContChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button
            onClick={handlePublish}
            type="submit"
            className=" w-[140px] inline-flex justify-center items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            Publish blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publish;

const TextArea = ({
  onInputChange,
  onContChange,
}: {
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onContChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <div className="">
      <input
        onChange={onInputChange}
        className="w-full text-4xl mt-2 py-5 focus:outline-none rounded-md"
        placeholder="Title"
      ></input>
      <div className=" mt-2 w-full mb-4 border border-gray-200 rounded-lg bg-gray-5">
        <div className="px-4 py-2 bg-white rounded-b-lg ">
          <textarea
            onChange={onContChange}
            id="editor"
            rows={8}
            className="block w-full px-0 text-sm text-gray-800 bg-white border-0 focus:outline-none"
            placeholder="Write an article..."
            required
          ></textarea>
        </div>
      </div>
    </div>
  );
};
