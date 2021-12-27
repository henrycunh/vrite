<template>
    <main v-if="currentNote && currentNote.content">
        <div class="editor">
            <the-editor 
                v-model="currentNote.content"
                @content-changed="updateNoteContent" 
            />
        </div>
        <the-preview :content="currentNote.content" />
    </main>
</template>

<script lang="ts" setup>
import { useToast } from 'vue-toastification';
import { useNoteStore } from '../../store/notes';

const { currentNote, notes } = toRefs(useNoteStore())
const { loadNote, updateNote } = useNoteStore()
const route = useRoute()
const toast = useToast()

onMounted(async () => {
    if (route.params.id) {
        loadNote(route.params.id as string)
    }
})

function updateNoteContent (content: string) {
    toast.info('Saving...', { timeout: 1000 })
    console.log(notes.value)
    updateNote(currentNote.value.id, { content })
    console.log(notes.value)
}
</script>

<style lang="scss" scoped>
main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 12px 24px;
    gap: 2em;
    & > .preview {
        font-family: Rubik, sans-serif;
    }
}
</style>

<route lang="yaml">
meta:
    layout: default
    auth: true
</route>