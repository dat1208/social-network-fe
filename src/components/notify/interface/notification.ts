export interface NotifyDto {
  image: string;
  ownerName: string;
  isReaded: boolean;

  onDeleteHref: string;
  onMarkReadHref: string;
  createdDate: string;
}

export interface InviteNotify extends NotifyDto {
  inviterHref: string;
  acceptHref: string;
  denineHref: string;
}

export interface ActivityNotify extends NotifyDto {
  href: string;
}

export interface NotifyFromSocketIO {
  _id: string;
  UserId: string;
  Message: string;
  IsReaded: boolean;
  CreatedDate: Date;
} 

export class Notification {
  public _id: string;
  public UserId: string;
  public Message: string;
  public IsReaded: boolean;
  public CreatedDate: Date;

  constructor(id: string, userid: string, message: string, isRead: boolean, createdDate: Date) {
    this._id = id;
    this.UserId = userid;
    this.Message = message;
    this.IsReaded = isRead;
    this.CreatedDate = createdDate;
  }
}

export class InviteNotification extends Notification {
  public getInviteNotification = () => {
    return JSON.parse(this.Message) as InviteNotify;
  }
}

export class ActivityNotification extends Notification {
  public getActivityNotification = () => {
    return JSON.parse(this.Message) as ActivityNotify;
  }
}
