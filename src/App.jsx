import { useState, useEffect, lazy, Suspense } from 'react';
import { Maximize2 } from 'lucide-react';

import Legend from './components/Legend';
import SearchBar from './components/SearchBar';
import DetailPanel from './components/DetailPanel';

// Cytoscape içeren bileşeni kod bölme (code-splitting) ile çağırıyoruz
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

  // JSON verisini public klasöründen fetch ile çekiyoruz
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

  // Filtreleme Mantığı
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

  const handleFitAll = () => {
    // Eğer harita ref'ine ihtiyaç duyulursa GraphCanvas içinde yönetilebilir
  };

  const handleSelectSearchResult = (nodeData) => {
    setSearchTerm('');
    setIsDropdownOpen(false);
    setSelectedNode(nodeData);
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
      <Legend selectedGroups={selectedGroups} toggleGroup={toggleGroup} />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        filteredSearchNodes={filteredSearchNodes}
        handleSelectSearchResult={handleSelectSearchResult}
      />

      {/* Harita Bileşeni (Lazy Loaded) */}
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
          setSelectedNode={setSelectedNode}
          setIsDropdownOpen={setIsDropdownOpen}
        />
      </Suspense>

      <DetailPanel selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
    </div>
  );
}