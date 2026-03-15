import { NeverAny } from 'shared/ReactTypes';

export type Container = Element;
export type Instance = Element;

export const createInstance = (type: string, props?: NeverAny): Instance => {
	console.log('props :>> ', props);
	// TODO: 处理 props
	const element = document.createElement(type);
	return element;
};

export const appendInitialChild = (
	parent: Instance | Container,
	child: Instance
) => {
	parent.appendChild(child);
};

export const createTextInstance = (content: string) => {
	return document.createTextNode(content);
};

export const appendChildToContainer = appendInitialChild;
