export async function submitPipeline(nodes, edges) {
  try {
    const response = await fetch('http://localhost:8000/pipelines/parse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nodes, edges }),
    });

    const result = await response.json();

    alert(`✅ Pipeline Info:
- Nodes: ${result.num_nodes}
- Edges: ${result.num_edges}
- Is DAG: ${result.is_dag ? 'Yes' : 'No'}`);
  } catch (error) {
    alert('❌ Failed to submit pipeline: ' + error.message);
  }
}
