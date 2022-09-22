<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
            login: '',
            senha: '',
            loading: false,
            error: ''
        }
    },
    methods: {
        efetuarLogin() {
            if(!this.login || !this.senha){
                this.error = 'Favor preencher o formulario'
                return;
            }

            alert(`Login efetuado ${this.login}, ${this.senha}`)
        }
    }
})
</script>

<template>
    <div>
        <img src="../assets/images/logo.svg" alt="Logo Devagram">
        <form action="">
            <p v-if="error">{{error}}</p>
            <div>
                <img src="../assets/images/login.svg" alt="Insira o login">
                <input type="text" v-model="login" />
            </div>
            <div>
                <img src="../assets/images/senha.svg" alt="Insira a senha">
                <input type="password" v-model="senha" />
            </div>
            <button @click.enter.prevent="efetuarLogin">Login</button>
            <div>
                <p>Não possui uma conta?</p>
                <a>Faça seu cadastro agora!</a>
            </div>
        </form>
    </div>
</template>