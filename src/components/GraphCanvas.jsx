import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import fcose from 'cytoscape-fcose';
import cola from 'cytoscape-cola';
import { groupsList } from '../config/graphConfig';

cytoscape.use(dagre);
cytoscape.use(fcose);
cytoscape.use(cola);

export default function GraphCanvas({
  filteredGraphData,
  selectedLayout,
  setSelectedNode,
  setIsDropdownOpen,
  cyRef
}) {
  const containerRef = useRef(null);

  const groupColorMap = groupsList.reduce((acc, g) => {
    acc[g.name] = g.color;
    return acc;
  }, {});

  useEffect(() => {
    if (!containerRef.current) return;

    const nodesWithColors = filteredGraphData.nodes.map((node) => ({
      data: {
        ...node,
        nodeColor: groupColorMap[node.group] || '#94a3b8'
      }
    }));

    const edgesWithColors = filteredGraphData.edges.map((edge) => {
      const sourceNode = filteredGraphData.nodes.find((n) => n.id === edge.source);
      const edgeColor = sourceNode ? groupColorMap[sourceNode.group] : '#475569';
      return {
        data: {
          ...edge,
          edgeColor
        }
      };
    });

    const cy = cytoscape({
      container: containerRef.current,
      elements: [...nodesWithColors, ...edgesWithColors],
      style: [
        {
          selector: 'node',
          style: {
            label: 'data(label)',
            'background-color': 'data(nodeColor)',
            color: '#ffffff',
            'font-size': '11px',
            'font-weight': '700',
            'text-valign': 'center',
            'text-halign': 'center',
            'text-wrap': 'wrap',
            'text-max-width': '70px',
            
            // Yuvarlak düğüm ve yazıyı rahatça içine alan boyut/padding ayarları
            shape: 'ellipse',
            width: '90px',
            height: '90px',
            padding: '15px',
            'border-width': '2px',
            'border-color': '#1e293b',
            'overlay-opacity': 0
          }
        },
        {
          selector: 'node:selected',
          style: {
            'border-width': '4px',
            'border-color': '#38bdf8',
            'shadow-blur': 18,
            'shadow-color': '#38bdf8',
            'shadow-opacity': 0.8
          }
        },
        {
          selector: 'edge',
          style: {
            width: 2,
            'line-color': 'data(edgeColor)',
            'target-arrow-color': 'data(edgeColor)',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            opacity: 0.75
          }
        }
      ],
      layout: { name: selectedLayout }
    });

    cyRef.current = cy;

    const handleTapNode = (evt) => {
      setSelectedNode(evt.target.data());
    };

    const handleTapBg = (evt) => {
      if (evt.target === cy) {
        setSelectedNode(null);
        if (setIsDropdownOpen) setIsDropdownOpen(false);
      }
    };

    cy.on('tap', 'node', handleTapNode);
    cy.on('tap', handleTapBg);

    return () => {
      cy.off('tap', 'node', handleTapNode);
      cy.off('tap', handleTapBg);
      cy.destroy();
    };
  }, [filteredGraphData, selectedLayout, setSelectedNode, setIsDropdownOpen, cyRef]);

  return <div ref={containerRef} className="w-full h-full" />;
}