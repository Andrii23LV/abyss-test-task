export interface ITreeNode {
	id: number;
	parentId: number | null;
	value: string;
	type: string;
	children?: ITreeNode[];
}

export interface IBinaryTree {
	root: ITreeNode | null;
}
