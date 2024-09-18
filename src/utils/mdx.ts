import React, { ReactNode } from 'react';

export interface Header {
  id: string;
  level: number;
  text: string;
}

let headerCount = 0;

export function extractHeaders(children: React.ReactNode): Header[] {
  console.log("children",children)
  const headers: Header[] = [];

  function traverse(node: React.ReactNode) {
    if (!node) return;

    
    if (Array.isArray(node)) { // 배열일 경우
      console.log('Traversing array node:', node);
      node.forEach((child) => traverse(child));
    } else if (React.isValidElement(node)) { // 배열이 아닐 경우
      const { type, props } = node;
      console.log('Traversing valid element:', node);
      console.log('Element type:', type);
      console.log('Element props:', props);

      if (typeof type === 'string' && /^h[1-6]$/.test(type)) {
        const headerLevel = parseInt(type.substring(1), 10);
        const id = `header-${++headerCount}`;
        const text = React.Children.toArray(props.children).reduce((acc, child) => {
          if (typeof child === 'string') {
            return acc + child;
          } else if (React.isValidElement(child)) {
            return acc + extractTextFromNode(child);
          }
          return acc;
        }, '');

        headers.push({
          id,
          level: headerLevel,
          text,
        });

        console.log('Extracted header:', { id, level: headerLevel, text });
      }

      if (props && props.children) {
        traverse(props.children);
      }
    } else {
      console.log('Node is not valid element or array:', node);
    }
  }

  function extractTextFromNode(node: React.ReactNode): string {
    if (typeof node === 'string') {
      console.log("node",node)
      return node;
    } else if (React.isValidElement(node)) {
      console.log("isValidElement",React.Children.toArray(node.props.children).reduce((acc, child) => {
        return acc + extractTextFromNode(child);
      }, ''))
      return React.Children.toArray(node.props.children).reduce((acc, child) => {
        return acc + extractTextFromNode(child);
      }, '');
    }
    return '';
  }

  console.log('Starting traversal with children:', children);
  traverse(children);
  console.log('Final extracted headers:', headers);
  return headers;
}
