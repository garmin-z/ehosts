import React, { lazy, Suspense } from "react";
export interface RouteConfigProps {
    path: string;
    element: React.ReactElement;
    children?: RouteConfigProps[];
}
const Dashboard = lazy(() => import("@/pages/Dashboard/index"));
const Users = lazy(() => import("@/pages/User"));
const Login = lazy(() => import("@/pages/User/Login"));
const Ide = lazy(() => import("@/pages/Ide"));

export const routes: RouteConfigProps[] = [
	{
		path: "/",
		element: React.createElement(Dashboard),
	},
	{
		path: "/users/",
		element: React.createElement(Users),
		children: [
			{
				path: "login",
				element: React.createElement(Login),
			},
		],
	},
	{
		path: "/ide",
		element: React.createElement(Ide),
	},
];


