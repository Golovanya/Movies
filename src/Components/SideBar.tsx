import { Link } from "react-router-dom";

function SideBar() {
  return (
    <section className="sidebar h-full bg-slate-800 pt-10 px-6 ">
      <ul className="text-white flex flex-col gap-3">
        <Link to="/">
          <li className=" hover:underline">Главная</li>
        </Link>
        <hr />
        <Link to="favorites">
          <li className=" hover:underline">Избраное </li>
        </Link>
        <a
          href="https://github.com/Golovanya/VK-test"
          target="_blank"
          rel="noopener noreferrer"
        >
          <li className=" hover:underline">Исходники</li>
        </a>
        <a
          href="https://github.com/Golovanya"
          target="_blank"
          rel="noopener noreferrer"
        >
          <li className="text-xs">by Ivan Golovanov</li>
        </a>
      </ul>
    </section>
  );
}

export default SideBar;
