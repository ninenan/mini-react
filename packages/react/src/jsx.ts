import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbol';
import {
	Key,
	Props,
	ReactElementType,
	Ref,
	Type,
	ElementType,
	NeverAny
} from 'shared/ReactTypes';
// jsx 返回的是 ReactElement 的数据结构

const ReactElement = (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType => {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'nnn' // 自己随意
	};

	return element;
};

const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (obj: Record<string, NeverAny>, key: NeverAny) =>
	hasOwnProperty.call(obj, key);

export const jsx = (
	type: ElementType,
	config: NeverAny,
	...maybeChildren: NeverAny[] // 是一个或者多个 ReactElement
) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

	for (const prop in config) {
		const val = config[prop];

		// 判断 key
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}

		// 判断 ref
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}

		if (hasOwn(config, prop)) {
			props[prop] = val;
		}

		const maybeChildrenLen = maybeChildren.length;

		// props.children 的存在形式可能是 child 或者是 [child, child, child...]
		if (maybeChildrenLen) {
			if (maybeChildrenLen === 1) {
				// 如果 children 只有一个，直接就是当前项目
				props.children = maybeChildren[0];
			} else {
				// 如果 children 有多个，那就是一个数组
				props.children = maybeChildren;
			}
		}
	}

	return ReactElement(type, key, ref, props);
};

export const jsxDEV = (type: ElementType, config: NeverAny) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

	for (const prop in config) {
		const val = config[prop];

		// 判断 key
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}

		// 判断 ref
		if (props === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}

		if ({}.hasOwnProperty.call(config, prop)) {
			props[props] = val;
		}
	}

	return ReactElement(type, key, ref, props);
};
