<script lang="ts">
import { defineComponent } from 'vue';
import InputPublico from '../components/InputPublico.vue';
import loginIcone from "../assets/images/login.svg"
import senhaIcone from "../assets/images/senha.svg"

export default defineComponent({
    setup() {
        return {
            loginIcone,
            senhaIcone
        }
    },
    data() {
        return {
            login: "",
            senha: "",
            loading: false,
            error: "",
            inputLoginFocus: false,
            inputSenhaFocus: false
        };
    },
    methods: {
        efetuarLogin() {
            if (!this.login || !this.senha) {
                this.error = "Favor preencher o formulario";
                return;
            }
            alert(`Login efetuado ${this.login}, ${this.senha}`);
        },
        setLogin(v: any) {
            this.login = v;
        },
        setSenha(v: any) {
            this.senha = v;
        }
    },
    components: { InputPublico }
})
</script>

<template>
    <div class="container-publico">
        <img src="../assets/images/logo.svg" alt="Logo Devagram" class="logo">
        <form action="">
            <p v-if="error" class="error">{{error}}</p>
            <InputPublico 
                :icone="loginIcone" 
                :model-value="login"
                placeholder="Email" 
                alt="Insira o login" 
                tipo="text" 
                @setInput="setLogin"
            />
            <InputPublico 
                :icone="senhaIcone" 
                :model-value="senha"
                placeholder="Senha" 
                alt="Insira a senha" 
                tipo="password" 
                @setInput="setSenha"
            />
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