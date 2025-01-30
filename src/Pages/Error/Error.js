
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";



const Error = () => {
  const navigate=useNavigate();
  return (
    <>
      <Breadcrumb pageName="Error" />
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="text-6xl font-bold text-inherit">404</div>
        <div className="text-xl text-inherit mt-4">
          Oops! Something went wrong.
        </div>
        <div className="text-md text-inherit mt-4">
          Sorry ! Page Not Found.
        </div>
        <Link
          onClick={()=>navigate(-1)}
          className="mt-8 border-2 border-black shadow-lg border-white-600 p-2 rounded-md font-semibold text-inherit hover:border-blue-700 hover:border-2 transition-all duration-300 ease-in-out hover:tracking-wider"
        >
          Back to Home &rarr;
        </Link>
      </div>
    </>
  );
};


export default Error;