const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-gray-400 py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">Muvi</span>. All rights
          reserved.
        </p>
        <p className="mt-2 text-sm">
          Made by{" "}
          <a
            href="https://www.linkedin.com/in/joaquindelvecchio/"
            className="text-blue-500 hover:underline transition duration-300"
          >
            Joaquin Del Vecchio
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
