<template>
    <div class="container-sm mt-20">
        <div class="mx-5">
            <message v-for="{ id, text, userPhotoURL, userName, userId, createdAt } in messages"
                :key="id" :name="userName" :photo-url="userPhotoURL" :sender="userId === user?.uid" :created-at="createdAt">
                {{ text }}
            </message>

        </div>
    </div>

    <div ref="bottom" class="mt-20"></div>

    <div class="bottom">
        <div class="container-sm">
            <form v-if="isLogin" @submit.prevent="send">
                <input v-model="message" placeholder="Aa" required/>
                <button type="submit">
                    <send-icon/>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref, watch, nextTick } from 'vue'
import { useAuth, useChat } from '@/firebase'

import SendIcon from './SendIcon.vue'
import Message from './Message.vue'

export default {
    components: {
        'message': Message,
        'send-icon': SendIcon
    },
    setup() {
        const { messages, sendMessage } = useChat();

        const bottom = ref(null);
        watch(messages, () => {
            nextTick(() => {
                bottom.value?.scrollIntoView({ behavior: 'smooth'});
            });
        }, { deep: true });

        const message = ref('');
        const send = () => {
            sendMessage(message.value);
            message.value = '';
        }

        const { user, isLogin } = useAuth();

        return { user, isLogin, messages, bottom, message, send };
    }
}
</script>