import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: #00ccff;
    align-items: center;
    gap : 16px;
    flex-wrap: nowrap;
    /* width: 1270px; */
`

export const WrapperTextHeader = styled.span`
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    text-align: left;
`
export const WrapperLogoHeader = styled.img`
    width: 150px;
    height: 40px;
    cursor: pointer;
`

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap:  10px;
    font-size: 12px;
    margin-left: 40px;
`
export const WrapperTextHeaderSmall = styled.span`
    font-size: 12;
    color: #fff;
    white-space: nowrap;
`
export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: #00ccff;
    }
`