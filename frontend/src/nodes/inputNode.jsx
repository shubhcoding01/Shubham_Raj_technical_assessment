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
      handles={[{ type: 'source', position: Position.Right, id: `${id}-value` }]}
    >
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={(e) => setCurrName(e.target.value)} 
            className="mt-1 block w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Type:
          <select 
            value={inputType} 
            onChange={(e) => setInputType(e.target.value)} 
            className="mt-1 block w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
