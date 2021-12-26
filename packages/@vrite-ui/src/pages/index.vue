<script lang="ts" setup>
import { useNoteStore } from '../store/notes';

const { currentNote } = toRefs(useNoteStore())
const { newNote } = useNoteStore()
const router = useRouter()

onMounted(async () => {
    if (!currentNote.value) {
        const note = await newNote()
        router.push(`/notes/${note.id}`)
    } else {
        router.push('/notes')
    }
})
</script>

<template></template>