
import io from 'socket.io-client';

/** Usage:
 * install: npm install socket.io-client --force
 * 
 * Dùng hàm này trong component thông báo đặng nó lấy thông báo về
 * 
  useEffect(() => {
    const notify: NotifyService = new NotifyService('this-is-accesstoken', 'this-is-userid');
    notify.onListenMessage((message) => {
      // message kiểu json
      console.log('recieve message', message);
    });
    notify.onListenError((err) => {
      console.error('recieve message', err.message);
    })
  }, []);

 */

export class NotifyService {
  private SOCKET_SERVER_URL: string = 'https://socialnetworkn.herokuapp.com';
  private CHANNEL: string = 'message';
  private socket: any;

  constructor(accesstoken: string, userId: string, limitMessage: number) {
    this.socket = io(this.SOCKET_SERVER_URL,
      {
        auth: { accesstoken },
        query: { userId: userId, limitMessage: limitMessage },
      });
    console.log('SOCKET.IO Establish connection')
  }
  public onListenMessage(callback: (message: any) => void): void {
    this.socket.on(this.CHANNEL, callback);
  }

  public onListenError(callback: (error: any) => void): void {
    this.socket.on('connect_error', callback);
  }

  public getNotify(userId: string, page: number, limit: number): void {
    this.socket.emit(this.CHANNEL, {
      userId: userId,
      page: page,
      limit: limit
    })
  }
}