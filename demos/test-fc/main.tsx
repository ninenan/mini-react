import React from 'react';
import ReactDOM from 'react-dom';

const jsx = () => {
	return (
		<div>
			<Child />
		</div>
	);
};

const Child = () => {
	return <span>function Component</span>;
};

(ReactDOM as any)
	.createRoot(document.getElementById('root') as HTMLElement)
	.render(jsx);

console.log(React);
console.log(ReactDOM);
console.log(jsx);
