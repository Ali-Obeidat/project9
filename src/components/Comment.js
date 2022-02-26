import React from 'react'
import faker from'@faker-js/faker';
import  CommentCard  from './CommentCard';


export default function Comment({comments}) {
    console.log(comments);
  return (
    <div className="ui comments">
        
      <CommentCard
      result= {comments}
      
      />
    </div>
  );
}