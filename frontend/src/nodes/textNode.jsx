import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from './components/BaseNode.jsx';
import TextareaAutosize from 'react-textarea-autosize';

const VARIABLE_REGEX = /\{\{(\w+)\}\}/g;

const TextNode = ({ id, data, selected }) => {
  const [text, setText] = useState(data.text || '');
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const found = [...text.matchAll(VARIABLE_REGEX)].map(match => match[1]);
    setVariables([...new Set(found)]); // ensure uniqueness
  }, [text]);

  const onChange = useCallback((e) => {
    const value = e.target.value;
    setText(value);
    data.text = value;
  }, [data]);

  const variableHandles = useMemo(() => {
    return variables.map((v, i) => (
      <Handle
        key={v}
        type="target"
        position={Position.Left}
        id={v}
        style={{ top: 40 + i * 20 }}
      />
    ));
  }, [variables]);

  return (
    <BaseNode title="Text" selected={selected}>
      {variableHandles}

      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-300 mb-1">Text:</label>
        <TextareaAutosize
          value={text}
          onChange={onChange}
          minRows={2}
          className="w-full p-2 rounded border bg-zinc-900 text-white text-sm resize-none"
          placeholder="Enter text with {{variable}}..."
        />
      </div>

      {variables.length > 0 && (
        <div className="mt-2">
          <label className="block text-xs font-semibold text-gray-400 mb-1">Variables:</label>
          <div className="flex flex-wrap gap-1">
            {variables.map(v => (
              <span
                key={v}
                className="bg-blue-900 text-blue-300 text-xs font-medium px-2 py-0.5 rounded-full border border-blue-600"
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      )}
    </BaseNode>
  );
};

export default TextNode;
