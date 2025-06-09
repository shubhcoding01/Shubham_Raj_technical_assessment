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
      <label>
        Name:
        <input type="text" value={currName} onChange={(e) => setCurrName(e.target.value)} style={{ width: '100%' }} />
      </label>
      <label>
        Type:
        <select value={outputType} onChange={(e) => setOutputType(e.target.value)} style={{ width: '100%' }}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
