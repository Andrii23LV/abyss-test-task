import React, { useState } from 'react';
import './App.css';
import BinaryTree from './components/BinaryTree/BinaryTree';
import { ITreeNode } from './models/tree.model';
import ZoomTools from './components/ZoomTools/ZoomTools';

const tree: ITreeNode = {
  id: 1,
  parentId: 0,
  value: "Categories",
  type: 'category',
  children: [
  ],
};


function App() {
  const [rootNode, setRootNode] = useState<ITreeNode>(tree)
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState<number | null>(null);

  const [addingNodeType, setAddingNodeType] = useState<'category' | 'service' | null>(null);

  const [zoomFactor, setZoomFactor] = useState(1);

  //Zoom functions
  const zoomIn = () => {
    if (zoomFactor < 2) {
      setZoomFactor(zoomFactor + 0.1);
    }
  };

  const zoomOut = () => {
    if (zoomFactor > 0.5) {
      setZoomFactor(zoomFactor - 0.1);
    }
  };

  const handleZoomChange = (percent: number): void => {
    const newZoomFactor = percent / 100;
    setZoomFactor(newZoomFactor);
  };

  //Binary tree functions
  const handleEditing = (id: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    setIsEditing((prevId: number | null) => (id === prevId ? null : id));
  }

  const handleAdding = (id: number | null, e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    setIsAdding((prevId: number | null) => (id === prevId ? null : id));
  }

  const addChildToNode = (tree: ITreeNode, parentId: number | null, newValue: string): ITreeNode | null => {
    if (tree.id === parentId) {
      if (!tree.children) {
        tree.children = [];
      }

      if (!addingNodeType) return null;

      const newChild: ITreeNode = {
        id: Math.floor(Math.random() * 10000),
        parentId: tree.id,
        value: newValue,
        type: addingNodeType,
      };

      const updatedChildren = [...tree.children, newChild];

      const updatedTree: ITreeNode = { ...tree, children: updatedChildren };

      setRootNode(updatedTree);
      setIsAdding(null);
      setAddingNodeType(null);

      return updatedTree;
    } else if (tree.children && tree.children.length > 0) {
      for (const child of tree.children) {
        const updatedNode = addChildToNode(child, parentId, newValue);
        if (updatedNode !== null) {
          const updatedChildren = tree.children.map(item =>
            item.id === updatedNode.id ? updatedNode : item
          );
          const updatedTree: ITreeNode = { ...tree, children: updatedChildren };

          setRootNode(updatedTree);
          setIsAdding(null);
          setAddingNodeType(null);

          return updatedTree;
        }
      }
    }
    return null;
  }


  const editChildNode = (tree: ITreeNode, parentId: number | null, id: number, newValue: string): ITreeNode | null => {
    if (parentId === 0) {
      const updatedTree: ITreeNode = { ...tree, value: newValue };
      setRootNode(updatedTree);
      setIsEditing(null);
      return updatedTree;
    }

    if (tree.id === parentId && tree.children) {
      const updatedChildren = tree.children.map(item => item.id === id ? { ...item, value: newValue } : item);
      const updatedTree: ITreeNode = { ...tree, children: updatedChildren };

      setRootNode(updatedTree);
      setIsEditing(null);

      return updatedTree;
    } else if (tree.children && tree.children.length > 0) {
      for (const child of tree.children) {
        const updatedNode = editChildNode(child, parentId, id, newValue);
        if (updatedNode !== null) {
          const updatedChildren = tree.children.map(item =>
            item.id === updatedNode.id ? updatedNode : item
          );
          const updatedTree: ITreeNode = { ...tree, children: updatedChildren };

          setRootNode(updatedTree);

          return updatedTree;
        }
      }
    }
    return null;
  };


  const deleteChildNode = (tree: ITreeNode, parentId: number | null, id: number): ITreeNode | null => {
    if (tree.id === parentId && tree.children) {
      const updatedChildren = tree.children.filter(item => item.id !== id);
      const updatedTree: ITreeNode = { ...tree, children: updatedChildren };

      setRootNode(updatedTree);
      return updatedTree;
    } else if (tree.children && tree.children.length > 0) {
      for (const child of tree.children) {
        const updatedNode = deleteChildNode(child, parentId, id);
        if (updatedNode !== null) {
          const updatedChildren = tree.children.map(item =>
            item.id === updatedNode.id ? updatedNode : item
          );
          const updatedTree: ITreeNode = { ...tree, children: updatedChildren };

          setRootNode(updatedTree);
          return updatedTree;
        }
      }
    }
    return null;
  };

  //function to choose item type if isAddig is true 

  const handleChooseNodeType = (type: 'category' | 'service' | null): void => {
    setAddingNodeType(type);
  }

  return (
    <div className="App" >
      <ZoomTools zoomIn={zoomIn} zoomOut={zoomOut} handleZoomChange={handleZoomChange} zoomFactor={zoomFactor} />
      <BinaryTree
        addingNodeType={addingNodeType}
        zoomFactor={zoomFactor}
        rootNode={rootNode}
        isEditing={isEditing}
        isAdding={isAdding}
        handleEditing={handleEditing}
        handleChooseNodeType={handleChooseNodeType}
        handleAdding={handleAdding}
        addChildToNode={addChildToNode}
        editChildNode={editChildNode}
        deleteChildNode={deleteChildNode} />
    </div>
  );
}

export default App;
