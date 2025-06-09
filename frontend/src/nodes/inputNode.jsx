// nodes/InputNode.jsx

import { useState } from 'react';
import BaseNode from './components/BaseNode.jsx';
import { Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      style={{ backgroundColor: '#1e293b', borderColor: '#334155' }} // Darker bg and border for BaseNode container
      handles={[{ type: 'source', position: Position.Right, id: `${id}-value` }]}
    >
      <div className="mb-3">
        <label className="block text-sm font-semibold text-cyan-400 mb-1">
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={(e) => setCurrName(e.target.value)} 
            className="mt-1 block w-full rounded-md bg-slate-700 border border-cyan-600 text-cyan-200 px-3 py-1.5 text-sm placeholder-cyan-400
              focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
            placeholder="Enter input name"
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-semibold text-rose-400 mb-1">
          Type:
          <select 
            value={inputType} 
            onChange={(e) => setInputType(e.target.value)} 
            className="mt-1 block w-full rounded-md bg-slate-700 border border-rose-600 text-rose-200 px-3 py-1.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
