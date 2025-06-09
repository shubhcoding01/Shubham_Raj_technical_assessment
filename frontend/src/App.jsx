import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

const App = () => {
  return (
    <ReactFlowProvider>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
      </div>
    </ReactFlowProvider>
  );
};

export default App;
