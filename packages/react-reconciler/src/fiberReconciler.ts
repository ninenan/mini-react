import { ReactElementType } from 'shared/ReactTypes';
import { FiberNode, FiberRootNode } from './fiber';
import { Container } from './hostConfig';
import {
	UpdateQueue,
	createUpdate,
	createUpdateQueue,
	enqueueUpdate
} from './updateQueue';
import { HostRoot } from './workTags';
import { scheduleUpdateOnFiber } from './workLoop';

// 当执行 ReactDOM.createRoot() 内部将会执行 createContainer 方法
export const createContainer = (container: Container) => {
	const hostRootFiber = new FiberNode(HostRoot, {}, null);
	const root = new FiberRootNode(container, hostRootFiber);
	hostRootFiber.updateQueue = createUpdateQueue();

	return root;
};

// 当执行 ReactDOM.createRoot().render 方法是内部将会执行 updateContainer 方法
export const updateContainer = (
	element: ReactElementType | null,
	root: FiberRootNode
) => {
	const hostRootFiber = root.current;
	const update = createUpdate<ReactElementType | null>(element);

	enqueueUpdate(
		hostRootFiber.updateQueue as UpdateQueue<ReactElementType | null>,
		update
	);

	scheduleUpdateOnFiber(hostRootFiber);

	return element;
};
