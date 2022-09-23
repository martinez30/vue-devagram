<script lang="ts">
import { defineComponent } from 'vue';
import InputPublico from '../components/InputPublico.vue';
import loginIcone from "../assets/images/login.svg"
import senhaIcone from "../assets/images/senha.svg"
import { LoginServices } from '../services/LoginServices'

const loginService = new LoginServices();

export default defineComponent({
    setup() {
        return {
            loginIcone,
            senhaIcone,
            loginService
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
        async efetuarLogin() {
            try {
                if (!this.login || !this.login.trim() || !this.senha || !this.senha.trim() ) {
                    this.error = "Favor preencher o formulario";
                    return;
                }
                this.loading = true;
                await loginService.login({ login: this.login, senha: this.senha })
            }
            catch (e: any) {
                console.log(e)
                if(e?.response?.data?.erro){
                    this.error = e?.response?.data?.erro
                }
                else {
                    this.error = 'Nao foi possivel efetuar o login, tente novamente'
                }
            }
            finally {
                this.loading = false;
            }
        },
        setLogin(v: any) {
            this.login = v;
        },
        setSenha(v: any) {
            this.senha = v;
        }
    },
    computed: {
        buttonText() {
            return this.loading ? '... Carregando' : 'Login'
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
            <InputPublico :icone="loginIcone" :model-value="login" placeholder="Email" alt="Insira o login" tipo="text"
                @setInput="setLogin" />
            <InputPublico :icone="senhaIcone" :model-value="senha" placeholder="Senha" alt="Insira a senha"
                tipo="password" @setInput="setSenha" />
            <button 
                @click.enter.prevent="efetuarLogin"
                :disabled="loading"
            >{{ buttonText }}</button>
            <div class="link">
                <p>Não possui uma conta?</p>
                <a>Faça seu cadastro agora!</a>
            </div>
        </form>
    </div>
</template>

<style lang="scss" src="@/assets/styles/paginaPublica.scss">

</style>