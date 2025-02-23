import { Search } from 'lucide-react'
import React from 'react'

const SearchBar = () => {
  return (
    <div> 
    <div className="bg-white p-3 rounded-lg flex items-center gap-2 shadow-md">
        <input
          type="search"
          placeholder="Search  Therapist..."
          className="w-full rounded-lg border-2 border-gray-300 p-2 outline-none text-gray-800"
        />
        <Search className="w-10 h-10 text-gray-600 p-2 rounded-full bg-gray-200 hover:bg-blue-400 hover:text-white transition cursor-pointer" />
      </div>
    </div>
  ) 
}

export default SearchBar