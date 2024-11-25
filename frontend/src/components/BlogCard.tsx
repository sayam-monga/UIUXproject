import Avatar from "./Avatar";
import { Link } from "react-router-dom";
interface blogCardProps {
  title: string;
  content: string;
  username: string;
  publishedDate: string;
  id: string;
}

const BlogCard = ({
  title,
  id,
  content,
  username,
  publishedDate,
}: blogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="flex flex-col mt-4 justify-start border-b-2 p-2 cursor-pointer hover:bg-gray-100">
        <div className="flex flex-row items-center justify-start gap-2">
          <div>
            <Avatar size="small" username={username} />
          </div>
          <div className="text-xl">
            <span className="font-semibold">{username} . </span>{" "}
            <span className="text-slate-500">{publishedDate}</span>
          </div>
        </div>
        <div className=" text-black font-bold text-3xl mt-2">{title}</div>
        <div className="text-md mt-2 text-gray-500">
          {content.slice(0, 200)} ...
        </div>
        <div className="mt-5 mb-5 text-gray-700 bg-slate-300 w-fit rounded-lg p-1">
          {Math.ceil(content.length / 1000)} min read
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
