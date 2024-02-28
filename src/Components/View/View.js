import React,{useEffect,useState,useContext} from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { getFirestore,query,where,collection, getDocs } from 'firebase/firestore';

function View() {
  const [userDetails, setUserDetails] = useState();
  const {postDetails} = useContext(PostContext)
  const firebase = useContext(FirebaseContext)


  useEffect(()=>{
    console.log('first')
    const db = getFirestore(firebase)
    const {userId} = postDetails
    const q = query(collection(db, "users"), where("id", "==", userId))
    getDocs(q).then((res)=>{
      res.forEach(doc => {
        setUserDetails(doc.data())
      });
    }).catch((error)=>{
      alert(error.message)
    })

    },[postDetails])
  

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category} </p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>Name : {userDetails.username}</p>
          <p>Phone : {userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
