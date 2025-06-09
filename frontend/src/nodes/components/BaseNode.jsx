// components/BaseNode.jsx
import React from 'react';
import { Handle, Position } from 'reactflow';

const BaseNode = ({
  id,
  title,
  children,
  handles = [{ type: 'source', position: Position.Right, id: `${id}-value` }],
  style = {}
}) => {
  return (
    <div style={{
      width: 200,
      border: '1px solid #333',
      borderRadius: 8,
      padding: 10,
      background: '#fff',
      ...style
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: 8 }}>{title}</div>
      
      <div style={{ marginBottom: 8 }}>
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
