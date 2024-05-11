const Header = () => {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 py-4 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
          <a href="#" className="flex items-center">
            <span className="self-center text-xl font-medium whitespace-nowrap dark:text-white">Devices</span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export { Header };
