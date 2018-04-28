<template>
<div class="content">
	<div class="container-fluid">
    <!-- <img src="/static/Constellogo3.png" class='logo'> -->
    <card class="login-card">
      <h4 slot="header" class="card-title">Login</h4>
      <form ref="form">
        <div class="row">
          <div class="col-xl-12">
            <fg-input type="text"
                      required
                      label="Username"
                      placeholder="Username"
                      v-model="credentials.username">
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-12">
            <fg-input type="password"
                      required
                      label="Password"
                      placeholder="Password"
                      v-model="credentials.password">
            </fg-input>
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="submit">
            Login
          </button>
        </div>
      </form>
    </card>
	</div>

  <div class="alert alert-danger" v-if="displayError">
    <button type="button" aria-hidden="true" class="close">×</button>
    <span>{{error}}</span>
  </div>
</div>
</template>

<script>
import Card from 'src/components/UIComponents/Cards/Card.vue'

export default {
  components: {
    Card
  },
  name: 'login',
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      },
      valid: false,
      error: '',
      loadingState: false,
      displayError: false
    }
  },
  methods: {
    submit () {
      let errorMsgTimeSpan = 3000
      if (this.credentials.username && this.credentials.password) {
        this.loadingState = true
        setTimeout (() => {
          if (this.credentials.username === 'amineketo' && this.credentials.password === '1234') {
            this.$router.push({path: '/admin'})
          } else {
            this.error = 'Username or Password is not valid'
            this.loadingState = false
            this.displayError = true
            setTimeout(() => (this.displayError = false), errorMsgTimeSpan)
          }
        }, 1000)
      } else {
        this.error = 'Username and Password are required'
        this.loadingState = false
        this.displayError = true
        setTimeout(() => (this.displayError = false), errorMsgTimeSpan)       
      }
    }
  }
}
</script>

<style scoped>
	.login-container{
	/* background:url("/static/constellation_background.jpg"); */
	background-size: cover;
	background-position: center;
	height: 100%;
}	
  .content {
    margin: auto;
    padding: 15em;
    vertical-align: middle;
    text-align: center;
    align-content: center;
    min-height: 100vh;
  }
  .login-card {
    margin: auto;
    text-align: left;
    max-width: 20em;
  }
	.logo{
		width: 20rem !important;
		position: absolute;
		top : 2vh;
		left: 2vh;
	}
</style>