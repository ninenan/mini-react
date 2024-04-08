import { getBaseRollupPlugins, getPackageJSON, resolvePkgPath } from './utils';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const { name, module } = getPackageJSON('react');
const pkgPath = resolvePkgPath(name);
const pkgDistpath = resolvePkgPath(name, true);

export default [
	// react
	{
		// 输入
		input: `${pkgPath}/${module}`,
		// 输出
		output: {
			file: `${pkgDistpath}/index.js`,
			name: 'index.js',
			format: 'umd'
		},
		// 插件
		plugins: [
			...getBaseRollupPlugins(),
			// 打包的时候生成对应的 package.json 文件
			generatePackageJson({
				inputFolder: pkgPath,
				outputFolder: pkgDistpath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					main: 'index.js'
				})
			})
		]
	},
	{
		input: `${pkgPath}/src/jsx.ts`,
		output: [
			// jsx-runtime
			{
				file: `${pkgDistpath}/jsx-runtime.js`,
				name: 'jsx-runtime.js',
				format: 'umd'
			},
			// jsx-dev-runtime
			{
				file: `${pkgDistpath}/jsx-dev-runtime.js`,
				name: 'jsx-dev-runtime.js',
				format: 'umd'
			}
		], // 输出
		plugins: getBaseRollupPlugins()
	}
];
