import { Action } from 'shared/ReactTypes';

export interface Update<State> {
	action: Action<State>;
}

export interface UpdateQueue<State> {
	// 为什么是以下的结构
	// 主要是为了在 workInProgress 中的 fiber 和 current 中的 fiber 中可以共用同一个更新函数
	shared: {
		pending: Update<State> | null;
	};
}

// 初始化 Update
export const createUpdate = <State>(action: Action<State>): Update<State> => {
	return {
		action
	};
};

// 初始化 UpdateQueue
export const createUpdateQueue = <State>() => {
	return {
		shared: {
			pending: null
		}
	} as UpdateQueue<State>;
};

// 将 Update 插入到 UpdateQueue 中
export const enqueueUpdate = <State>(
	updateQueue: UpdateQueue<State>,
	update: Update<State>
) => {
	updateQueue.shared.pending = update;
};

// 消费 update
export const processUpdateQueue = <State>(
	baseState: State, // 初始化的值
	pendingUpdate: Update<State> | null // 更新操作
): { memoizedState: State } => {
	const result: ReturnType<typeof processUpdateQueue<State>> = {
		memoizedState: baseState
	};

	if (pendingUpdate !== null) {
		const action = pendingUpdate.action;
		if (action instanceof Function) {
			// baseState 1
			// update (x) => 2x -> memoizedState 2
			result.memoizedState = action(baseState);
		} else {
			// baseState 1
			// update===2 -> memoizedState 2
			result.memoizedState = action;
		}
	}

	return result;
};
