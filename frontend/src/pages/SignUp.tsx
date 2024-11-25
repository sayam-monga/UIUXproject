import Quote from "../components/Quote";
import Auth from "../components/Auth";

const Signup = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <Auth type="signup" />
        <Quote />
      </div>
    </div>
  );
};

export default Signup;
