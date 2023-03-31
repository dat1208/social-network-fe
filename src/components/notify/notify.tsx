import React, { Suspense, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Invitation } from './invite';
import { NotifyService } from '../../services/realtime/notify.service';
import { User_Display } from '../../interface/interfaces';
import { NotifyFromSocketIO } from './interface/notification';
import './style.css'

export const Notification: React.FC = (props: any) => {
  const [notifies, setNotifies] = React.useState<NotifyFromSocketIO[]>([]);

  const onLitenSocketIOMessage = () => {
    const accesstoken = localStorage.getItem('token') as string || 'this-is-accesstoken';
    const user = localStorage.getItem("userDisplay");

    if (user) {
      const userId = (JSON.parse(user) as User_Display).Id || '6404bf78f41c93a5bbe0f13e';
      const page = 7;
      const notify: NotifyService = new NotifyService('this-is-accesstoken', '6404bf78f41c93a5bbe0f13e', page);

      notify.onListenMessage((message: any) => {
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

  const renderNotifications = (notifies: any) => {
    return notifies.map((reptile: any) =>
      <div key={reptile._id}>
        {Invitation(reptile)}
      </div>
    );
  }
  useEffect(() => {
    onLitenSocketIOMessage();
  }, []);

  return (
    <div >
      <h4 className='right-sidebar-title' >Notification</h4>
      <div className=''>
        {notifies.length != 0 ?
          renderNotifications(notifies) :
          <div>Empty Notification</div>}
      </div>
    </div>
  );
}