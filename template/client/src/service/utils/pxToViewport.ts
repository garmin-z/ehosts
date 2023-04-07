// 设计稿宽度
const designWidth = 1280;
const designHeight = 720;

// 将 px 转换为 vw
export const pxToVw = (px:number) => {
	return `${(px / designWidth) * 100}vw`;
};

export const pxToVh = (px:number) => {
	return `${(px / designHeight) * 100}vw`;
};
