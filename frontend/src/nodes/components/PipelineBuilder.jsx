// src/components/PipelineBuilder.jsx
import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { InputNode } from './nodes/InputNode.jsx';
import { OutputNode } from './nodes/OutputNode.jsx';
import { LLMNode } from './nodes/LLMNode.jsx';
import { TextNode } from './nodes/TextNode.jsx';

const nodeTypes = {
  inputNode: InputNode,
  outputNode: OutputNode,
  llmNode: LLMNode,
  textNode: TextNode,
};

const initialNodes = [];
const initialEdges = [];

const PipelineBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeId, setNodeId] = useState(1);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const addNode = (type) => {
    const id = `node-${nodeId}`;
    const newNode = {
      id,
      type,
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: {},
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeId(nodeId + 1);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      const result = await response.json();

      alert(`✅ Validation Result:
Nodes: ${result.num_nodes}
Edges: ${result.num_edges}
Is DAG: ${result.is_dag ? 'Yes ✅' : 'No ❌'}
      `);
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Failed to validate pipeline. Check the console.');
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-4 bg-gray-800 border-b border-gray-700 flex gap-4 flex-wrap">
        <button onClick={() => addNode('inputNode')} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Add Input</button>
        <button onClick={() => addNode('textNode')} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">Add Text</button>
        <button onClick={() => addNode('llmNode')} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">Add LLM</button>
        <button onClick={() => addNode('outputNode')} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">Add Output</button>
        <button onClick={handleSubmit} className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded">Validate Pipeline</button>
      </div>

      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background variant="dots" gap={12} size={1} />
          <MiniMap className="!bg-gray-800" nodeColor={() => '#4f46e5'} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default PipelineBuilder;
