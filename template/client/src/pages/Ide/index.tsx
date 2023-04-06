import React from "react";

import MonacoEditor,  { MonacoEditorProps }  from "react-monaco-editor";


interface MyEditorState {
	code: string;
}
class Ide extends React.Component<{}, MyEditorState>  {
	constructor(props: {}) {
		super(props);
		this.state = {
			code: "",
		};
	}

	handleEditorChange = (newValue: string) => {
		this.setState({ code: newValue });
	};

	render() {
		const { code } = this.state;

		// 设置编辑器的选项
		const options: MonacoEditorProps["options"] = {
			selectOnLineNumbers: true,
			automaticLayout: true,
			// 其他编辑器的配置选项可以在这里设置
		};

		return (
			<MonacoEditor
				width="800"
				height="600"
				language="javascript" // 设置编辑器语言
				theme="vs-dark" // 设置编辑器主题
				value={code} // 设置编辑器的初始内容
				options={options} // 设置编辑器的选项
				onChange={this.handleEditorChange} // 监听编辑器内容的变化
			/>
		);
	}
}
export default Ide;
