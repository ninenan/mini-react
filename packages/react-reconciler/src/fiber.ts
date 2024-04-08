import { Key, NeverAny, Props } from 'shared/ReactTypes';
import { WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from './hostConfig'; // 不同的宿主环境都需要实现它自身的 hostConfig

export class FiberNode {
	type: NeverAny;
	tag: WorkTag;
	pendingProps: Props;
	key: Key;
	stateNode: NeverAny;

	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;

	memoizedProps: Props | null;
	memoizedState: NeverAny;
	// 用于来会替换
	// 如果当前树是 workInProgress，那当前值指向的是 current
	// 如果当前树是 current，那当前值指向的是 workInProgress
	alternate: FiberNode | null;
	// 当前操作的标记
	flags: Flags;
	updateQueue: unknown; // 更新

	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		// 实例
		this.tag = tag;
		this.key = key;
		// HostComponent <div> div DOM
		this.stateNode = null;
		// 如果 tag 是函数组件，FunctionCompoent 那么这里指向的就是具体的函数 () => {}
		this.type = null;

		// 构成树状结构
		// 指向父级
		this.return = null;
		// 兄弟级
		this.sibling = null;
		// 子级
		this.child = null;
		// 如果同级的有多个，指向当前的下标 <ul>li * 3</ul>
		this.index = 0;

		// 工作单元
		// 初始时的 props
		this.pendingProps = pendingProps;
		// 结束时已确定的 props
		this.memoizedProps = null;
		this.updateQueue = null;
		this.memoizedState = null;

		this.alternate = null;
		// 副作用
		this.flags = NoFlags;
	}
}

export class FiberRootNode {
	container: Container;
	current: FiberNode;
	finishedWork: FiberNode | null; // 整个递归流程结束后指向的 FiberNode

	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
	}
}

export const createWorkInProgress = (
	current: FiberNode,
	pendingProps: Props
): FiberNode => {
	// 双缓冲技术
	let wip = current.alternate;

	if (wip === null) {
		// mount
		wip = new FiberNode(current.tag, pendingProps, current.key);
		wip.stateNode = current.stateNode;

		wip.alternate = current;
		current.alternate = wip;
	} else {
		// update
		wip.pendingProps = pendingProps;
		wip.flags = NoFlags; // 清除副作用
	}

	wip.type = current.type;
	wip.updateQueue = current.updateQueue;
	wip.child = current.child;
	wip.memoizedProps = current.memoizedProps;
	wip.memoizedState = current.memoizedState;

	return wip;
};
