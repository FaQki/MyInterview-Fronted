import React, {useEffect, useState} from 'react'
import moment from 'moment';

export const Footer = () => {

  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(moment().format('YYYY'));
  }, []);

  return (
    <div className="container">
  <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div className="col-md-4 d-flex align-items-center">
      <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
        
      </a>
      <span className="mb-3 mb-md-0 text-body-secondary">© {currentYear} MyInterview, Inc</span>
    </div>
    </footer>
</div>
  )
}
