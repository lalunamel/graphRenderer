import { Rect, Text, Group } from 'react-konva';
import { memo } from 'react';

const PADDING = 10
const FONT_SIZE = 18

export default RectangleTextNode = memo(({ id, x, y, text, onPositionChanged, onMouseEnter, onMouseLeave, isHighlighted }) => {
    const width = (text.length * FONT_SIZE) + (PADDING*2)
    const height = (FONT_SIZE + (PADDING*2))
    
    return (
        <Group>
            <Rect
                cornerRadius={5}
                x={x - (width/2)}
                y={y - (height/2)}
                width={width}
                height={height}
                radius={20}
                fill='green'
                onDragMove={(e) => {
                    // console.log("e.target.attrs.x", e.target.attrs.x)
                    onPositionChanged(e.target.attrs.x, e.target.attrs.y)
                }}
                onMouseEnter={() => { onMouseEnter(id) }}
                onMouseLeave={() => { onMouseLeave(id) }}
                stroke='blue'
                strokeWidth={isHighlighted ? 2 : 0}
                draggable
            />
            <Text
                x={x}
                y={y}
                text={text}
                fontSize={FONT_SIZE}
            />
        </Group>
    );
}, (previousProps, nextProps) => {
    for(key in previousProps) {
        if(previousProps[key] !== nextProps[key]) {
            console.log(key, "not equal for id", previousProps.id)
        }
    }
    return false
});