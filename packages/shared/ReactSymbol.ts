const supportSymbol = typeof Symbol === 'function' && Symbol.for;

// 首先判断宿主环境是否支持 symbol，不支持使用自定义的值
export const REACT_ELEMENT_TYPE = supportSymbol
	? Symbol.for('react.element')
	: 0xeac7;
