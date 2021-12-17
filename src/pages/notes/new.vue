<script lang="ts" setup>
import { useNoteStore } from '../../store/notes';
const { newNote } = useNoteStore()
const router = useRouter()

onMounted(async () => {
    const { id } = await newNote()
    router.push(`/notes/${id}`)
})
</script>