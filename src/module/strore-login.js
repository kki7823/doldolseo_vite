import {ref, readonly} from "vue";

const userId = ref('')
const loginSuccess = ref(false)
const loginError = ref(false)

export default {
    loginSuccess: loginSuccess,
    loginError: loginError,
    userId: userId,
}