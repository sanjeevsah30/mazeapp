import React from "react";
import Card from "../components/Card";
import { useEffect, useState } from "react";

const Header = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTearm] = useState("");
  const [showSearch, setShowSearch] = useState("all");
  const onSearchHandler = (e) => {
    setShowSearch(searchTerm);
    e.preventDefault();
  };

  // fetch data when page load
  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch(
        ` https://api.tvmaze.com/search/shows?q=${
          showSearch ? showSearch : "all"
        }`
      );
      const res = await req.json();
      console.log(res);
      setData(res);
    };
    fetchData();
  }, [showSearch]);

  return (
    <header className='max_width px-4 py-10'>
      <h1 className='text-5xl font-bold text-center '>Trending Shows</h1>
      <form className='m-5 flex flex-row border-none'>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight text-black focus:outline-none focus:shadow-outline   '
          type='text'
          placeholder='searh for tv show'
          value={searchTerm}
          onChange={(e) => {
            setSearchTearm(e.target.value);
          }}
        />

        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded '
          onClick={onSearchHandler}
        >
          Search
        </button>
      </form>

      <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-10'>
        {data.map((item) => (
          <Card key={item.show.id} item={item} />
        ))}
      </section>
    </header>
  );
};

export default Header;
