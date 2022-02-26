import React, { memo } from 'react'

 const Card = (props) => {
    return (
        <div className="ui cards" style={{padding: "20px 30px 0px 30px"}}>
            <div className="card">
                <div class="content">
                    {props.children}
                </div>
              
            </div>
        </div>
  )
}
export default memo(Card)