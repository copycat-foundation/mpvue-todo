import { Vue, Component } from 'vue-property-decorator'
import { LogModel,TodoModel } from '../../utils/models'

const debug = require('debug')('log:Index')

@Component
class Index extends Vue {
  input: string = '';
  todos: TodoModel[] = [];
  leftCount: number = 0;
  allCompleted: boolean = false;
  logs: LogModel[] = [];

  save() {
    wx.setStorageSync('todo_list', this.todos);
    wx.setStorageSync('todo_logs', this.logs);
  }

  load() {
    let todos: TodoModel[] = wx.getStorageSync('todo_list');
    if(todos){
      let leftCount = todos.filter(function(item): boolean {
        return !item.completed;
      }).length;

      this.todos = todos;
      this.leftCount = leftCount;
    }
    let logs = wx.getStorageSync('todo_logs');
    if(logs){
      this.logs = logs;
    }
  }

  mounted() {
    debug('Index Page onLoad');
    this.load();
  }

  inputChangeHandle(evt: {mp: wx.InputEvent}) {
    let event: wx.InputEvent = evt.mp;
    this.input = event.detail.value;
  }

  addTodoHandle() {
    if(!this.input || !this.input.trim()) return;
    let todos: TodoModel[] = this.todos;
    todos.push({name: this.input, completed: false});

    let logs: LogModel[] = this.logs;
    logs.push({timestamp: new Date(), action: 'Add', name: this.input});

    this.input = '';
    this.todos = todos;
    this.leftCount += 1;
    this.logs = logs;

    this.save();
  }

  toggleTodoHandle(evt: wx.BaseEvent) {
    let index: number = +evt.currentTarget.dataset.index;

    let todos: TodoModel[] = this.todos;
    todos[index].completed = !todos[index].completed;
    let logs: LogModel[] = this.logs;

    logs.push({
      timestamp: new Date(),
      action: todos[index].completed ? 'Finish' : 'Restart',
      name: todos[index].name
    });

    this.todos = todos;
    this.leftCount = this.leftCount + (todos[index].completed ? -1 : 1);
    this.logs = logs;

    this.save();
  }

  removeTodoHandle(evt: wx.BaseEvent) {
    let index: number = +evt.currentTarget.dataset.index;
    let todos: TodoModel[] = this.todos;
    let remove: TodoModel = todos.splice(index, 1)[0];
    let logs: LogModel[] = this.logs;
    logs.push({
      timestamp: new Date(),
      action: 'Remove',
      name: remove.name
    });

    this.todos = todos;
    this.leftCount = this.leftCount - (remove.completed ? 0 : 1);
    this.logs = logs;

    this.save();
  }

  toggleAllHandle() {
    let me = this;
    this.allCompleted = !this.allCompleted;
    let todos: TodoModel[] = this.todos;

    // for(let i  = todos.length - 1; i >= 0 ; i--){
    //   todos[i].completed = this.allCompleted;
    // }
    todos.map(function(todo): TodoModel {
      todo.completed = me.allCompleted;
      return todo;
    });

    let logs: LogModel[] = this.logs;
    logs.push({
      timestamp: new Date(),
      action: this.allCompleted ? 'Finish' : 'Restart',
      name: 'All Todos'
    });

    this.todos = todos;
    this.leftCount = this.allCompleted ? 0 : todos.length;
    this.logs = logs;

    this.save();
  }

  clearCompletedHandle() {
    let todos = this.todos;
    let remains: TodoModel[] = [];
    remains = todos.filter(function(todo): boolean{
      return !todo.completed 
    });

    let logs = this.logs;
    logs.push({
      timestamp: new Date(),
      action: 'Clear',
      name: 'Completed todo'
    })

    this.todos = remains;
    this.logs = logs;

    this.save();
  }
}


export default Index;