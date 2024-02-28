import React, { useEffect,useState } from 'react';
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import { useContext } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const [products, setProducts] = useState([]);
  const firebase = useContext(FirebaseContext)
  const {setPostDetails}  = useContext(PostContext)
  const navigate = useNavigate()
  
  useEffect(()=>{
    const db = getFirestore(firebase)
    getDocs(collection(db,"products")).then((snapshot)=>{
      const allPost = snapshot.docs.map((products)=>{
        return{
          ...products.data(),
          id:products.id
        }
      })
      setProducts(allPost)
      
    });
  },[firebase])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">


         { 
         products.map((product)=>{
          return(
           
            <div
            className="card"

            onClick={()=>{
              setPostDetails(product)
              navigate('/view')
            }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
          )

         })
         }


        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
