# Graph Renderer

A small experiment to play around with rendering graphs in HTML canvas.

## Running

`npm start`

## Devlog

- 2023-07-23 - I investigated why all the nodes were rerendering when just one was highlighted - it's because the App component (that stores the highlightedNode property) changes, causing all its children to rerender. This might impact performance in the future (and I can use useMemo on Node to mitigate it), but for now it's OK to leave alone. It's not the case that because a node is rerendered, that it also 'committed' to the screen. 