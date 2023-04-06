import React, {lazy} from "react";
import { BrowserRouter, Routes, Route,useRoutes } from "react-router-dom";
import { RouteConfigProps, routes } from "./routes";

const Dashboard = lazy(() => import("@/pages/Dashboard/index"));

const RoutersList = () =>{
	const RoutersList = useRoutes(routes);
	return RoutersList;
};
const RouterComp: React.FC = ()=>{
	return (
		<BrowserRouter>
			<RoutersList />
		</BrowserRouter>
	);
};
export default RouterComp;
