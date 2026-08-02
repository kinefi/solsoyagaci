import { useState, useEffect, lazy, Suspense, useRef, useMemo, useCallback } from 'react';
import { Maximize2 } from 'lucide-react';

import ControlPanel from './components/ControlPanel';
import DetailPanel from './components/DetailPanel';
import DataTable from './components/DataTable';

const GraphCanvas = lazy(() => import('./components/GraphCanvas'));

export default function App() {
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [loading, setLoading] = useState(true);

  const [selectedNode, setSelectedNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([
    'TKP ve Türevleri',
    'THKP-C ve Türevleri',
    'THKO ve Türevleri',
    'TKP-ML ve Türevleri'
  ]);
  const [selectedLayout, setSelectedLayout] = useState('dagre');
  const [viewMode, setViewMode] = useState('map');

  const cyRef = useRef(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Veri yüklenirken hata oluştu.');
        return res.json();
      })
      .then((data) => {
        setGraphData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Performance Optimization: Cache active nodes/edges
  const filteredGraphData = useMemo(() => {
    const activeNodes = graphData.nodes.filter((node) => selectedGroups.includes(node.group));
    const activeNodeIds = new Set(activeNodes.map((n) => n.id));
    const activeEdges = graphData.edges.filter(
      (edge) => activeNodeIds.has(edge.source) && activeNodeIds.has(edge.target)
    );
    return { nodes: activeNodes, edges: activeEdges };
  }, [graphData, selectedGroups]);

  // Performance Optimization: Cache search query results
  const filteredSearchNodes = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const query = searchTerm.toLowerCase();
    return filteredGraphData.nodes.filter((node) => {
      const labelMatch = node.label.toLowerCase().includes(query);
      const yearMatch = node.year ? node.year.includes(searchTerm) : false;
      return labelMatch || yearMatch;
    });
  }, [filteredGraphData.nodes, searchTerm]);

  const toggleGroup = useCallback((groupName) => {
    setSelectedGroups((prev) =>
      prev.includes(groupName) ? prev.filter((g) => g !== groupName) : [...prev, groupName]
    );
  }, []);

  const handleFitAll = useCallback(() => {
    if (cyRef.current) {
      cyRef.current.animate({ fit: { padding: 40 }, duration: 400 });
    }
  }, []);

  const handleSelectSearchResult = useCallback((nodeData) => {
    setSearchTerm('');
    setIsDropdownOpen(false);
    setSelectedNode(nodeData);

    if (cyRef.current) {
      const targetCyNode = cyRef.current.getElementById(nodeData.id);
      if (targetCyNode && targetCyNode.length > 0) {
        cyRef.current.nodes().unselect();
        targetCyNode.select();
        cyRef.current.animate({
          center: { eles: targetCyNode },
          zoom: 1.2,
          duration: 500
        });
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-slate-900 text-slate-100 font-sans">
        <div className="text-lg font-medium animate-pulse">Soyağacı yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen bg-slate-900 text-slate-100 font-sans overflow-hidden">
      <ControlPanel 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        searchResults={filteredSearchNodes}
        onSelectNode={handleSelectSearchResult}
        selectedGroups={selectedGroups}
        setSelectedGroups={setSelectedGroups}
        toggleGroup={toggleGroup}            
        selectedLayout={selectedLayout}
        setSelectedLayout={setSelectedLayout}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {viewMode === 'table' ? (
        <DataTable
          nodes={graphData.nodes}
          selectedGroups={selectedGroups}
          setSelectedNode={setSelectedNode}
          onCloseToMap={() => setViewMode('map')}
        />
      ) : (
        <>
          <div className="absolute bottom-6 right-6 z-10 flex gap-2">
            <button
              onClick={handleFitAll}
              className="flex items-center gap-2.5 bg-slate-800/90 hover:bg-slate-700 text-slate-100 px-5 py-3 rounded-2xl border border-slate-700 shadow-xl backdrop-blur text-sm font-semibold transition duration-150 active:scale-95 cursor-pointer"
              title="Tüm haritayı ekrana sığdır"
            >
              <Maximize2 size={18} />
              Tümünü Sığdır
            </button>
          </div>

          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full w-full bg-slate-900 text-slate-400">
                Harita yükleniyor...
              </div>
            }
          >
            <GraphCanvas
              filteredGraphData={filteredGraphData}
              selectedGroups={selectedGroups}
              selectedLayout={selectedLayout}
              setSelectedNode={setSelectedNode}
              setIsDropdownOpen={setIsDropdownOpen}
              cyRef={cyRef}
            />
          </Suspense>
        </>
      )}

      <DetailPanel selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
    </div>
  );
}