import React, { Fragment, useContext } from 'react';
import { useState } from 'react';
import { AuthContext,FirebaseContext } from '../../store/Context';
import './Create.css';
import Header from '../Header/Header';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { getFirestore, addDoc,collection } from "firebase/firestore"
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const firebase = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState();
  const date = new Date()
  const handleSubmit =()=>{
    const storage = getStorage();
    const storageRef = ref(storage, `/imge/${image.name}`);
    const db = getFirestore(firebase)
    uploadBytes(storageRef, image).then(() => {
   
      getDownloadURL(storageRef).then((url)=>{
        addDoc(collection(db,'products'),{
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt: date.toLocaleDateString()
        })
        navigate('/')
      }).catch((error)=>{
        alert(error.message)
      })
  

    }).catch((error)=>{
      alert(error.message)
    })
    
    ;

  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>{
                setName(e.target.value)
              }}
              id="fname"
              name="Name"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>{
                setCategory(e.target.value)
              }}
              id="fname"
              name="category"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
            className="input" 
            type="number"
            value={price}
              onChange={(e)=>{
                setPrice(e.target.value)
              }} 
            id="fname" 
            name="Price" />
            <br />
          </form>
          <br />
          {image ? <img alt="Posts" width="200px" height="200px" src={ URL.createObjectURL(image)}></img> :""}
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  ); 
};

export default Create;
