import { useState } from 'react';
import { Stage, Layer, Circle, Line } from 'react-konva';

const Connection = ({ source, target }) => {
    return <Line
        points={[source.x, source.y, target.x, target.y]}
        stroke='black'
    />
}

const Node = ({ id, x, y, onPositionChanged, onMouseEnter, onMouseLeave, isHighlighted }) => {
    return (
        <Circle
            x={x}
            y={y}
            radius={20}
            fill='green'
            onDragMove={(e) => {
                onPositionChanged(e.target.attrs.x, e.target.attrs.y)
            }}
            onMouseEnter={() => { onMouseEnter(id) }}
            onMouseLeave={() => { onMouseLeave(id) }}
            stroke='blue'
            strokeWidth={isHighlighted ? 2 : 0}
            draggable
        />
    );
};


function App() {
    const [nodes, setNodes] = useState({
        "abc": { x: 100, y: 100 },
        "def": { x: 200, y: 200 }
    })
    const [connections, _] = useState({
        "abc": ["def"]
    })
    const [highlightedNodeIds, setHighlightedNodeIds] = useState(new Set())

    // Given a root node, returns all the nodes reachable from the root
    const getAllConnectedNodeIds = (rootNodeId) => {
        const connectedNodeIds = new Set()
        const unvisited = [rootNodeId]
        while(unvisited.length !== 0) {
            const id = unvisited.pop()
            connectedNodeIds.add(id);
            (connections[id] || []).forEach((connectedId) => { 
                unvisited.push(connectedId) 
            })
        }

        return connectedNodeIds
    }

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
                        return (
                            <Node
                                key={id}
                                id={id}
                                x={node.x}
                                y={node.y}
                                onPositionChanged={(x, y) => { setNodes({ ...nodes, [id]: { x, y } }) }}
                                onMouseEnter={() => {setHighlightedNodeIds(getAllConnectedNodeIds(id))}}
                                onMouseLeave={() => {setHighlightedNodeIds(new Set())}}
                                isHighlighted={highlightedNodeIds.has(id)} />
                        )
                    })}
                </Layer>
            </Stage>
        </div>
    );
}

export default App;
