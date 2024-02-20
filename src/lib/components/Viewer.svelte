<!-- src/routes/your-page-name.svelte -->

<script lang="ts">
    export let uuid: string;

    const imageUrl = `src/lib/images/${uuid}.png.png`
</script>


<img src={import.meta.env.BASE_URL + imageUrl} alt="{uuid} - fractal">
