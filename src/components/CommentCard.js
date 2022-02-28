import faker from '@faker-js/faker'
import React, { memo } from 'react'
import Trashcan from '../assets/trashcan.svg'
import 'semantic-ui-css/semantic.min.css'
import { projectFirestore } from "../firebase/config"

 function CommentCard ({result})  {
   
    console.log(result);
    const handleClick = (id) => {
        projectFirestore.collection('comments').doc(id).delete()
      }
     
  return (
      <div className="comment">
           { result.comments.map(comment => (
               <div style={{position: 'relative' ,margin: '10px 0px'}}>
                <a className="avatar" style={{marginRight: '12px'}}>
                <img src={faker.image.avatar()} alt="avatar" />
            </a>
            <div className="content">
            <a className="author">{comment.name}</a>
            <div className="metadata">
                <span className="date">{new Date(comment.created_at.seconds * 1000).toString().slice(0, 25)}</span>
            </div>
            <div className="text">
            {comment.body}
            </div>
            <form>

            </form>
            {/* <button onClick={() => handleClick(comment.id)}>delete </button> */}
            <img 
            className="delete"
            onClick={() => handleClick(comment.id)}
            src={Trashcan} alt="delete icon" 
          />
            </div>
            </div>
      ))}
         
      </div>
  )
}
export default memo(CommentCard)
