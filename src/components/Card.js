import React, { memo } from 'react'
import  CommentCard  from './CommentCard';
import './card.css'
 const Card = (comments) => {
    return (
        <div className="ui cards" >
            
            <div className="card" style={{width: '70%'}}>
                <div class="content">
                <div className="ui comments">
        
        <CommentCard
        result= {comments}
        
        />
      </div>
                </div>
              
            </div>
        </div>
  )
}
export default memo(Card)