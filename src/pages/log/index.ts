import { Vue, Component } from 'vue-property-decorator'
import { LogModel } from '../../utils/models'

const debug = require('debug')('log:Log');

@Component
class Log extends Vue {
  logs: LogModel[] = [];

  mounted() {
    debug('Log Page onShow');
    let logs: LogModel[] = wx.getStorageSync('todo_logs');
    if(logs){
      this.logs = logs.reverse();
    }else{
      debug('Log logs is null');
    }
  }
}

export default Log;