import React from "react";
import "./style.css"
import 'bootstrap/dist/css/bootstrap.css'
class Post extends React.Component {
    render() {
        return (
            <div className="main rounded bg-white border row">
                <div className="owner-info row">
                    <div className="owner-avatar-flex padding-0 col-sm-auto col-2">
                        <img className="owner-avatar" style={{ width: 45 }} src="https://i.pinimg.com/originals/74/fb/8d/74fb8d58a163eb1bfde90e1ee0678c08.jpg" alt="user-avatar"></img>
                    </div>
                    <div className="owner-info-flex col-10 dark-gray">
                        <div>
                            <p><a className="owner-info-username dark-gray bold-650">Kha</a> posted an update</p>
                        </div>
                        <div>
                            <a className="owner-info-date bold-650 dark-gray">a year ago</a>
                        </div> 
                    </div>

                </div>
                <div className="content row mt-3">
                    <p>Videos from our vacation</p>
                </div>
                <div className="video-mask padding-0">
                <video className="img-fluid media row margin-0" autoPlay loop muted controls>
                    <source src="https://mdbcdn.b-cdn.net/img/video/forest.mp4" type="video/mp4" />
                </video>
                </div>
                

                <div className="notity row mt-2">
                    <p >You and Jennifer like this · 2 Comments</p>
                    <hr className="mt-1 w-100" />

                </div>
                <div className="navigator">
                    <div className="like">

                    </div>
                    <div className="comment">

                    </div>
                </div>
            </div>
        );
    }
}

export default Post;