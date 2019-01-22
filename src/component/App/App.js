import React from 'react';
import style from './App.scss';

const App = ()=> (<div>
  <h2 className={style.h2}>Welcome to keylenn-cli</h2>
  <a href="https://github.com/Keylenn/front-end-dev-manual" target="_blank" className={style.a}>
  具体用法参考dev-demo(antd, echarts, redux, react-router v4+)
  </a>
</div>);
export default  App;