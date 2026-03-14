export type Flags = number;

export const NoFlags = 0b0000001;
export const Placement = 0b0000010; // 插入
export const Update = 0b0000100; // 更新
export const childDeletion = 0b0001000; // 删除

// 代表了 mutation 阶段需要执行的操作
export const MutationMask = Placement | Update | childDeletion;
