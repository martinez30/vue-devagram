<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue';

import { LoginServices } from '../services/LoginServices'

const loginService = new LoginServices();

export default defineComponent({
    setup() {
        return {
            loginService
        }
    },
    data() {
        return {
        };
    },
    methods: {
        sair() {
            loginService.logout();
            router.push({ name: 'login' })
        }
    }
})
</script>
    
<template>
    <div>
        <button @click="sair">Sair</button>
    </div>
</template>
    