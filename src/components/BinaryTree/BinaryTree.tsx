import React, { ReactElement, useState } from 'react';
import { ITreeNode } from '../../models/tree.model';
import './BinaryTree.css'
import ChooseNodeType from '../ChooseNodeType/ChooseNodeType';

interface BinaryTreeProps {
    addingNodeType: 'category' | 'service' | null
    zoomFactor: number
    rootNode: ITreeNode
    isEditing: number | null
    isAdding: number | null
    handleEditing: (id: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    handleChooseNodeType: (type: 'category' | 'service' | null) => void
    handleAdding: (id: number | null, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    addChildToNode: (tree: ITreeNode, parentId: number | null, newValue: string) => ITreeNode | null
    editChildNode: (tree: ITreeNode, parentId: number | null, id: number, newValue: string) => ITreeNode | null
    deleteChildNode: (tree: ITreeNode, parentId: number | null, id: number) => ITreeNode | null
}

const BinaryTree: React.FC<BinaryTreeProps> = (
    { addingNodeType,
        zoomFactor,
        rootNode,
        isEditing,
        isAdding,
        handleEditing,
        handleChooseNodeType,
        handleAdding,
        addChildToNode,
        editChildNode,
        deleteChildNode
    }): ReactElement => {
    const [value, setValue] = useState<string>('');

    const handleValueChange = (newValue: string): void => {
        setValue(newValue);
    }

    const renderNode = (node: ITreeNode | undefined): JSX.Element | null => {
        if (!node) return null;

        return (
            <div className="node">
                <form className='item'>
                    {isEditing === node.id ? <input
                        value={value ? value : node.value}
                        onChange={(e) => handleValueChange(e.target.value)}
                        className={`${node.parentId === 0 ? 'first-value' : 'value'}`} />
                        : <span className={`${node.parentId === 0 ? 'first-value' : 'value'}`}>{node.value}</span>}
                    {isEditing === node.id ? (
                        <div className='item-tools'>
                            <button type='button' onClick={(e) => handleEditing(node.id, e)}>cancel</button>
                            <button type='submit' onClick={() => {
                                editChildNode(rootNode, node.parentId, node.id, value !== '' ? value : node.value);
                                handleValueChange('')
                            }}
                            >
                                submit
                            </button>
                        </div>
                    ) : (
                        <div className='item-tools'>
                            <button type='button' onClick={(e) => handleAdding(node.id, e)}>add</button>
                            {isAdding === node.id && !addingNodeType ? <ChooseNodeType handleChooseNodeType={handleChooseNodeType} /> : null}
                            {node.parentId !== 0 ?
                                <React.Fragment>
                                    <button type='button' onClick={(e) => handleEditing(node.id, e)}>edit</button>
                                    <button type='button' onClick={() => deleteChildNode(rootNode, node.parentId, node.id)}>
                                        delete
                                    </button>
                                </React.Fragment> : null}
                        </div>
                    )
                    }
                </form >

                <div className="connections">
                    {node?.children?.map((child) => (
                        <div key={child.id} className="child-node">
                            {renderNode(child)}
                        </div>
                    ))}
                    {isAdding === node.id && addingNodeType ? (
                        <form onSubmit={() => { addChildToNode(rootNode, node.id, value); handleValueChange('') }} className='item'>
                            <input
                                value={value}
                                onChange={(e) => handleValueChange(e.target.value)}
                                className='value'
                            />
                            <button type="button" onClick={(e) => { handleAdding(null, e); handleValueChange('') }}>
                                cancel
                            </button>
                            <button type="submit">add</button>
                        </form>
                    ) : null}
                </div>

            </div >
        );
    };

    return (
        <div
            className="binary-tree draggable"
            draggable
            style={{
                transform: `scale(${zoomFactor})`,
            }}
        >
            {renderNode(rootNode)}
        </div>
    );
}

export default BinaryTree;
