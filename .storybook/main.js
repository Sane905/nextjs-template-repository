module.exports = {
	stories: ['../src/**/*.stories.@(tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
	],
	typescript: {
		reactDocgen: false,
		check: false,
		checkOptions: {},
	},
	framework: '@storybook/react',
	core: {
		builder: '@storybook/builder-webpack5',
	},
};
