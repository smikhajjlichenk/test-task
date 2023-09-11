<template>
  <div class="modal">
    <header class="modal__header">
      description
    </header>
    <form @submit.prevent="submitForm" ref="form" class="modal__body">
      <span class="modal__error" v-if="error">{{ error }}</span>
      <template v-else>description</template>
      <input v-model.trim="body.userName" @input="error = ''" placeholder="Username" pattern="^[a-zA-Z_.]+$" required>
      <input v-model.trim="body.phoneNumber" @input="error = ''" placeholder="Phone Number" pattern="^[\d\(\)\-.\sx]+$" required>
      <button>Register</button> 
    </form>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    users: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return {
      currentUser: [],
      body: {
        userName: '',
        phoneNumber: '',
      },
      error: ''
    }
  },
  methods: {
    submitForm(){
      this.currentUser = this.users.find(user => {
        if(user.username === this.body.userName && user.phone === this.body.phoneNumber) return user
      })

      if(!this.currentUser) this.error = 'login error'
      else this.$router.push({ name: 'userInfo', params: { id: this.currentUser.id }, query: { userInfo: JSON.stringify(this.currentUser) } })
    }
  }
}
</script>
<style scoped>
.modal {
  max-width: 447px;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  background-color: #C3C3C3;
}

.modal__error {
  color: red
}

.modal__header {
  background-color: #A5A5A5;
  padding: 15px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
}

.modal__body {
  padding: 15px 25px 0 25px;
  text-align: left;
  font-size: 15px;
  color: #5F5F5F;
  display: flex;
  flex-direction: column;
}

.modal__body input {
  margin-bottom: 20px;
  font-size: 17px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #fff;
}

.modal__body input::placeholder {
  color: #353535
}

.modal__body input:first-of-type {
  margin-top: 14px;
}

.modal__body button {
  margin: 5px 0 30px;
  width: 100%;
  padding: 10px 30px;
  border: none;
  border-radius: 5px;
  font-size: 17px;
  font-weight: 600;
  color: #fff;
  background-color: #519945;
  cursor: pointer;
}
</style>
