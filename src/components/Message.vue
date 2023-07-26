<template>
    <div class="message">
        <div v-if="!sender" class="they">
            <p class="float-left">{{ name }}</p>
            <p class="float-right">{{ createdAt.toDate().toLocaleString('vi-VN',{ year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit',}) }}</p>
        </div>
        <div v-else class="me">
            <p class="float-left">{{ createdAt.toDate().toLocaleString('vi-VN',{ year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit',}) }}</p>
        </div>
        <div class="flex" :class="sender ? 'flex-row-reverse' : ''">
            <avatar class="mt-1" :src="photoUrl"/>
            <div class="text w-3/4" :class="sender ? 'bg-green-800' : 'bg-gray-700'">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from './Avatar.vue'

export default {
    components: {
        'avatar': Avatar
    },
    props: {
        name: { type: String, default: ''},
        photoUrl: { type: String, default: ''},
        sender: { type: Boolean, default: false},
        createdAt: { type: Object, default: new Date() }
    }
}
</script>