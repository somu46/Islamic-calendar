import { Link } from 'react-router-dom';


const Breadcrumb = ({ pageName,path }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-3 mx-3">
      <nav>
        <ol className="flex items-center gap-2 text-xl text-blue-700">
          <li>
            <Link className="font-medium" to="/">
              Home /
            </Link>
          </li>
          <Link className="font-medium" to={path} >
          <li className="font-medium text-primary">{pageName}</li>
          </Link>
        </ol>
      </nav>
      
    </div>
  );
};

export default Breadcrumb;
