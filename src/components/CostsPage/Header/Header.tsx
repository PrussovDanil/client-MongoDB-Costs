import React, { useState, useEffect } from 'react';
import { Spinner } from '../../Spinner/Spinner';
import { ICostsHeaderProps } from '../../../types';
import { countTotalPrice } from '../../../utils/arrayUtils';
import { useStore } from 'effector-react';
import { $totalPrice } from '../../../context';
import './style.css'

export const Header = ({costs}: ICostsHeaderProps) => {
  const [spinner, setSpinner] = useState(false);
  const totalPrice = useStore($totalPrice)
  useEffect(()=>{
    countTotalPrice(costs)
  }, [costs])
  return (
    <div className='costs-header d-flex justify-content-between align-items-center'>
      <form className='d-flex mb-3'>
        <div className='form-item mr-3'>
          <span className='mb-3'>Where was it spent</span>
          <input type="text" className='form-control'/>
        </div>
        <div className='form-item mr-3'>
          <span className='mb-3'>How much was spent</span>
          <input type="text" className='form-control'/>
        </div>
        <div className='form-item mr-3'>
          <span className='mb-3'>When it was spent</span>
          <input type="text" className='form-control' placeholder='DD.MM.YYYY'/>
        </div>
        <button className="btn btn-primary auth-btn">
          {spinner ? <Spinner top={5} left={20} /> : 'Add'}
        </button>
      </form>
      <div style={{ textAlign: 'end', marginBottom: 10 }}>
        Total: 
        <span> {isNaN(parseInt(String(totalPrice))) ?  ' 0' : parseInt(String(totalPrice))}</span>
      </div>
    </div>
  );
};
