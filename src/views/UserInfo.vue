<template>
  <div class="user-info">
    <h1>User info</h1>
    <ul class="user-info__list">
      <li v-for="field in Object.entries(userInfo)" :key="field.id">
        <span>{{ field[0] }}</span>: 
        <template v-if="typeof field[1] === 'object'">
          <ul>
            <li v-for="(innerField, index) in Object.entries(field[1])" :key="index">
              <span>{{ innerField[0] }}</span>: {{ innerField[1] }}
            </li>
          </ul>
        </template>
        <template v-else>
          {{ field[1] }}
        </template>
      </li>
    </ul>
    <h1>Create todo</h1>
    <form @submit.prevent="createTodo" class="user-info__form">
      <label for="id-input">User ID:
        <input v-model="todoBody.userId" required type="number" name="userId" id="id-input">
      </label>
      <label for="title-input">Title:
        <input v-model.trim="todoBody.title" required type="text" placeholder="Enter title" name="title" id="title-input">
      </label>
      <button>Add</button>
    </form>
    <h1>Todos</h1>
    <div class="user-info__filters">
      <label for="status-select">Filter by status:
        <select v-model="status" name="statuses" id="status-select">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
          <option value="favorites">Favorites</option>
        </select>
      </label>
      <label for="user-id-select">Filter by user ID:
        <select v-model="userId" name="user-ids" id="user-id-select">
          <option v-for="option of userIds" :value="option" :key="option">{{ option }}</option>
          <option value="all">All Users</option>
        </select>
      </label>
      <label for="search-input">Search:
        <input v-model="search" placeholder="Enter text" type="text" name="search" id="search-input">
      </label>
    </div>
    <ul v-if="filteredTodos.length" class="user-info__list">
      <li v-for="(todo, index) of filteredTodos" :key="todo.id"> {{ index + 1 }}
        <button @click="addToFavorite(todo.id)">Add to favorite</button>
        <ul>
          <li v-for="(field, index) in Object.entries(todo)" :key="index">
            <span>{{ field[0] }}</span>: {{ field[1] }}
          </li>
        </ul>
      </li>
    </ul>
    <p v-else>Todos not found</p>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data() {
    return {
      todos: [],
      filteredTodos: [],
      userIds: [],
      status: 'all',
      userId: 1,
      search: '',
      todoBody: {
        userId: 0,
        title: ''
      }
    }
  },
  watch: {
    status(){
      this.filterTodos()
    },
    userId(){
      this.filterTodos()
    },
    search(){
      this.filterTodos()
    }
  },
  computed: {
    userInfo(){
      return JSON.parse(this.$route.query.userInfo)
    }
  },
  mounted(){
    this.getTodos()
  },
  methods: {
    async getTodos() {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos')
      this.todos = await res.json()
      this.filteredTodos = [...this.todos]
      this.userIds = [...new Set(this.todos.map(todo => todo.userId))]
    },
    filterTodos() {
      let filteredTodos = []
      if (typeof this.userId === 'number') {
        filteredTodos = this.todos.filter(todo => todo.userId === this.userId)
      } else filteredTodos = [...this.todos]

      switch(this.status){
        case 'completed':
          this.filteredTodos = filteredTodos.filter(todo => todo.completed)
          break
        case 'uncompleted':
          this.filteredTodos = filteredTodos.filter(todo => !todo.completed)
          break
        case 'favorites':
          const favoriteTodosId = JSON.parse(localStorage.getItem('favorites')) || []
          this.filteredTodos = filteredTodos.filter(todo => favoriteTodosId.includes(todo.id))
          break
        default:
          this.filteredTodos = filteredTodos
      }

      if(this.search) {
        this.throttle(this.search)
      } 
    },
    throttle(str, timeout = 66) {
      let resizeTimeout
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null
          this.filteredTodos = this.filteredTodos.filter(todo => todo.title.includes(str)) 
        }, timeout)
      }
    },
    addToFavorite(id){
      const favoriteTodosId = JSON.parse(localStorage.getItem('favorites')) || []
      favoriteTodosId.push(id)
      localStorage.setItem('favorites', JSON.stringify([...new Set(favoriteTodosId)]))
    },
    async createTodo(){
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos', { method: "POST", body: JSON.stringify(this.todoBody) })
        if(res.ok) this.filteredTodos.push(this.todoBody)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
  .user-info__list {
    text-align: left;
  }

  .user-info__filters,
  .user-info__form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px
  }
</style>
