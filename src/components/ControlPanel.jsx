import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Legend from './Legend';
import { useDraggable } from '../hooks/useDraggable';

export default function ControlPanel({ 
  searchTerm, 
  setSearchTerm, 
  isDropdownOpen,
  setIsDropdownOpen,
  searchResults,
  onSelectNode,
  selectedGroups, 
  setSelectedGroups,
  toggleGroup,
  selectedLayout,
  setSelectedLayout,
  viewMode,
  setViewMode
}) {
  const { position, handleMouseDown, isDragging } = useDraggable('main_control_panel');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  if (isMinimized) {
    return (
      <div
        className={`drag-handle fixed z-20 bg-slate-900/95 backdrop-blur-md border border-cyan-500/60 rounded-full py-2 px-3.5 shadow-2xl transition-all hover:border-cyan-400 select-none ${
          isDragging ? 'cursor-grabbing shadow-cyan-500/30 scale-105' : 'cursor-grab hover:scale-105'
        }`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-cyan-400 text-sm shrink-0 pointer-events-none">⚙️</span>
          <span className="text-xs font-semibold text-slate-200 pointer-events-none whitespace-nowrap">
            Kontrol Paneli
          </span>
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(false);
            }}
            className="ml-1 text-xs bg-cyan-500/20 hover:bg-cyan-500/50 text-cyan-300 hover:text-white rounded-full w-6 h-6 flex items-center justify-center transition cursor-pointer shrink-0"
          >
            ⤢
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`fixed z-20 bg-slate-900/95 backdrop-blur-md border border-slate-700/70 rounded-xl shadow-2xl w-[380px] max-w-[calc(100vw-40px)] flex flex-col overflow-hidden ${
        isDragging ? 'shadow-cyan-500/10 cursor-grabbing' : ''
      }`}
      style={{ left: `${position.x}px`, top: `${position.y}px`, maxHeight: 'calc(100vh - 60px)' }}
      onMouseDown={handleMouseDown}
    >
      <div className="drag-handle relative z-20 flex items-center justify-between px-3.5 py-2.5 bg-slate-800/95 border-b border-slate-700/80 rounded-t-xl cursor-grab select-none shrink-0 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
          <span className="text-slate-400">⠿</span>
          <span>Kontrol Paneli</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 text-xs text-slate-400 hover:text-white rounded hover:bg-slate-700/50 transition w-6 h-6 flex items-center justify-center cursor-pointer"
          >
            {isCollapsed ? '▼' : '▲'}
          </button>
          <button 
            onClick={() => setIsMinimized(true)}
            className="p-1 text-xs text-slate-400 hover:text-cyan-400 rounded hover:bg-slate-700/50 transition w-6 h-6 flex items-center justify-center font-bold cursor-pointer"
          >
            —
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="relative z-10 p-3.5 space-y-4 overflow-y-auto w-full max-h-[70vh] custom-scrollbar">
          <div className="w-full relative z-30 pt-2 block">
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
              searchResults={searchResults}
              onSelectNode={onSelectNode}
            />
          </div>

          <div className="pt-3 border-t border-slate-800/80 w-full relative z-10">
            <Legend 
              selectedGroups={selectedGroups} 
              setSelectedGroups={setSelectedGroups}
              toggleGroup={toggleGroup}
              selectedLayout={selectedLayout}
              setSelectedLayout={setSelectedLayout}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          </div>
        </div>
      )}
    </div>
  );
}