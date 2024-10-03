import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="fixed top-0 h-header w-full flex justify-center shadow-md bg-gray-900">
      <div className="flex items-center w-[90%] max-w-page">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white">
              URL<span className="text-blue-500">Shortener</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
