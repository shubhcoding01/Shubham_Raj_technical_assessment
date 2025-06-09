// src/submit.js
import React from 'react';
import { useReactFlow } from 'reactflow';

export async function submitPipeline(nodes, edges) {
  try {
    const response = await fetch('http://localhost:8000/pipelines/parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nodes, edges }),
    });

    const result = await response.json();

    alert(`✅ Pipeline Info:
- Nodes: ${result.num_nodes}
- Edges: ${result.num_edges}
- Is DAG: ${result.is_dag ? 'Yes' : 'No'}`);
  } catch (error) {
    alert('❌ Submission failed: ' + error.message);
  }
}

export const SubmitButton = () => {
  const { getNodes, getEdges } = useReactFlow();

  const handleClick = () => {
    const nodes = getNodes().map(({ id }) => ({ id }));
    const edges = getEdges().map(({ source, target }) => ({ source, target }));
    submitPipeline(nodes, edges);
  };

  return (
    <div className="p-4 border-t border-gray-700 bg-zinc-900">
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded"
      >
        Submit Pipeline
      </button>
    </div>
  );
};
