import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { Avatar } from '@mui/material';
import { InviteNotify } from './interface/notification';

export const Invitation = (inviteData: InviteNotify): JSX.Element => {

  function getTimeElapsedSince(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const timeElapsed = now.getTime() - date.getTime();
    const seconds = Math.floor(timeElapsed / 1000);
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hours ago`;
    }
    const days = Math.floor(hours / 24);
    if (days < 30) {
      return `${days} days ago`;
    }
    const months = Math.floor(days / 30);
    return `${months} months ago`;
  }
  const acceptButtonClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Accept btn click');
  };
  const deniedButtonClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Denine btn click');
  };
  
  return (
    <div className='row row-right-sidebar-post d-flex align-items-center notify-layout'
    >
      <div className="col-3 right-sidebar-post ">
        <Avatar className='right-sidebar-post-img'
          alt="image"
          src={inviteData.image} />
      </div>
      <div className="col-8 right-sidebar-post">
        <div className="row right-sidebar-post-content">
          <p>
            <span className='right-sidebar-post-user'>{inviteData.ownerName ? inviteData.ownerName : 'Kha Phan'} </span>
            đã gửi lời mời kết bạn
          </p>
        </div>
        <div className="row right-sidebar-post-date">
          <p>{getTimeElapsedSince(inviteData.createdDate)}</p>
        </div>
        <div className="row right-sidebar-post-date">
          <div className="d-flex justify-content-start" style={{ padding: 0 }} >
            <button onClick={acceptButtonClick} className="button button-accept">Chấp nhận</button>
            <button onClick={deniedButtonClick}  className="button button-denie">Từ chối</button>
          </div>
        </div>
      </div>
      <div className="col-1 right-sidebar-post">
      </div>
    </div>
  );
}