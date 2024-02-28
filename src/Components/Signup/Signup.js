import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
// import {db }from '../../firebase/config'
import {collection, addDoc,getFirestore} from 'firebase/firestore'
import { FirebaseContext } from '../../store/Context';
import { getAuth, createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


 function Signup() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const firebase = useContext(FirebaseContext);
  const auth = getAuth()

  const handleSubmit = (e)=>{
    e.preventDefault()
    const db = getFirestore(firebase);
    createUserWithEmailAndPassword(auth,email,password).then((result)=>{
      updateProfile(auth.currentUser,{displayName:username}).then(()=>{
        addDoc(collection(db,'users'),{
          id:result.user.uid,
          username:username,
          phone:phone
        }).then(()=>{
          navigate('/')
        })
        
      })
    })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt=''></img>
        <form onSubmit={handleSubmit} >
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            // id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            // id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <span onClick={()=>{navigate('/login')}}>Login</span>
      </div>
    </div>
  );
}
export default Signup;
