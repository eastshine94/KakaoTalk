import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
     * {
       box-sizing: border-box;
     }
     body {
      width: 100%;
      height: 100%;
    }
     body, div, ul, li, dl, dd, dt, ol, h1, h2, h3, h4, h5, h6, input, fieldset, legend, p, select, table, th, td, tr, textarea, button, form, figure, figcaption {
      padding: 0;
      margin: 0;
    }
    
    a{
      color: #222;
      text-decoration:none;
    }
    body, input, textarea, select, button, table {
      font-family: 'Nanum Gothic', sans-serif;
      color: #222;
      font-size: 13px;
      line-height: 1.5;
    }
    /* 폰트 스타일 초기화 */
    em, address {
      font-style: normal
    }
    /* 불릿 기호 초기화 */
    dl, ul, li, ol, menu {
      list-style: none;
    }

     /* 제목 태그 초기화 */
     h1, h2, h3, h4, h5, h6 {
       font-size: 13px;
       font-weight: normal;
    }
    /* 버튼 초기화 */
    button {
      border: none;
      outline: none;
    }

    /* 테두리 초기화 */
    img, fieldset {
      border: 0 none;
    }
`;

export default GlobalStyle;
