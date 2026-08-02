import { useEffect, useMemo } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import fcose from 'cytoscape-fcose';
import cola from 'cytoscape-cola';
import { layouts, cytoscapeStyle } from '../config/graphConfig';

cytoscape.use(dagre);
cytoscape.use(fcose);
cytoscape.use(cola);

export default function GraphCanvas({ filteredGraphData, selectedGroups, selectedLayout, setSelectedNode, setIsDropdownOpen, cyRef }) {
  
  // Cytoscape'in çakışmasını önlemek için veriyi doğru formata dönüştürüyoruz
  const formattedElements = useMemo(() => {
    if (!filteredGraphData) return [];

    const nodes = (filteredGraphData.nodes || []).map(node => ({
      group: 'nodes',
      data: node
    }));

    const edges = (filteredGraphData.edges || []).map(edge => ({
      group: 'edges',
      data: edge
    }));

    return [...nodes, ...edges];
  }, [filteredGraphData]);

  useEffect(() => {
    if (cyRef.current) {
      const cy = cyRef.current;
      const currentLayoutConfig = layouts[selectedLayout] || layouts.dagre;

      // Layout'u çalıştır
      const layout = cy.layout(currentLayoutConfig);
      layout.run();

      // Harita ve yerleşim tamamen oturduktan sonra sığdırma işlemini garantiliyoruz
      cy.ready(() => {
        setTimeout(() => {
          cy.fit(undefined, 60); // 60px kenar boşluğu ile tam ortala ve sığdır
        }, 50);
      });
    }
  }, [selectedGroups, selectedLayout, cyRef]);

  return (
    <div className="w-full h-full">
      <CytoscapeComponent
        key={`${selectedGroups.join('-')}-${selectedLayout}`}
        elements={formattedElements}
        style={{ width: '100%', height: '100%' }}
        layout={layouts[selectedLayout] || layouts.dagre}
        stylesheet={cytoscapeStyle}
        cy={(cy) => {
          cyRef.current = cy;
          
          // İlk açılışta da hazır olur olmaz sığdır
          cy.ready(() => {
            cy.fit(undefined, 60);
          });

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
  );
}
