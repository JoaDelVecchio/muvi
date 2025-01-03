import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname == path;

  const links = [
    { id: 1, path: "/", name: "Home" },
    { id: 2, path: "/favorites", name: "Favorites" },
  ];
  return (
    <nav>
      <ul className="flex gap-6 text-lg">
        {links.map((link) => (
          <li key={link.id}>
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
