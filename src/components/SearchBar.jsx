import { Search } from 'lucide-react';

export default function SearchBar({ searchTerm, setSearchTerm, isDropdownOpen, setIsDropdownOpen, filteredSearchNodes, handleSelectSearchResult }) {
  return (
    <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 w-96">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Örgüt veya yıl ara (örn: Dev-Yol, 1971)..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
          className="w-full bg-slate-800/95 backdrop-blur border border-slate-700 rounded-2xl pl-12 pr-4 py-3 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-red-500 shadow-xl transition"
        />
      </div>

      {isDropdownOpen && filteredSearchNodes.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur border border-slate-700 rounded-2xl shadow-2xl max-h-72 overflow-y-auto divide-y divide-slate-700/50">
          {filteredSearchNodes.map((node) => (
            <div
              key={node.data.id}
              onClick={() => handleSelectSearchResult(node.data)}
              className="p-3.5 hover:bg-slate-700/70 cursor-pointer transition flex items-center justify-between"
            >
              <div>
                <div className="text-sm font-bold text-slate-100">{node.data.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{node.data.group}</div>
              </div>
              <span className="text-xs font-mono bg-slate-900 px-2.5 py-1 rounded-md text-amber-400 border border-slate-700">
                {node.data.year}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
