export type WorkTag =
	| typeof FunctionComponent
	| typeof HostRoot
	| typeof HostComponent
	| typeof HostText;

export const FunctionComponent = 0; // 函数组件类型
export const HostRoot = 3; // 项目挂载的根节点 ReactDOM.render() 对应的类型
export const HostComponent = 5; // <div>
export const HostText = 6; // <div>123</div> 对应的是 123 文本类型
