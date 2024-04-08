export type NeverAny = any;
export type Type = NeverAny;
export type Key = NeverAny;
export type Ref = NeverAny;
export type Props = NeverAny;
export type ElementType = NeverAny;

export interface ReactElementType {
	$$typeof: symbol | number;
	type: ElementType;
	key: Key;
	ref: Ref;
	props: Props;
	__mark: string; // 自己随意
}

export type Action<State> = State | ((prevState: State) => State);
