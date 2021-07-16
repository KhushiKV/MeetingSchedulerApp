import React,{useState} from 'react';
import './homestyles.css';
import Login from './Login.js';

const Home = () => {

  const [goLogin, setGoLogin] = useState(false);

  const handleGoLogin = () => {
    setGoLogin(true);
  }


  if(goLogin){
    return <Login />;
  }

  return (
    <div className='container1'>
     <div className='container2'>
      <nav className="navbar navbar-light nav1" style={{paddingTop:'30px',paddingBottom:'20px'}}>
          <div className="container-fluid">
          <span className="navbar-brand mb-0 h1" style={{fontSize:'2.6rem',color:'#E8F6EF'}}>MeetScheduler</span>
          <span className="navbar-text"><a href='#carouselExampleControls'className='togglebar' style={{color:'#E8F6EF',paddingRight:'20px'}}>Features</a></span>
          </div>
     </nav>
      <div className='row'>
       <div className='col-md-6 leftcont'>
        <h1 className='mainheading'>Schedule and Manage your Meetings</h1>
        <button onClick={handleGoLogin} className='btn btn-lg btn-secondary loginbtn' type='btton'>Login</button>
        <button onClick={handleGoLogin} className='btn btn-lg btn-outline-light registerbtn' type='btton'>Register</button>
       </div>
      <div className='col-md-6'>
         <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3bZzVz-Y2wGjFA_dgA-eYVcosMU465F8ONQ&usqp=CAU' alt='calendarimage' className='mainimage' />
      </div>
      </div>
      </div>


    <div id="carouselExampleControls" className="carousel slide slidediv" data-bs-ride="carousel" data-bs-interval='3000' data-bs-pause='hover'>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src="https://image.flaticon.com/icons/png/512/2199/2199553.png" className="d-block w-100" alt="..." />
        <h3 className="h3">Interactive and User-friendly</h3>
        <p>With this meeting scheduler app, you can avail all of its features in an extremely interesting way.</p>
      </div>
      <div className="carousel-item">
        <img src="https://bit.ly/3dWcfdS" className="d-block w-100" alt="..."/>
        <h3 className="h3">Easy to Use</h3>
        <p>The app is designed in a way to provide maximum convenience to the users. The plethora of features are easily explorable and manageable.</p>
      </div>
      <div className="carousel-item">
        <img src="https://img.icons8.com/plasticine/2x/quick-mode-on.png" className="d-block w-100" alt="..."/>
        <h3 className="h3">Manage your meetings quickly</h3>
        <p>Efficiently and quickly manage your meeetings and have a better control over your time.</p>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next"  type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>

  <div className='footer'>Copyright @ 2021</div>
    </div>
  );
}




export default Home;
