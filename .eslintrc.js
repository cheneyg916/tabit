module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
        // 'jest/globals': true
    },
    parser: '@typescript-eslint/parser',
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaVersion: 2019,
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true
        },
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint', 'prettier', 'jest', 'react', 'react-hooks'],
    root: true,
    rules: {
        //缩进4空格
        indent: [
            'error',
            4,
            {
                SwitchCase: 1
            }
        ],
        //强制单引号 可以使用es6模板语法
        //quotes: ['error', 'single', { allowTemplateLiterals: true }],
        //尾部分号
        semi: ['error', 'always'],
        //防止错误for循环
        'for-direction': 'error',
        //不许更改const定义过的变量
        'no-const-assign': 'error',
        //lines-between-class-members
        'lines-between-class-members': 'error',
        //强制在代码块中开括号前和闭括号后有空格
        'block-spacing': 'error',
        //不许重赋值class
        'no-class-assign': 'error',
        //不许写多余无用的正则 就是说 正则要的写的精确简练
        'no-invalid-regexp': 'error',
        //不准比较自身
        'no-self-compare': 'error',
        // 变量声明了 必须使用
        //'no-unused-vars': 'error',
        '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'after-used' }],
        //禁止对参数重新赋值
        'no-param-reassign': 'error',
        'no-delete-var': 'error', //不能对var声明的变量使用delete操作符
        'no-div-regex': 'error', //不能使用看起来像除法的正则表达式/=foo/
        'no-alert': 'error', //禁止使用alert confirm prompt
        //禁止使用var
        'no-var': 'error',
        //禁用未声明的变量
        'no-undef': 'error',
        //调用super之前 this
        'no-this-before-super': 'error',
        //不允许重复声明变量
        'no-redeclare': 'error',
        //不许在变量声明前使用
        'no-use-before-define': 'error',
        //箭头函数前后要有空格
        'arrow-spacing': ['error', { before: true, after: true }],
        //不许对象内有重复的key
        'no-dupe-keys': 'error',
        //强制jsx为双引号
        'jsx-quotes': 'error',
        //禁止类中成员重复出现
        'no-dupe-class-members': 'error',
        //switch中的case标签不能重复
        'no-duplicate-case': 'error',
        //正则表达式中的[]内容不能为空
        'no-empty-character-class': 'error',
        //禁止使用eval
        'no-eval': 'error',
        //禁止扩展native对象
        'no-extend-native': 'error',
        // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
        'no-unreachable': 'error',
        //禁止在 finally 语句块中出现控制流语句
        'no-unsafe-finally': 'error',
        //禁止不必要的括号
        //禁止重复参数
        'no-dupe-args': 'error',
        //禁止不必要的分号
        'no-extra-semi': 'error',
        //强制使用强等
        eqeqeq: 'error',
        //async 方法 必须使用await
        'require-await': 'error',
        //不变变量强制const
        'prefer-const': 'error',
        //强制类成员方法简写
        'object-shorthand': 'error',
        //强制使用模板字符串
        'prefer-template': 'error',
        //parseInt必须制定进制位数 即是说 一定要给第二个参数 比如10
        radix: 'error',
        //结构 前后需要有空格
        'rest-spread-spacing': 'error',
        'react/require-render-return': 'error',
        //组件必须引用react
        'react/react-in-jsx-scope': 'error',
        //使用的组件必须引入
        'react/jsx-no-undef': 'error',
        //启动react 变量使用,
        'react/jsx-uses-react': 'error',
        //启动react 组件变量使用,
        'react/jsx-uses-vars': 'error',
        //跨行标签必须对齐 子元素缩进
        'react/jsx-closing-tag-location': 'error',
        //多行闭合标签 必须新起一行
        'react/jsx-closing-bracket-location': 'error',
        //无内容必须自闭合
        'react/self-closing-comp': 'error',
        //render方法 返回多行标签时 必须使用括号包围
        'react/jsx-wrap-multilines': 'error',
        //遍历元素必须要给key
        'react/jsx-key': 'error',
        //不许传入重复的Props
        'react/jsx-no-duplicate-props': 'error',
        'react/display-name': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn'
        // jsx中不可出现bind
        // 'react/jsx-no-bind': 'error'
    },
    settings: {
        react: {
            pragma: 'React',
            version: 'detect'
        }
    },
    globals: {
        //变量名:false
    }
};
