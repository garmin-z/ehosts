import Footer from "@/components/Loyouts/Footer";
import {
	AlipayCircleOutlined,
	LockOutlined,
	MobileOutlined,
	TaobaoCircleOutlined,
	UserOutlined,
	WeiboCircleOutlined,
} from "@ant-design/icons";
import {
	LoginForm,
	ProFormCaptcha,
	ProFormCheckbox,
	ProFormText,
} from "@ant-design/pro-components";
import { useEmotionCss } from "@ant-design/use-emotion-css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Alert, message, Tabs } from "antd";
import React, { useState } from "react";
import { flushSync } from "react-dom";
import { useIntl, FormattedMessage } from "react-intl";
import LogoSrc from "@/assets/react.svg";



const Lang = () => {
	const langClassName = useEmotionCss(({ token }: any) => {
		return {
			width: 42,
			height: 42,
			lineHeight: "42px",
			position: "fixed",
			right: 16,
			borderRadius: token.borderRadius,
			":hover": {
				backgroundColor: token.colorBgTextHover,
			},
		};
	});

	return (
		<div className={langClassName} data-lang>
			{/* {SelectLang && <SelectLang />} */}
		</div>
	);
};

const LoginMessage: React.FC<{
    content: string;
}> = ({ content }) => {
	return (
		<Alert
			style={{
				marginBottom: 24,
			}}
			message={content}
			type="error"
			showIcon
		/>
	);
};

const Login: React.FC = () => {
	const [userLoginState, setUserLoginState] = useState<any>({});
	const [type, setType] = useState<string>("account");
	// const { initialState, setInitialState } = useState<any>();

	const containerClassName = useEmotionCss(() => {
		return {
			display: "flex",
			flexDirection: "column",
			height: "100vh",
			overflow: "auto",
			backgroundImage:
                "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
			backgroundSize: "100% 100%",
		};
	});

	const intl = useIntl();

	const fetchUserInfo = async () => {
		// const userInfo = await initialState?.fetchUserInfo?.();
		// if (userInfo) {
		//     flushSync(() => {
		//         setInitialState((s: any) => ({
		//             ...s,
		//             currentUser: userInfo,
		//         }));
		//     });
		// }
	};

	const handleSubmit = async (values: any) => {
		try {
			// 登录
			// const msg = await login({ ...values, type });
			// if (msg.status === 'ok') {
			//     const defaultLoginSuccessMessage = intl.formatMessage({
			//         id: 'pages.login.success',
			//         defaultMessage: '登录成功！',
			//     });
			//     message.success(defaultLoginSuccessMessage);
			//     await fetchUserInfo();
			//     const urlParams = new URL(window.location.href).searchParams;
			//     history.push(urlParams.get('redirect') || '/');
			//     return;
			// }
			// console.log(msg);
			// // 如果失败去设置用户错误信息
			// setUserLoginState(msg);
		} catch (error) {
			const defaultLoginFailureMessage = intl.formatMessage({
				id: "pages.login.failure",
				defaultMessage: "登录失败，请重试！",
			});
			console.log(error);
			message.error(defaultLoginFailureMessage);
		}
	};
	const { status, type: loginType } = userLoginState;

	return (
		<div className={containerClassName}>
			{/* <Helmet>
                <title>
                    {intl.formatMessage({
                        id: 'menu.login',
                        defaultMessage: '登录页',
                    })}
                    - {Settings.title}
                </title>
            </Helmet> */}
			<Lang />
			<div
				style={{
					flex: "1",
					padding: "32px 0",
				}}
			>
				<LoginForm
					contentStyle={{
						minWidth: 280,
						maxWidth: "75vw",
					}}
					logo={<img alt="logo" src={LogoSrc} />}
					title="Ant Design"
					subTitle={intl.formatMessage({ id: "pages.layouts.userLayout.title" })}
					initialValues={{
						autoLogin: true,
					}}
					onFinish={async (values: any) => {
						// await handleSubmit(values as API.LoginParams);
					}}
				>
					<Tabs
						activeKey={type}
						onChange={setType}
						centered
						items={[
							{
								key: "account",
								label: intl.formatMessage({
									id: "pages.login.accountLogin.tab",
									defaultMessage: "账户密码登录",
								}),
							},
							{
								key: "mobile",
								label: intl.formatMessage({
									id: "pages.login.phoneLogin.tab",
									defaultMessage: "手机号登录",
								}),
							},
						]}
					/>

					{status === "error" && loginType === "account" && (
						<LoginMessage
							content={intl.formatMessage({
								id: "pages.login.accountLogin.errorMessage",
								defaultMessage: "账户或密码错误(admin/ant.design)",
							})}
						/>
					)}
					{type === "account" && (
						<>
							<ProFormText
								name="username"
								fieldProps={{
									size: "large",
									prefix: <UserOutlined />,
								}}
								placeholder={intl.formatMessage({
									id: "pages.login.username.placeholder",
									defaultMessage: "用户名: admin or user",
								})}
								rules={[
									{
										required: true,
										message: (
											<FormattedMessage
												id="pages.login.username.required"
												defaultMessage="请输入用户名!"
											/>
										),
									},
								]}
							/>
							<ProFormText.Password
								name="password"
								fieldProps={{
									size: "large",
									prefix: <LockOutlined />,
								}}
								placeholder={intl.formatMessage({
									id: "pages.login.password.placeholder",
									defaultMessage: "密码: ant.design",
								})}
								rules={[
									{
										required: true,
										message: (
											<FormattedMessage
												id="pages.login.password.required"
												defaultMessage="请输入密码！"
											/>
										),
									},
								]}
							/>
						</>
					)}

					{status === "error" && loginType === "mobile" && <LoginMessage content="验证码错误" />}
					{type === "mobile" && (
						<>
							<ProFormText
								fieldProps={{
									size: "large",
									prefix: <MobileOutlined />,
								}}
								name="mobile"
								placeholder={intl.formatMessage({
									id: "pages.login.phoneNumber.placeholder",
									defaultMessage: "手机号",
								})}
								rules={[
									{
										required: true,
										message: (
											<FormattedMessage
												id="pages.login.phoneNumber.required"
												defaultMessage="请输入手机号！"
											/>
										),
									},
									{
										pattern: /^1\d{10}$/,
										message: (
											<FormattedMessage
												id="pages.login.phoneNumber.invalid"
												defaultMessage="手机号格式错误！"
											/>
										),
									},
								]}
							/>
							<ProFormCaptcha
								fieldProps={{
									size: "large",
									prefix: <LockOutlined />,
								}}
								captchaProps={{
									size: "large",
								}}
								placeholder={intl.formatMessage({
									id: "pages.login.captcha.placeholder",
									defaultMessage: "请输入验证码",
								})}
								captchaTextRender={(timing: any, count: any) => {
									if (timing) {
										return `${count} ${intl.formatMessage({
											id: "pages.getCaptchaSecondText",
											defaultMessage: "获取验证码",
										})}`;
									}
									return intl.formatMessage({
										id: "pages.login.phoneLogin.getVerificationCode",
										defaultMessage: "获取验证码",
									});
								}}
								name="captcha"
								rules={[
									{
										required: true,
										message: (
											<FormattedMessage
												id="pages.login.captcha.required"
												defaultMessage="请输入验证码！"
											/>
										),
									},
								]}
								onGetCaptcha={async (phone: any) => {
									// const result = await getFakeCaptcha({
									//     phone,
									// });
									// if (!result) {
									//     return;
									// }
									message.success("获取验证码成功！验证码为：1234");
								}}
							/>
						</>
					)}
					<div
						style={{
							marginBottom: 24,
						}}
					>
						<ProFormCheckbox noStyle name="autoLogin">
							<FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
						</ProFormCheckbox>
						<a
							style={{
								float: "right",
							}}
						>
							<FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
						</a>
					</div>
				</LoginForm>
			</div>
			<Footer />
		</div>
	);
};

export default Login;
