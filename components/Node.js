import { useCallback } from 'react';
import RectangleTextNode from './RectangleTextNode';
import CircleNode from './CircleNode';
import { getAllConnectedNodeIds } from './App';

export function Node({ id, node, setNodes, isHighlighted, setHighlightedNodeIds }) {
    const handlePositionChanged = useCallback((x, y) => {
        setNodes(prevNodes => ({ ...prevNodes, [id]: { x, y } }));
    }, [id, node.x, node.y]);

    const handleMouseEnter = useCallback((id) => {
        setHighlightedNodeIds(getAllConnectedNodeIds(id));
    }, [id]);

    const handleMouseLeave = useCallback(() => {
        setHighlightedNodeIds(new Set());
    }, []);

    return (
        <RectangleTextNode
            key={id}
            id={id}
            text={id}
            x={node.x}
            y={node.y}
            onPositionChanged={handlePositionChanged}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            isHighlighted={isHighlighted} />
    );
}
