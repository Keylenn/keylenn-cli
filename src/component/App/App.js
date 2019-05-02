import React from 'react';
import css from 'styled-jsx/css';

export default function App(props) { 
  return(
    <div className="layout">
      <h2 className="h2">Welcome to keylenn-cli!</h2>
      <a
       href="https://github.com/Keylenn/front-end-dev-manual" 
       target="_blank"
       className="a"
      >
        具体用法参考dev-demo(antd, echarts, redux, react-router v4+)
      </a>
      <style jsx>{staticStyle}</style>
    </div>
  );
}

 const staticStyle = css`
  .layout{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: 100vh;
    font-size: 18px;
    background-color: #c7dfeb;
  }
  .h2{
    text-align: center;
    color: #fff;
    font-size: 20px;
    margin-right: 1em;
  }
  .a{
    text-decoration: none;
    color: rgba(0, 0, 255, .5);
    text-align: center;
  }
`;