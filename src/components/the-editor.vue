<template>
    <editor-content class="editor" :editor="editor"/>
</template>

<script lang="ts" setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Typography from '@tiptap/extension-typography'
import { useDebounceFn } from '@vueuse/shared'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits(['update:modelValue', 'content-changed'])


const editor = useEditor({
    content: props.modelValue,
    extensions: [
        StarterKit, 
        Typography
    ],
})

const emitContentChanged = useDebounceFn(() => {
    emit('content-changed', editor.value.getHTML())
}, 3000)

onMounted(() => {
    editor.value.on('update', () => {
        emit('update:modelValue', editor.value.getHTML())
        emitContentChanged()
    })
})
</script>

<style lang="scss">
.ProseMirror {
    padding: .25em .75em;
    border: 2px solid #ccc;
    border-radius: 4px;
    transition: 300ms ease-in-out;
    font-family: Inconsolata, monospace;
    outline: none;

    &-focused {
        border-color: #aaa !important;
        box-shadow: 0 4px 10px -8px #00000088;
    }
}
</style>