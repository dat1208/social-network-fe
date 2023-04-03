import React, { CSSProperties, ReactNode, useEffect } from "react";
import "./style.css"
import 'bootstrap/dist/css/bootstrap.css'
import getPosts from "../../services/api/Post/postFetch";
import { CreateComments, Page_Next_Previous , Post} from "../../interface/interfaces";
import Gallery from "./MediaGalleryCmpn";
import MyLoader from "../loading/MyLoader";
import Avatar from '@mui/joy/Avatar';
import Comments from "./Comments";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, IconButton } from "@mui/material";
import Badge from '@mui/material/Badge';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import init from "../../services/api/config/init";


import { Response_Create_Comments } from "../../interface/interfaces";
import UserServices from "../../services/user/UserServices";
/*interfaces*/
type Fn = () => any;
interface props{
    userId:string
}



function PostSelfCmpn (props:props){   
    /* useState */
   const [data, setData] = React.useState({
    data: Array<Post>()
   });
   const [userOwnId, setUserOwnId] = React.useState("");
   const [uid,setUid] = React.useState(props.userId);
   const [currentPageNumber, setCurrentPageNumber] = React.useState(0);
   const [loading, setloading] = React.useState(true);
   const [newComment, setNewComment] = React.useState({
    commentList : Array<CreateComments>()
   });
   const [isLike, setIsLike] = React.useState(false)
   const [userDisplay, setUserDisplay] = React.useState({
    "Id": "",
    "AvatarURL": "",
    "DisplayName": "",
    "UserProfileUrl": ""
});
    const [isClicked, setIsClicked] = React.useState(false);

   
  /* useState */
    const updateNumOfComments = (pId:string, num:number):void => {
    let data_Update_Post = data.data;
    data_Update_Post.forEach(post => {
        if(post.Id === pId) {
            post.NumOfComment += num;
        
    }}

    );
    setData({
        data: data_Update_Post
    });
}

    const newCommentProp = (newCommentProp:CreateComments):void => {
    
    const data = newComment.commentList.concat(newCommentProp);
    setNewComment({
        commentList: data
    });
}

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
        setCurrentPageNumber(0);
        const PostResponse = await getPosts.getSelfPosts(currentPageNumber, 5,"desc", uid) as unknown as Page_Next_Previous;
        if(PostResponse != null)
        {
            setData({data:PostResponse.Paging});
        }
        
    };
    const user = JSON.parse(UserServices.getUserDisplay() || '{}');
    setUserDisplay(user);

    getData();
  }, []); //<-- This is the dependency array
 

const fetchMore : Fn = async () =>{

    fetchMoreData();
    console.log(data.data);

  async function fetchMoreData () {
        const getData = async () => {
            const PostResponse = await getPosts.getSelfPosts(currentPageNumber + 1, 5,"desc", uid) as unknown as Page_Next_Previous;
            if(PostResponse != null)
            {
                setData({
                    data: data.data.concat(PostResponse.Paging)
                })
                setCurrentPageNumber(currentPageNumber + 1);
                console.log(currentPageNumber);
                console.log(data.data);
            }
                 
        };
        getData();
      };
     
}

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
            <InfiniteScroll className="p-0 m-0"
            dataLength={data.data.length}
            next ={fetchMore}
            hasMore={true}
            loader={<MyLoader></MyLoader>}
            
            >
            
                <div>
                     {loading ? (
                        <MyLoader></MyLoader>
                ):(<p>
                        <div className="row">   
                <div>
                {data.data.map(post => (
                    <div className="p-0" style={{marginBottom:'2%'}}>
                    <div key={post.Id} className="main rounded bg-white border m-0 row" style={{paddingLeft:35}}>
                        <div className="owner-info row">
                        <div className="owner-avatar-flex padding-0 col-sm-auto col-2">
                            <Avatar className="owner-avatar" alt={post.OwnerDisplayName}  src={post.OwnerAvatarURL}></Avatar>
                        </div>
                        <div className="owner-info-flex col-8 dark-gray">
                            <div>
                                <p><a href={"/profile/"+post.OwnerId} className="owner-info-username dark-gray bold-650">{post.OwnerDisplayName}</a> posted an update</p>
                            </div>
                            <div>
                                <a className="owner-info-date bold-650 dark-gray">{getTimeElapsedSince(post.UpdateAt.toString())}</a>
                            </div> 
                        </div>
                        <div className="col-2 ms-auto">

                        {(post.OwnerId === userDisplay.Id) ? <SplitButton text={post.Content} images={post.Media} pid={post.Id}></SplitButton> :<></> }
                        
                        </div>
                        </div>
                        <div className="content row mt-3">
                            <p  dangerouslySetInnerHTML={{__html: replaceWithBr(post.Content)}} ></p>
                        </div>
                        <div className="row m-0">
                            <div className="margin-0">
                                {handleMedia(post.Media)}
                            </div>
                        </div>
                        <div className="row m-0 mt-4" >
                            <NewComment pId={post.Id} numofCommentsProp={post.NumOfComment} updateNum={updateNumOfComments} updateNewComment={newCommentProp}></NewComment>
                        </div>
                        <div className="row m-0" >
                         
                        </div>
                        <div className="navigator mt-4 row">
                            <div className="col-sm">
                                <div className="row">
                                <div className="col-sm"> 
                                    
                                       <Like pId={post.Id} isLiked={post.IsLiked} numofLikesProp={post.NumOfLike} ></Like>
  
                                </div>
                                <div className="col-sm">
                                <Badge badgeContent={post.NumOfComment} color="primary">
                                    <Button><CommentIcon color="action" ></CommentIcon></Button> 
                                </Badge>
                                </div>
                                </div>
                            </div>
                            <div className="col-sm">

                            </div>
                            <div className="col-sm">
                                <div className="row">
                                <div className="col-sm likes">
                                    <Button>Likes</Button>
                                </div>
                                <div className="col-sm comments">
                                    <Comments idPost={post.Id} ></Comments>
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
            </InfiniteScroll>
            
                
            
        );
}

interface props_cmt {
    pId:string;
    numofCommentsProp:number;
    updateNum: (pId: string, num:number) => void
    updateNewComment: (newComment:CreateComments) => void
}

const NewComment : React.FC<props_cmt> = ({pId,numofCommentsProp,updateNum, updateNewComment}) => {

    const [newComment, setNewComment] = React.useState("");

    

    const [userDisplay, setUserDisplay] = React.useState({
        "Id": "",
        "AvatarURL": "",
        "DisplayName": "",
        "UserProfileUrl": ""
    });

    useEffect(() => {
        const user = JSON.parse(UserServices.getUserDisplay() || '{}');
    setUserDisplay(user);
       
      },[numofCommentsProp])

    function sendCommentHandle(){
        if(newComment.length === 0){
            Swal.fire({
                title: 'Empty',
                text: 'Please enter a comment',
                icon: 'error',
                confirmButtonText: 'Get back',
                allowOutsideClick: true,
            })
      }
        else {
            let data = {
                PostId : pId,
                Comment: newComment
            }
            init.with_token.post("/posts/comments",data).then(res => {
                console.log(res);
                const response = res.data as unknown as Response_Create_Comments;
                if(response.Status === 0 && response.Data != null){
                    
                    updateNum(pId,1);
                    
                   updateNewComment(response.Data);
                }
                
            }).catch(err => {
                console.log(err); 
            })
        }
    }

    return (
     <div className='row mt-3' >
        <div className="col-sm-auto">
            <Avatar src={userDisplay.AvatarURL}></Avatar>
        </div>
        <div className="col-sm">
                                <Box 
                                    sx={{
                                    
                                        maxWidth: '100%',
                                    }}
                                    >
                                    <TextField onChange={(e) => {
                                        setNewComment(e.target.value);
                                    }} value={newComment} size="small" fullWidth label="Leave a comment" id="fullWidth" />
                                </Box>
        </div>
        <div className='col-sm-auto'>
            <IconButton onClick={sendCommentHandle} color="primary" sx={{ p: '10px' }} aria-label="directions">
            <SendIcon></SendIcon>
            </IconButton>
        </div>       
     </div>
        
    );
}


interface props_like {
    pId:string;
    numofLikesProp:number;
    isLiked: boolean
    //updateNum: (pId: string, num:number) => void
}



import likePost from "../../services/api/Post/likePost";
import { Response_Like } from "../../interface/interfaces";
import SplitButton from "./Actionbtn";

const Like : React.FC<props_like> = ({pId,numofLikesProp,isLiked}) =>{ 
    const [Liked, setLiked] = React.useState(isLiked);
    const [numOfLiked, setNumOfLiked] = React.useState(numofLikesProp);
    async function handleButtonClick() {
        if(Liked === true){
            let data = await likePost.unLike(pId) as unknown as Response_Like;
            if(data.Status === 0)
            {
                setNumOfLiked(numOfLiked - 1);
                setLiked(false);
            }
            
        }
        else{
            let data = await likePost.like(pId) as unknown as Response_Like; 
            if(data.Status === 0) {
                setNumOfLiked(numOfLiked + 1);
                setLiked(true);
            }    
            
        }
    }
    
    return (
        <div>
            <Badge badgeContent={numOfLiked} color="primary">
            <Button onClick={handleButtonClick} ><ThumbUpAltIcon color={Liked ? "primary" : "action"} /></Button>
            </Badge>
        </div>
    )
}

export default PostSelfCmpn;