import { useEffect, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { dagreLayout, cytoscapeStyle } from '../config/graphConfig';

cytoscape.use(dagre);

export default function GraphCanvas({ filteredGraphData, selectedGroups, setSelectedNode, setIsDropdownOpen }) {
  const cyRef = useRef(null);

  useEffect(() => {
    if (cyRef.current) {
      cyRef.current.batch(() => {
        cyRef.current.layout(dagreLayout).run();
      });
    }
  }, [selectedGroups]);

  return (
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
  );
}