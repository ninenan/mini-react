// 为什么需要这个文件
// 防止别人滥用 reactElement，因此需要一个一个独一无二的值

// 首先判断宿主环境是否支持 symbol，不支持使用自定义的值
const supportSymbol = typeof Symbol === 'function' && Symbol.for;

// 首先判断宿主环境是否支持 symbol，不支持使用自定义的值
export const REACT_ELEMENT_TYPE = supportSymbol
	? Symbol.for('react.element')
	: 0xeac7;
