<script lang="ts">
    import { page } from "$app/stores";
    import Viewer from '../../../../../../src/lib/components/Viewer.svelte'
    $: uuid = $page.params.uuid
</script>

<Viewer bind:uuid={uuid}></Viewer>

