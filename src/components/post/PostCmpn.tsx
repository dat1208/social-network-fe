import React, { useEffect } from "react";
import "./style.css"
import 'bootstrap/dist/css/bootstrap.css'
import getPosts from "../../services/api/Post/postFetch";
import { Page_Next_Previous , Post} from "../../interface/interfaces";
import Gallery from "./MediaGalleryCmpn";
import MyLoader from "./MyLoader";
import Avatar from '@mui/joy/Avatar';

function PostCmpn (){

    /* useState */
   const [data, setData] = React.useState<Post[]>([]);
   const [loading, setloading] = React.useState(true);
  /* useState */

   useEffect(() =>{
    const t = setTimeout(() =>{
        setloading(false);
    }, 3000);
    return () => {
        clearTimeout(t);
    };
   },[]);


  function getTimeElapsedSince(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const timeElapsed = now.getTime() - date.getTime();
  
    // tính số giây đã qua
    const seconds = Math.floor(timeElapsed / 1000);
  
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    }
  
    // tính số phút đã qua
    const minutes = Math.floor(seconds / 60);
  
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    }
  
    // tính số giờ đã qua
    const hours = Math.floor(minutes / 60);
  
    if (hours < 24) {
      return `${hours} hours ago`;
    }
  
    // tính số ngày đã qua
    const days = Math.floor(hours / 24);
  
    if (days < 30) {
      return `${days} days ago`;
    }
  
    // tính số tháng đã qua
    const months = Math.floor(days / 30);
  
    return `${months} months ago`;
  }

    useEffect(() => {
    const getData = async () => {
        const PostResponse = await getPosts(0, 10) as unknown as Page_Next_Previous;
        if(PostResponse != null)
            setData(PostResponse.Paging);
    };

    getData();
  }, []); //<-- This is the dependency array
 

   function handleMedia(props:string[]){
        if(props.length === 0)
        {
            return;
        }
        else return <Gallery images={props}></Gallery>
   }

   function replaceWithBr(haiku:string) {
    return haiku.replace(/\n/g, "<br />")
  }

  
        return (
                <div>

                    
                     {loading ? (
                        <MyLoader></MyLoader>
                ):(<p>
                        <div className="row">   
                <div>
                {data.map(post => (
                    <div className="main rounded bg-white border row" style={{marginBottom:20}}>
                        <div className="owner-info row">
                        <div className="owner-avatar-flex padding-0 col-sm-auto col-2">
                            <Avatar className="owner-avatar" alt={post.OwnerDisplayName}  src={post.OwnerAvatarURL}></Avatar>
                        </div>
                        <div className="owner-info-flex col-10 dark-gray">
                            <div>
                                <p><a className="owner-info-username dark-gray bold-650">{post.OwnerDisplayName}</a> posted an update</p>
                            </div>
                            <div>
                                <a className="owner-info-date bold-650 dark-gray">{getTimeElapsedSince(post.UpdateAt.toString())}</a>
                            </div> 
                        </div>

                        </div>
                        <div className="content row mt-3">
                            <p  dangerouslySetInnerHTML={{__html: replaceWithBr(post.Content)}} ></p>
                        </div>
                        <div className="row">
                            <div className="margin-0">
                                {handleMedia(post.Media)}
                            </div>
                        </div>

                        <div className="notity row mt-2">
                            <div className="col-sm-auto">{post.NumOfLike} Likes</div>
                            <div className="col-sm-auto">·</div>
                            <div className="col-sm-auto">{post.NumOfComment} Comments</div>
                            <hr className="mt-1 w-100" />
                        </div>
                        <div className="navigator">
                            <div className="like">

                            </div>
                            <div style={{marginLeft:40}} className="comment">
                                <div className="owner-info row">
                                <div className="owner-avatar-flex padding-0 col-sm-auto">
                                    <div className="text-center" style={{marginRight:10}}>
                                    <Avatar className="owner-avatar" alt={post.OwnerDisplayName} src={post.OwnerAvatarURL}></Avatar>
                                    </div>
                                </div>
                                <div className="owner-info-flex col-10 dark-gray">
                                    <div className="row">
                                        <p><a className="owner-info-username dark-gray bold-650">{post.OwnerDisplayName}</a> {getTimeElapsedSince(post.UpdateAt.toString())}</p>
                                    </div>
                                    <div className="content row">
                                    <p>this is comment</p>
                                    </div>
                                </div>
                            
                                </div>
                            </div>
                        </div>
                    </div>
                        ))}
                    </div>

            </div>
                </p>)}  
                </div>
            
        );
}

export default PostCmpn;