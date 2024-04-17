import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { FiberNode, FiberRootNode, createWorkInProgress } from './fiber';
import { HostRoot } from './workTags';

let workInProgress: FiberNode | null = null;

const prepareFreshStack = (root: FiberRootNode) => {
	workInProgress = createWorkInProgress(root.current, {}); // 返回创建生成 fiberNode - 与之相对应的 alternate
};

// 在 Fiber 中调度 update
export const scheduleUpdateOnFiber = (fiber: FiberNode) => {
	// TODO: 调度功能
	// root = fiberRootNode
	const root = markUpdateFromFiberToRoot(fiber);
	renderRoot(root);
};

// 从当前更新节点一直向上遍历直到返回根节点 fiberRootNode
export const markUpdateFromFiberToRoot = (fiber: FiberNode) => {
	let node = fiber;
	let parent = node.return;
	// 向上遍历，直到 hostRootFiber
	while (parent !== null) {
		// 普通的 FiberNode
		node = parent;
		parent = node.return;
	}
	if (node.tag === HostRoot) {
		return node.stateNode;
	}

	return null;
};

const renderRoot = (root: FiberRootNode) => {
	// 初始化
	prepareFreshStack(root);

	do {
		try {
			wookLoop();
			break;
		} catch (error) {
			if (__DEV__) {
				console.warn('workloop 发生错误：', error);
			}
			workInProgress = null;
		}
		// eslint-disable-next-line
	} while (true);

	if (workInProgress !== null) {
		console.warn('render 阶段结束时 wip 不会 null');
	}
	const finishedWork = root.current.alternate;
	root.finishedWork = finishedWork;

	// TODO: commint 阶段操作
	// commitRoot(root);
};

const wookLoop = () => {
	while (workInProgress !== null) {
		performUnitOfWork(workInProgress);
	}
};

const performUnitOfWork = (fiber: FiberNode) => {
	const next = beginWork(fiber); // next 可能是 null 也可能是子 fiber

	fiber.memoizedProps = fiber.pendingProps;

	if (next === null) {
		// 如果没有子节点，则执行归操作
		completeUnitOfWork(fiber);
	} else {
		// 存在子节点，继续向下遍历
		workInProgress = next;
	}
};

const completeUnitOfWork = (fiber: FiberNode) => {
	let node: FiberNode | null = fiber;

	do {
		completeWork(fiber);
		const sibling = node.sibling;

		if (sibling !== null) {
			// 如果存在兄弟节点
			workInProgress = sibling;
			return;
		}

		// 遍历父节点
		node = node.return;
		workInProgress = node;
	} while (node !== null);
};
