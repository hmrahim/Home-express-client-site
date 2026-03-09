import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearch } from "../../redux/features/search/searchSlice";

export default function SearchBar({ setIsOpen }) {
  const dispatch = useDispatch();
 





  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <div className="w-full  mx-auto">
      <div className=" flex items-center bg-white rounded-md shadow-sm overflow-hidden">
        {/* Input */}
        <input
        onChange={(e)=> dispatch(setSearch(e.target.value))}
          onFocus={openModal}
          type="text"
          placeholder="Search "
          className=" flex-1 px-4 py-2 text-sm md:text-base outline-none text-black"
        />

        

        {/* Button */}
        <button className="bg-green-600 hover:bg-green-700 transition px-5 py-2 text-white flex items-center gap-2">
          <Search size={18} />
          <span className="">Search</span>
        </button>
      </div>
    </div>
  );
}
