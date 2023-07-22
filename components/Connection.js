import { Line } from 'react-konva';

export default Connection = ({ source, target }) => {
    return <Line
        points={[source.x, source.y, target.x, target.y]}
        stroke='black'
    />
}