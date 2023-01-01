import React from "react"
import './Body.css'

const Body:React.FC=()=>{
    
    return(
        <>
        <div className="body">
           
           <div className="card">
            <div className="source-name">independent</div>
           
            <div >
                <img className="source-image-box" src="https://www.reuters.com/resizer/otwml-JIchJ1npxNElQqG2CWM0c=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/DUUE3BC6XJP7TGNPNRA4DUKZOA.jpg"/>
            </div>
                <div >
                    <p className="description">"Coast "As COVID-19 infections surge in China, the U.S. Centers for Disease Control and Prevention..." </p>
                </div>
                <div className="author-flex">
                    <p className="author">Author:</p>
                    <p className="author-name">namita singh</p>
                    </div>
                <div className="publishedAt-flex">
                        <p className="publishedOn">Published on:</p>
                        <p className="publish-Date">23 september, 2023</p>
                    </div>
                    <div className="news-link"><a className="news-url-link" href="#">Read more</a></div>
           </div>
    </div>         
        </>
    )
}
export default Body