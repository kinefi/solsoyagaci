import React, { useState, useRef, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import graphData from './data.json';
import { Maximize2 } from 'lucide-react';

import Legend from './components/Legend';
import SearchBar from './components/SearchBar';
import DetailPanel from './components/DetailPanel';
import { dagreLayout, cytoscapeStyle } from './config/graphConfig';

cytoscape.use(dagre);

export default function App() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([
    'TKP ve Türevleri',
    'THKP-C ve Türevleri',
    'THKO ve Türevleri',
    'TKP-ML ve Türevleri'
  ]);

  const cyRef = useRef(null);

  // Filtreleme Mantığı
  const activeNodes = graphData.nodes.filter((node) => selectedGroups.includes(node.data.group));
  const activeNodeIds = new Set(activeNodes.map((n) => n.data.id));
  const activeEdges = graphData.edges.filter(
    (edge) => activeNodeIds.has(edge.data.source) && activeNodeIds.has(edge.data.target)
  );

  const filteredGraphData = { nodes: activeNodes, edges: activeEdges };

  useEffect(() => {
    if (cyRef.current) {
      cyRef.current.batch(() => {
        cyRef.current.layout(dagreLayout).run();
      });
    }
  }, [selectedGroups]);

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

      <div className="w-full h-full">
        <CytoscapeComponent
          key={selectedGroups.join('-')}
          elements={CytoscapeComponent.normalizeElements(filteredGraphData)}
          style={{ width: '100%', height: '100%' }}
          layout={dagreLayout}
          stylesheet={cytoscapeStyle}
          cy={(cy) => {
            cyRef.current = cy;
            cy.on('tap', 'node', (evt) => setSelectedNode(evt.target.data()));
            cy.on('tap', (evt) => {
              if (evt.target === cy) {
                setSelectedNode(null);
                setIsDropdownOpen(false);
              }
            });
          }}
        />
      </div>

      <DetailPanel selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
    </div>
  );
}