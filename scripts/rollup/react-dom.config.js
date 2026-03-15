import alias from '@rollup/plugin-alias';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import { getBaseRollupPlugins, getPackageJSON, resolvePkgPath } from './utils';

const { name, module, peerDependencies } = getPackageJSON('react-dom');
// 获取 react-dom 包的路径
const pkgPath = resolvePkgPath(name);
// 获取 react-dom 产物路径
const pkgDistPath = resolvePkgPath(name, true);

export default [
	// react-dom
	{
		// 输入
		input: `${pkgPath}/${module}`,
		// 输出
		output: [
			{
				file: `${pkgDistPath}/index.js`,
				name: 'index.js',
				format: 'umd'
			},
			{
				file: `${pkgDistPath}/client.js`,
				name: 'client.js',
				format: 'umd'
			}
		],
		external: [...Object.keys(peerDependencies)],
		// 插件
		plugins: [
			...getBaseRollupPlugins(),
			// webpack resolve alias
			alias({
				entries: {
					hostConfig: `${pkgPath}/src/hostConfig.ts`
				}
			}),
			// 打包的时候生成对应的 package.json 文件
			generatePackageJson({
				inputFolder: pkgPath,
				outputFolder: pkgDistPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					// 让 react 的版本和 react-dom 的版本保持一致
					peerDependencies: {
						react: version
					},
					main: 'index.js'
				})
			})
		]
	}
];
