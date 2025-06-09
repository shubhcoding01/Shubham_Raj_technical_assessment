// nodes/TextNode.jsx

import { useState } from 'react';
import BaseNode from './components/BaseNode.jsx';
import { Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  return (
    <BaseNode
      id={id}
      title="Text"
      handles={[{ type: 'source', position: Position.Right, id: `${id}-output` }]}
    >
      <label className="block text-sm font-semibold text-indigo-400 mb-1">
  Text:
  <input
    type="text"
    value={currText}
    onChange={(e) => setCurrText(e.target.value)}
    className="mt-1 block w-full rounded-md bg-slate-700 border border-indigo-600 text-indigo-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
  />
</label>

    </BaseNode>
  );
};
