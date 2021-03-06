import React from 'react';

import bg from '../../assets/footer-bg.jpg';
import './page-header.scss';


const PageHeader = props => {
  return (
    <div className='page-header' style={{backgroundImage:`url${bg}`}}>
            <h1>{props.children}</h1>
    </div>
  )
}



export default PageHeader