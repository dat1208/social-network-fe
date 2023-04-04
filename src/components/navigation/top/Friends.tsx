import { Avatar } from '@mui/material'
import React from 'react'
import getF from '../../../services/api/User/getFriends';
import {FriendsItf,PagingItemFriend } from '../../../interface/interfaces';
import InBox from '../../chat/InBox';
import getuid from '../../../services/api/User/getuid';

function Friends (){

    const  [ownId, setOwnId] = React.useState("");
    React.useEffect(() => {
        const fetchData = async () => {
        
        const ownUidFromToken = await getuid();
            if(ownUidFromToken)
            setOwnId(ownUidFromToken);
        
    }
        fetchData();
      }, []);

      

    const [dataFriends,setDataFriends] = React.useState({
        dataFriends: Array<PagingItemFriend>()
    })

    React.useEffect(() =>{

        async function getFriend(){
           
            const data = await getF.getFriends(0,3) as unknown as FriendsItf;
            
            if(data)
            setDataFriends({dataFriends: data.Paging});
            console.log(dataFriends.dataFriends);
            
        }

        getFriend();
            
       },[]);


       function checkFriends(){
        if(dataFriends.dataFriends.length === 0 )
            return false;
        else return true;

       }

    return(
                                <div>
                                    <h4 className='left-sidebar-title fw-bold'>Friends</h4>
                                     {checkFriends() ? <>

                                        {dataFriends.dataFriends.map(friend => (
                                        <div style={{marginBottom:30,height:"fit-content"}} className='row row-left-sidebar-post'>
                                        <div className="col-3 left-sidebar-post">
                                            <Avatar style={{width:'100%',height:'100%'}} alt={friend.DisplayName} src={friend.Avatar} ></Avatar>
                                        </div>
                                        <div className="col-5 left-sidebar-post">
                                            <div className="row left-sidebar-post-content">
                                                <a href={'/profile/'+friend.Id} className='p-0' style={{fontSize:'100%'}} >{friend.DisplayName}</a>
                                            </div>
                                        </div>
                                        <div style={{width:'fit-content'}} className='col-sm-auto p-0'>
                                        <InBox ownIdUser={ownId} friendId={friend.Id} friendAvatarUrl={friend.Avatar} friendName={friend.DisplayName}></InBox>    
                                        </div>
                                       
                                    </div>
                                    )) }  

                                     </> : <><p>Empty Friend</p></>}    
                                </div>
    )
}


export default Friends