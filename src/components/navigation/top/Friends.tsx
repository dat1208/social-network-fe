import { Avatar, IconButton } from '@mui/material'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import React, { useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InBox from '../../chat/InBox';

function Friends() {
    // Get the list of friends:
    const [isShowChatBox, setIsShowChatBox] = useState(false)
    return (
        <div>
            <div style={{ marginBottom: 30 }} className='row row-left-sidebar-post'>
                <div className="col-sm-auto left-sidebar-post">
                    <Avatar
                        style={{ width: 50, height: 50 }}
                        src={'https://noidangsong.vn/files/uploads/fb1735058496563345/1526444239-tt_avatar_small.jpg'}
                    />
                </div>

                <div className="col-sm-auto left-sidebar-post">
                    <div className="row left-sidebar-post-content">
                        <span>Lê Đỗ Thành Đạt</span>
                    </div>
                    <div className="row left-sidebar-post-date">
                        <span>Active</span>
                    </div>
                </div>

                <div style={{ width: 'fit-content' }} className='col-sm-auto'>
                    <IconButton onClick={() => {
                        console.log('is click');
                    }} aria-label="ChatBubble" color="inherit">
                        <ChatBubbleIcon style={{ width: 20, height: 'auto' }} />
                    </IconButton>
                    <IconButton aria-label="ChatBubble" color="inherit">
                        <MoreHorizIcon style={{ width: 20, height: 'auto' }} />
                    </IconButton>
                </div>

            </div>

            <InBox
                isShow={isShowChatBox}
                friendId={''}
                friendAvatarUrl={'https://noidangsong.vn/files/uploads/fb1735058496563345/1526444239-tt_avatar_small.jpg'}
                friendName={'Lê Đỗ Thành Đạt'}
            />
        </div>
    )
}


export default Friends