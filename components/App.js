import { useState } from 'react';
import { Stage, Layer } from 'react-konva';

import Connection from './Connection'
import { Node } from './Node';

// TODO: remove drag and drop
// TODO: Find a good visual design for architecture graphs like this and implement it

const connections = {
    "abc": ["def"],
    "def": ["g"]
}

export const getAllConnectedNodeIds = (rootNodeId) => {
    const connectedNodeIds = new Set()
    const unvisited = [rootNodeId]
    while (unvisited.length !== 0) {
        const id = unvisited.pop()
        connectedNodeIds.add(id); // Automatic semicolon insertion fails here because the next line begins with () that looks like a function invocation
        (connections[id] || []).forEach((connectedId) => {
            unvisited.push(connectedId)
        })
    }

    return connectedNodeIds
}

function App() {
    const [nodes, setNodes] = useState({
        "abc": { x: 100, y: 100 },
        "def": { x: 180, y: 240 },
        "g": { x: 300, y: 300 }
    })
    const [highlightedNodeIds, setHighlightedNodeIds] = useState(new Set())

    // console.log(nodes["g"])
    return (
        <div className="App">
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {Object.keys(connections).map((sourceId) => {
                        return connections[sourceId].map((targetId) => {
                            return (
                                <Connection
                                    key={`${sourceId}-${targetId}`}
                                    source={nodes[sourceId]}
                                    target={nodes[targetId]} />
                            )
                        })
                    })}
                </Layer>
                <Layer>
                    {Object.entries(nodes).map(([id, node]) => {
                        return <Node
                            key={id}
                            id={id}
                            node={node}
                            setNodes={setNodes}
                            isHighlighted={highlightedNodeIds.has(id)}
                            setHighlightedNodeIds={setHighlightedNodeIds}
                        />
                    })}
                </Layer>
            </Stage>
        </div>
    );
}

export default App;
