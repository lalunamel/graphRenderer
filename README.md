# Graph Renderer

A small experiment to play around with rendering graphs in HTML canvas.

## Running

`npm start`

## Devlog

- 2023-07-23 - I investigated why all the nodes were rerendering when just one was highlighted - it's because the App component (that stores the highlightedNode property) changes, causing all its children to rerender. This might impact performance in the future (and I can use useMemo on Node to mitigate it), but for now it's OK to leave alone. It's not the case that because a node is rerendered, that it also 'committed' to the screen.
- 2023-07-23 - When dragging and dropping nodes, they stutter around the screen. I think this is because the konva drag and drop functionality is fighting with the fact that the position of the elements is controlled by the App component. That is to say, I am setting the Node position via useState, but konva is also attempting to set the location of the rendered Node itself. Thus, they conflict and the Node jumps all over the place. 
    - I think I have a couple options here:
        - Don't control the position of the nodes myself
            - I need their position in state so that Connections can be drawn between the nodes. I suppose positions could be read from Konva and used to render Connections without having those values impact the drawing of Nodes?
        - Implement my own drag and drop that integrates well with the position of the Node components
            - Probably not that hard - is it worth it?
        - Don't do drag and drop right now
            - I like this the most honestly. How useful is drag and drop right now? Unclear. Mostly it was just a "nice to have"