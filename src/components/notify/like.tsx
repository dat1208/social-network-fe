import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { Avatar } from '@mui/material';

interface props{
  Id: string,
  AvatarUserSentUrl: string,
  DisplaynameUserSent: string,
  createdTime: string
}

export function Like (props: props) {

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
  
  return (
    <div className='row row-right-sidebar-post d-flex align-items-center notify-layout'
    >
      <div className="col-3 right-sidebar-post ">
        <Avatar className='right-sidebar-post-img'
          alt="image"
          src={props.AvatarUserSentUrl} />
      </div>
      <div className="col-8 right-sidebar-post">
        <div className="row right-sidebar-post-content">
          <p>
          <a href={"/profile/"+props.Id}><span className='right-sidebar-post-user'>{props.DisplaynameUserSent} </span></a>
            like your post
          </p>
        </div>
        <div className="row right-sidebar-post-date">
          <p>{getTimeElapsedSince(props.createdTime)}</p>
        </div>
      </div>
      <div className="col-1 right-sidebar-post">
      </div>
    </div>
  );
}