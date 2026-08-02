import { useEffect } from 'react';
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
  }, [selectedGroups, selectedLayout]);

  return (
    <div className="w-full h-full">
      <CytoscapeComponent
        key={`${selectedGroups.join('-')}-${selectedLayout}`}
        elements={CytoscapeComponent.normalizeElements(filteredGraphData)}
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