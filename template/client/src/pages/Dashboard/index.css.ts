import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import {pxToVw} from "@/service/utils/pxToViewport";

export const CSSControlJoint = styled("div")`
    padding:${(props) => pxToVw(10)};
    width:${(props) => pxToVw(400)};
`;
