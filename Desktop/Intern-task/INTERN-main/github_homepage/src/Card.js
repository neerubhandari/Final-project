import React from 'react';
function Card(props){
    return(
        <div>
           <div className="card">
                      <p>this is {props.activity} activity</p>
            </div>
        </div>
    );
}
export default Card;