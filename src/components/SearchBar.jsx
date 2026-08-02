import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ 
  searchTerm, 
  setSearchTerm, 
  isDropdownOpen, 
  setIsDropdownOpen, 
  searchResults = [], 
  onSelectNode 
}) {
  const searchRef = useRef(null);

  // Dışarı tıklandığında dropdown listesini kapat
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        if (setIsDropdownOpen) setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsDropdownOpen]);

  return (
    <div ref={searchRef} className="relative w-full z-30 block">
      <div className="relative flex items-center w-full">
        <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchTerm || ''}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (setIsDropdownOpen) setIsDropdownOpen(true);
          }}
          onFocus={() => {
            if (setIsDropdownOpen) setIsDropdownOpen(true);
          }}
          placeholder="Örgüt, parti veya lider ara..."
          className="w-full pl-9 pr-8 py-2 bg-slate-900/90 text-slate-200 placeholder-slate-500 text-xs rounded-lg border border-slate-700/80 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition"
        />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('');
              if (setIsDropdownOpen) setIsDropdownOpen(false);
            }}
            className="absolute right-2.5 text-slate-400 hover:text-slate-200 transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Arama Sonuçları Dropdown Listesi */}
      {isDropdownOpen && searchTerm && searchResults && searchResults.length > 0 && (
        <div className="absolute left-0 right-0 mt-1.5 max-h-60 overflow-y-auto bg-slate-900/95 border border-slate-700/90 rounded-lg shadow-2xl backdrop-blur-md z-50 custom-scrollbar">
          {searchResults.map((node) => (
            <div
              key={node.id}
              onClick={() => {
                if (onSelectNode) onSelectNode(node);
              }}
              className="px-3 py-2 text-xs text-slate-200 hover:bg-slate-800/90 hover:text-cyan-400 cursor-pointer transition flex items-center justify-between border-b border-slate-800/50 last:border-0"
            >
              <span className="font-medium truncate">{node.label}</span>
              {node.year && (
                <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700/50 ml-2 shrink-0">
                  {node.year}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Bulunamadı Uyarısı */}
      {isDropdownOpen && searchTerm && searchResults && searchResults.length === 0 && (
        <div className="absolute left-0 right-0 mt-1.5 p-3 text-center text-xs text-slate-400 bg-slate-900/95 border border-slate-700/90 rounded-lg shadow-2xl backdrop-blur-md z-50">
          Eşleşen sonuç bulunamadı.
        </div>
      )}
    </div>
  );
}