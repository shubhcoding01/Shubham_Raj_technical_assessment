// components/BaseNode.jsx
import React from 'react';
import { Handle, Position } from 'reactflow';

const BaseNode = ({
  id,
  title,
  children,
  handles = [{ type: 'source', position: Position.Right, id: `${id}-value` }],
  className = '',
}) => {
  return (
    <div
      className={`w-52 border border-gray-800 rounded-lg p-2.5 bg-white ${className}`}
      style={{ minWidth: 200 }} // to ensure minimum width, optional
    >
      <div className="font-bold mb-2">{title}</div>

      <div className="mb-2">
        {children}
      </div>

      {handles.map((handle, idx) => (
        <Handle
          key={idx}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style || {}}
        />
      ))}
    </div>
  );
};

export default BaseNode;
