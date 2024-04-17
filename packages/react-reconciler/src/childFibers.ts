import { ReactElementType } from 'shared/ReactTypes';
import { FiberNode, createFiberFromElement } from './fiber';
import { HostText } from './workTags';
import { Placement } from './fiberFlags';
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbol';

const ChildReconciler = (shouldTrackEffects: boolean) => {
	const reconcileSingleElement = (
		returnFiber: FiberNode, // 父节点
		currentFiber: FiberNode | null,
		element: ReactElementType
	) => {
		// 根据 element 创建 fiberNode
		const fiber = createFiberFromElement(element);
		fiber.return = returnFiber;
		return fiber;
	};

	// 创建文本内容 fiber
	const reconcileSingleTextNode = (
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		content: string | number
	) => {
		const fiber = new FiberNode(HostText, { content }, null);
		fiber.return = returnFiber;

		return fiber;
	};

	const placeSingleChild = (fiber: FiberNode) => {
		if (shouldTrackEffects && fiber.alternate !== null) {
			// 当首屏渲染且需要追踪副作用的情况下才需要标记副作用
			fiber.flags != Placement;
		}
		return fiber;
	};

	return function reconcileChildFibers(
		returnFiber: FiberNode, // 父节点
		currentFiber: FiberNode | null, // 当前节点
		newChild?: ReactElementType
	) {
		// 判断
		if (typeof newChild === 'object' && newChild !== null) {
			switch (newChild.$$typeof) {
				case REACT_ELEMENT_TYPE:
					return placeSingleChild(
						reconcileSingleElement(returnFiber, currentFiber, newChild)
					);
				default:
					if (__DEV__) {
						console.warn('未实现的 reconcile 类型', newChild);
					}
					break;
			}
		}
		// TODO: 多节点的情况 <ul>li *3 </ul>

		// 文本节点内容
		if (typeof newChild === 'string' || typeof newChild === 'number') {
			return placeSingleChild(
				reconcileSingleTextNode(returnFiber, currentFiber, newChild)
			);
		}

		if (__DEV__) {
			console.warn('未实现的 reconcile 类型2', newChild);
		}

		return null;
	};
};

export const reconcileChildFibers = ChildReconciler(true); // 更新阶段使用
export const mountChildFibers = ChildReconciler(false); // mount 阶段使用
