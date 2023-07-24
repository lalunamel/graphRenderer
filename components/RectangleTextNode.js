import { Rect, Text, Group } from 'react-konva';

const PADDING = 10
const FONT_SIZE = 18

export default RectangleTextNode = ({ id, x, y, text, onPositionChanged, onMouseEnter, onMouseLeave, isHighlighted }) => {
    const width = (text.length * FONT_SIZE) + (PADDING * 2)
    const height = (FONT_SIZE + (PADDING * 2))

    return (
        <Group
            onMouseEnter={() => { onMouseEnter(id) }}
            onMouseLeave={() => { onMouseLeave(id) }}>
            <Rect
                x={x - (width / 2)}
                y={y - (height / 2)}
                width={width}
                height={height}
                fill='white'
                stroke={isHighlighted ? 'red' : 'black'}
                strokeWidth={4}
            />
            <Text
                x={x}
                y={y}
                text={text}
                fontSize={FONT_SIZE}
            />
        </Group>
    );
};