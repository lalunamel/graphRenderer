class Node {
    constructor(label, x, y) {
        this.id = crypto.randomUUID()
        this.label = label
        this.x = x
        this.y = y
        this.connections = []
    }

    addConnection(destinationNodeId) {
        this.connections.push(destinationNodeId)
    }

    drawNode(ctx) {
        // Draw a circle for each node
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = '#f00'; // Set the fill color
        ctx.fill();

        // Render the node label
        ctx.fillStyle = '#000'; // Set the label color
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.label, this.x, this.y + 30);
    }

    drawConnection(ctx, targetNode) {
        // Draw a line between source and target nodes
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(targetNode.x, targetNode.y);
        ctx.strokeStyle = '#000'; // Set the line color
        ctx.lineWidth = 2; // Set the line width
        ctx.stroke();
    }

    draw(ctx) {
        this.connections.forEach((connection) => { this.drawConnection(ctx, connection) })
        this.drawNode(ctx)
    }
}

export default Node