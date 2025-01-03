import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname == path;
  const links = [
    { path: "/", name: "Home" },
    { path: "/favorites", name: "Favorites" },
  ];
  return (
    <nav>
      <ul className="flex gap-6 text-lg">
        {links.map((link, i) => (
          <li key={i}>
            <Link
              to={link.path}
              className={`${
                isActive(link.path) ? "text-blue-400" : "text-white"
              } hover:text-blue-400 transition-colors duration-200`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
