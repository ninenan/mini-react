export const toString = Object.prototype.toString;

export const isFunction = <V>(params: V) =>
	toString.call(params) === '[object Function]';
