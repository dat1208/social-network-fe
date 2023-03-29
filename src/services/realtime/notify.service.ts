
import io from 'socket.io-client';

/** Usage:
 * install: npm install socket.io-client --force
 * 
 * Dùng hàm này trong component thông báo đặng nó lấy thông báo về
 * 
  useEffect(() => {
    const notify: NotifyService = new NotifyService('this-is-accesstoken', ';'this-is-userid');
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
  private SOCKET_SERVER_URL: string = 'http://localhost:3001';
  private CHANNEL: string = 'message';
  private socket: any;

  constructor(accesstoken: string, userId: string) {
    this.socket = io(this.SOCKET_SERVER_URL,
      {
        auth: { accesstoken },
        query: { userId: userId }
      });
    console.log('SOCKET.IO Establish connection')
  }
  public onListenMessage(callback: (message: string) => void): void {
    this.socket.on(this.CHANNEL, callback);
  }

  public onListenError(callback: (error: any) => void): void {
    this.socket.on('connect_error', callback);
  }
}