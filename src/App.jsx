import { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { Maximize2 } from 'lucide-react';

import Legend from './components/Legend';
import SearchBar from './components/SearchBar';
import DetailPanel from './components/DetailPanel';

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

  // Cytoscape referansını App seviyesinde tutuyoruz ki Sığdır butonu erişebilsin
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

  const activeNodes = graphData.nodes.filter((node) => selectedGroups.includes(node.data.group));
  const activeNodeIds = new Set(activeNodes.map((n) => n.data.id));
  const activeEdges = graphData.edges.filter(
    (edge) => activeNodeIds.has(edge.data.source) && activeNodeIds.has(edge.data.target)
  );

  const filteredGraphData = { nodes: activeNodes, edges: activeEdges };

  const filteredSearchNodes = activeNodes.filter((node) => {
    if (!searchTerm.trim()) return false;
    const labelMatch = node.data.label.toLowerCase().includes(searchTerm.toLowerCase());
    const yearMatch = node.data.year ? node.data.year.includes(searchTerm) : false;
    return labelMatch || yearMatch;
  });

  const toggleGroup = (groupName) => {
    if (selectedGroups.includes(groupName)) {
      setSelectedGroups(selectedGroups.filter((g) => g !== groupName));
    } else {
      setSelectedGroups([...selectedGroups, groupName]);
    }
  };

  // Sığdır Butonu Fonksiyonu
  const handleFitAll = () => {
    if (cyRef.current) {
      cyRef.current.animate({ fit: { padding: 40 }, duration: 400 });
    }
  };

  const handleSelectSearchResult = (nodeData) => {
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
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-slate-900 text-slate-100 font-sans">
        <div className="text-lg font-medium animate-pulse">Soyağacı yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen bg-slate-900 text-slate-100 font-sans overflow-hidden">
      <Legend 
        selectedGroups={selectedGroups} 
        toggleGroup={toggleGroup} 
        selectedLayout={selectedLayout}
        setSelectedLayout={setSelectedLayout}
      />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        filteredSearchNodes={filteredSearchNodes}
        handleSelectSearchResult={handleSelectSearchResult}
      />

      {/* SAĞ ALTTAKİ "TÜMÜNÜ SIĞDIR" BUTONU GERİ GELDİ */}
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
          cyRef={cyRef} // cyRef'i alt bileşene aktarıyoruz
        />
      </Suspense>

      <DetailPanel selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
    </div>
  );
}