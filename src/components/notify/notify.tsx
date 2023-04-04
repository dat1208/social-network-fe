import React, { Suspense, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NotifyInvite } from './invite';
import { NotifyService } from '../../services/realtime/notify.service';
import { User_Display } from '../../interface/interfaces';
import { NotifyFromSocketIO } from './interface/notification';
import './style.css'
import { TextField } from '@mui/material';
import { NotifyComment } from './comment';
import { Like } from './like';

interface InvitationMessage {
  Type: string;
  Id: string;
  AvatarUserSentUrl: string;
  DisplaynameUserSent: string;
  onDeleteHref: string;
  onMarkHref: string;
  inviteHref: string;
  acceptHref: string;
  denyHref: string;
}

export const Notification: React.FC = (props: any) => {
  const [notifies, setNotifies] = React.useState<NotifyFromSocketIO[]>([]);

  const onLitenSocketIOMessage = () => {
    const accesstoken = localStorage.getItem('token') as string || 'this-is-accesstoken';
    const user = localStorage.getItem("userDisplay");

    if (user) {
      const userId = (JSON.parse(user) as User_Display).Id || '6404bf78f41c93a5bbe0f13e';
      const page = 7;
      const notify: NotifyService = new NotifyService(accesstoken, userId, page);

      notify.onListenMessage((message : NotifyFromSocketIO) => {
        
       
        console.log('recieve noitfy', message);

        if (Array.isArray(message)) {
          setNotifies(prevItems => [...message, ...prevItems]);
        } else {
          setNotifies(prevItems => [message, ...prevItems]);
        }
      });

      notify.onListenError((err) => {
        console.error('recieve message', err.message);
      })
    }
  };

  const handleMessage = (message: string, createdTime: string) => {
    const mess : InvitationMessage = JSON.parse(message);
    console.log(mess);
    if(mess.Type === "Invitation")
      {
        return <NotifyInvite Id={mess.Id} AvatarUserSentUrl={mess.AvatarUserSentUrl} DisplaynameUserSent={mess.DisplaynameUserSent} createdTime={createdTime}></NotifyInvite>
      }
    else if(mess.Type === "Like")
      {
        return <Like Id={mess.Id} AvatarUserSentUrl={mess.AvatarUserSentUrl} DisplaynameUserSent={mess.DisplaynameUserSent} createdTime={createdTime}></Like>
      }
    else if(mess.Type === "Comment")
      {
        return <NotifyComment Id={mess.Id} AvatarUserSentUrl={mess.AvatarUserSentUrl} DisplaynameUserSent={mess.DisplaynameUserSent} createdTime={createdTime}></NotifyComment>
      }
  }

  const renderNotifications = (notifies: Array<NotifyFromSocketIO>) => {
    return notifies.map(reptile =>
      <div key={reptile._id}>
        {handleMessage(reptile.Message,reptile.CreatedDate.toString())}
      </div>
    );
  }
  useEffect(() => {
    onLitenSocketIOMessage();
  }, []);

  return (
    <div >
      <h4 className='right-sidebar-title fw-bold' >Notification</h4>
      <div className=''>
        {notifies.length != 0 ?
          renderNotifications(notifies) :
          <div>Empty Notification</div>}
      </div>
    </div>
  );
}