import { Link } from "react-router-dom";

const Sidbar = () => {
  return (
    <div className="sidbar">
      <ul>
        <li>
          <Link to="/dashboard" className="body2">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/upload" className="body2">
            Upload
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Sidbar;
