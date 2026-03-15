import { Container } from 'hostConfig';
import {
	createContainer,
	updateContainer
} from 'react-reconciler/src/fiberReconciler';
import { ReactElementType } from 'shared/ReactTypes';

// ReactDOM.creatRoot(root).render(<App/>);
export const createRoot = (container: Container) => {
	const root = createContainer(container);

	return {
		render(element: ReactElementType) {
			updateContainer(element, root);
		}
	};
};
