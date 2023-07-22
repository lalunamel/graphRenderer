import { Circle } from 'react-konva';

export default CircleNode = ({ id, x, y, onPositionChanged, onMouseEnter, onMouseLeave, isHighlighted }) => {
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