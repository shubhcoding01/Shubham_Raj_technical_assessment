// nodes/TextNode.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Position, Handle } from 'reactflow';
import BaseNode from './components/BaseNode.jsx';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textAreaRef = useRef(null);

  // Resize textarea dynamically
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  // Detect variables like {{name}} and update handles
  useEffect(() => {
    const regex = /{{\s*([a-zA-Z_]\w*)\s*}}/g;
    const matches = new Set();
    let match;

    while ((match = regex.exec(currText)) !== null) {
      matches.add(match[1]);
    }

    setVariables([...matches]);
  }, [currText]);

  return (
    <BaseNode
      id={id}
      title="Text"
      className="bg-gray-800 text-white"
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-output` },
        ...variables.map((v, idx) => ({
          type: 'target',
          position: Position.Left,
          id: `${id}-${v}`,
          style: { top: `${(idx + 1) * 25}px` }
        })),
      ]}
    >
      <label className="block text-sm text-white mb-1">
        Text:
        <textarea
          ref={textAreaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          placeholder="Write text with {{variables}}"
          className="w-full bg-slate-700 text-white rounded p-2 resize-none mt-1 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={1}
        />
      </label>
    </BaseNode>
  );
};
