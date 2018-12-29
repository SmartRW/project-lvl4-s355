import 'bootstrap/dist/css/bootstrap.min.css';
import gon from 'gon';
import app from './App.jsx';
import '../assets/application.css';

app(gon);

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
