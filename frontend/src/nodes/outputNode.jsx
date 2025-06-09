// nodes/OutputNode.jsx

import { useState } from 'react';
import BaseNode from './components/BaseNode.jsx';
import { Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      handles={[{ type: 'target', position: Position.Left, id: `${id}-value` }]}
    >
      <label className="block text-sm font-semibold text-emerald-400 mb-1">
  Name:
  <input
    type="text"
    value={currName}
    onChange={(e) => setCurrName(e.target.value)}
    className="mt-1 block w-full rounded-md bg-slate-700 border border-emerald-600 text-emerald-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
  />
</label>
<label className="block text-sm font-semibold text-pink-400 mb-1 mt-2">
  Type:
  <select
    value={outputType}
    onChange={(e) => setOutputType(e.target.value)}
    className="mt-1 block w-full rounded-md bg-slate-700 border border-pink-600 text-pink-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
  >
    <option value="Text">Text</option>
    <option value="File">Image</option>
  </select>
</label>

    </BaseNode>
  );
};
