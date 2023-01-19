import React from 'react';
import './style.css';

const computeBoxes = (rect, node, dir) => {
  if (node.type === 'tile') {
    return [{ rect, tileId: node.tileId }];
  }
  
  const itemW = dir === 'columns' ? rect.w / node.nodes.length : rect.w;
  const itemH = dir === 'columns' ? rect.h : rect.h / node.nodes.length;
  
  const result = [];
  let x = rect.x;
  let y = rect.y;
  
  for(const n of node.nodes) {
    result.push(...computeBoxes({ x, y, w: itemW, h: itemH }, n, dir === 'columns' ? 'rows' : 'columns'));
    dir === 'columns' ? x += itemW : y += itemH;
  }

  return result;
}

const Container = ({ rect, node, dir, children }) => {
  const boxes = computeBoxes(rect, node, dir);
  
  return (
    <div className="container">
      {
        boxes.map((box) => (
          <div
            className="item"
            style={{ 
              left: `${box.rect.x}px`,
              top: `${box.rect.y}px`,
              width: `${box.rect.w}px`,
              height: `${box.rect.h}px`
            }}
          >
            { children[box.tileId] }
          </div>
        )
      )}
    </div>
  )
};

export default Container;
