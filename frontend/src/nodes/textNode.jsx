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
      <label>
        Text:
        <input
          type="text"
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          style={{ width: '100%' }}
        />
      </label>
    </BaseNode>
  );
};
