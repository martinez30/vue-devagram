<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
            login: '',
            senha: '',
            loading: false,
            error: '',
            inputLoginFocus: false,
            inputSenhaFocus: false
        }
    },
    methods: {
        efetuarLogin() {
            if (!this.login || !this.senha) {
                this.error = 'Favor preencher o formulario'
                return;
            }

            alert(`Login efetuado ${this.login}, ${this.senha}`)
        },
        setFocusLogin(v: boolean) {
            this.inputLoginFocus = v;
        },
        setFocusSenha(v: boolean) {
            this.inputSenhaFocus = v;
        }
    }
})
</script>

<template>
    <div class="container-publico">
        <img src="../assets/images/logo.svg" alt="Logo Devagram" class="logo">
        <form action="">
            <p v-if="error" class="error">{{error}}</p>
            <div class="input" :class="{ focus: inputLoginFocus }">
                <img src="../assets/images/login.svg" alt="Insira o login">
                <input type="text" v-model="login" placeholder="Email" 
                    @focus="setFocusLogin(true)"
                    @blur="setFocusLogin(false)" 
                />
            </div>
            <div class="input" :class="{ focus: inputSenhaFocus }">
                <img src="../assets/images/senha.svg" alt="Insira a senha">
                <input type="password" v-model="senha" placeholder="Senha" 
                    @focus="setFocusSenha(true)"
                    @blur="setFocusSenha(false)" 
                />
            </div>
            <button @click.enter.prevent="efetuarLogin">Login</button>
            <div class="link">
                <p>Não possui uma conta?</p>
                <a>Faça seu cadastro agora!</a>
            </div>
        </form>
    </div>
</template>

<style lang="scss" src="@/assets/styles/paginaPublica.scss">

</style>