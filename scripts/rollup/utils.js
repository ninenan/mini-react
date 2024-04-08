import path from 'path';
import fs from 'fs';
import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';

const pkgPath = path.resolve(__dirname, '../../packages'); // 包的路径
const distPath = path.resolve(__dirname, '../../dist/node_modules'); // 打包产物路径

// 获取对应的包路径
export const resolvePkgPath = (pkgName, isDist) => {
	if (isDist) {
		return `${distPath}/${pkgName}`;
	}

	return `${pkgPath}/${pkgName}`;
};

// 获取对应的 package.json 文件
export const getPackageJSON = (pkgName) => {
	const path = `${resolvePkgPath(pkgName)}/package.json`;
	const str = fs.readFileSync(path, { encoding: 'utf8' });

	return JSON.parse(str);
};

// 获取公共的 rollup 插件
export const getBaseRollupPlugins = ({ typescript = {} } = {}) => {
	return [cjs(), ts(typescript)];
};
