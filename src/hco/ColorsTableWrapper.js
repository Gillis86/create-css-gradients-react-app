import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";



const ColorsTableWrapper = (props) => {



    if(props.mq){
          return(
            <AliceCarousel
            buttonsDisabled={false}
            dotsDisabled={true}
            >
                {props.children}
            </AliceCarousel>
          )

    }else{
        return(
            <div className="colorTable__labels">
                {props.children}
            </div>
        )
    }


}

export default ColorsTableWrapper;