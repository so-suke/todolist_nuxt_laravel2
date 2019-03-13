import {
  TODO_STATE
} from '../static/enumerations.js'
import axios from "axios";

// todoのstateを切り替える。(作業中 <=> 完了)
const getToggledState = (todo_state) => {
  if (todo_state === TODO_STATE.WORKING) {
    return TODO_STATE.DONE
  } else if (todo_state === TODO_STATE.DONE) {
    return TODO_STATE.WORKING
  } else {
    console.error('予期しないtodoのstateが渡されました。')
  }
}

export const todos = {
  namespaced: true,
  state: () => ({
    list: []
  }),
  mutations: {
    setList(state, payload) {
      state.list = payload.list;
    },
    add(state, payload) {
      state.list.push(payload)
    },
    delete(state, payload) {
      state.list.splice(state.list.indexOf(payload.todo), 1)
    },
    // todos内の該当todoの状態を設定します。
    setState(state, payload) {
      const target_idx = state.list.findIndex((item) => {
        return item.id === payload.id;
      });
      state.list[target_idx].state = payload.state;
    },
  },
  actions: {
    async initList(context) {
      // DBから全てのtodoを取得し、それをstore内のtodosに設定します。ページ読み込み時に実行されます。
      await axios.get("http://localhost:8000/api/getTodos").then(res => {
        context.commit("setList", {
          list: res.data
        })
      });
    },
    // DBとstoreに対して、todoを新規に追加します。
    async add(context, payload) {
      const params = new URLSearchParams();
      params.append('comment', payload.comment);
      params.append('state', payload.state);
      await axios.post("http://localhost:8000/api/addTodo", params).then(res => {
        context.commit("add", res.data)
      });
    },
    // DBとstoreから該当todoを削除します。
    async delete(context, payload) {
      const params = new URLSearchParams();
      params.append('id', payload.todo.id);
      await axios.post("http://localhost:8000/api/deleteTodo", params).then(res => {
        context.commit("delete", payload)
      });
    },
    // DBとstore内の該当todoの状態を切り替えます。
    async toggle(context, payload) {
      const new_state = getToggledState(payload.todo.state);
      const params = new URLSearchParams();
      params.append('id', payload.todo.id);
      params.append('new_state', new_state);
      await axios.post("http://localhost:8000/api/toggleTodo", params).then(res => {
        context.commit("setState", res.data)
      });
    }
  }
}
