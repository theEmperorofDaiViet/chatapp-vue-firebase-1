<template>
    <nav>
        <div>
            <h1><strong class="vue">Vue</strong> x <strong class="firebase">Firebase</strong> Chat App</h1>
            <div v-if="isLogin" class="login">
                <avatar :src="user.photoURL"/>
                <button class="text-gray-400 hover:text-white" @click="signOut">Sign Out</button>
            </div>
            <div v-else>
                <button class="bg-green-500 hover:bg-green-600" @click="signIn">Sign In</button>
            </div>
        </div>
    </nav>
</template>

<script>
import Avatar from './Avatar.vue'
import { useAuth } from '@/firebase'

export default {
    component: { 'avatar': Avatar },
    setup(){
        const { user, isLogin, signOut, signIn } = useAuth();
        return { user, isLogin, signOut, signIn };
    }
}
</script>

