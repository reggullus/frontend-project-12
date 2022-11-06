import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => (
  <div className="text-center">
    <h className="h4 text-muted">Упс! Страница не найдена!!!</h>
    <p className="text-muted">
      Вы можете перейти
      <Link to="/"> на главную страницу</Link>
    </p>
  </div>
);

export default Error;
