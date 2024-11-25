import { Link } from "react-router-dom";

const AppBar = () => {
  return (
    <div className="w-screen h-20px flex justify-between items-center px-10 py-4 border-b-2">
      <Link to="/blogs">
        <div className="text-xl">SafeBlog</div>
      </Link>
      <div className="flex flex-row  justify-center  items-center gap-2">
        <div className="mt-2">
          <Link to={"/publish"}>
            <button className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-400 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
              New
            </button>
          </Link>
        </div>

        {/* <Avatar size="" username="" /> */}
      </div>
    </div>
  );
};

export default AppBar;
