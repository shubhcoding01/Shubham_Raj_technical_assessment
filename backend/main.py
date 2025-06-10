from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
import networkx as nx

app = FastAPI()

# Enable CORS for all origins (for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----- Pydantic models -----
class Node(BaseModel):
    id: str
    type: str
    data: Dict

class Edge(BaseModel):
    id: str
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

# ----- Root Health Check -----
@app.get("/")
def read_root():
    return {"status": "Pipeline backend is running ✅"}

# ----- Pipeline Parse Endpoint -----
@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: Pipeline):
    try:
        # Create directed graph
        G = nx.DiGraph()

        # Add nodes
        for node in pipeline.nodes:
            G.add_node(node.id)

        # Add edges
        for edge in pipeline.edges:
            G.add_edge(edge.source, edge.target)

        # DAG check
        is_dag = nx.is_directed_acyclic_graph(G)

        # Topological sort (if DAG)
        topo_order = list(nx.topological_sort(G)) if is_dag else []

        return {
            "num_nodes": len(pipeline.nodes),
            "num_edges": len(pipeline.edges),
            "is_dag": is_dag,
            "topological_order": topo_order,
        }

    except Exception as e:
        return {"error": str(e)}
