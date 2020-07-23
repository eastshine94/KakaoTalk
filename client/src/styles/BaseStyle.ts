import styled from 'styled-components'

export const SideBar = styled.aside`
    position: fixed;
    width: 100px;
    height: 100%;
    min-height: 400px;
    background: #dfdfdf;
    padding-top: 20px;
    z-index: 2;
    & li {
        padding: 10px;
        text-align: center;
        font-size: 25px;
        color: #a6a7a8;
        cursor: pointer;
        &:hover {
            color: #888777;
        }
    }
`;
export const Main = styled.main`
    margin-left: 100px;
    width: 100%;
`
export const MainHeader = styled.section`
    position: fixed;
    top: 0;
    left: 0;
    padding: 20px 20px 0px 120px;
    width: 100%;
    height: 100px;
    background-color: #fff;
    z-index: 1;
    & input {
        border: none; 
        border-radius: 10px;
        background-color: #e6e7e7;
        width: 100%;
        padding: 5px 10px;
    }
    
`;
export const TitleBlock = styled.section`
     position: relative;
     & h2 {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    & i {
        font-size: 20px;
        position: absolute;
        top: 5px;
        right: 0;
    }
`
export const MainContent = styled.section`
    margin-top: 100px;
    width: 100%;
    height: 500px;
    & li{
        position: relative;
        padding: 20px 10px 20px 80px;
        & img {
            position: absolute;
            top: 18px;
            left: 20px;
            width: 45px;
            height: 45px;
            border-radius: 15px;
        }
        & p {
            color: #707070;
            & b{
                color: #000;
                font-weight: bold;
            }
        }
        &:hover {
            background-color: #eaeaeb;
        }
    }
`;