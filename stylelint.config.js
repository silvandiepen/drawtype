module.exports = {
	// add your custom config here
	// https://stylelint.io/user-guide/configuration
	rules: {
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'if',
					'for',
					'else',
					'each',
					'mixin',
					'extend',
					'include',
					'content',
					'at-root',
					'function',
					'warn',
					'return',
					'debug',
					'while'
				]
			}
		],
		'order/order': [
			'dollar-variables',
			'custom-properties',
			'declarations',
			'rules'
		],
		indentation: 'tab'
	},
	extends: ['stylelint-logical-order']
};
