<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { CodeJar } from 'codejar'
import { TEditor } from "../types/editor";
import { emit } from "process";

const emits = defineEmits(['update', 'hasError'])
const props = defineProps<TEditor>()

const editor = ref<any>()
const jar = ref<any>()

const hasError = ref(false)


watch(hasError, (value: boolean) => {
    emits('hasError', value)
})

onMounted(() => {
    editor.value = document.querySelector('.editor')

    jar.value = CodeJar(editor.value, highlight)
    jar.value.updateOptions({ tab: '\t' })
    jar.value.updateCode(props.initialValue)
    jar.value.onUpdate(send)

    if (props.initialValue) send(props.initialValue)
})

const send = (code: string) => {
    try {
        const parse = JSON.parse(code)
        hasError.value = false
        emits('update', parse)
    } catch (error) {
        hasError.value = true
    }
}

const highlight = (editor: HTMLElement) => {
    const code = editor.textContent
    if (code) {
        editor.innerHTML = code || ''
    }
}
</script>

<template>
    <pre :class="['editor  bg-transparent w-full outline-none', ( hasError ? 'text-red-400' : 'text-slate-300' )]"></pre>
</template>
