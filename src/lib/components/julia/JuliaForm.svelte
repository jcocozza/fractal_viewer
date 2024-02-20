<script lang="ts">
    import { goto } from "$app/navigation";
    import { SendJulia, type Julia } from "$lib/model/julia";
    import { BASE_FILE_PATH } from "../../../config";

    let loading = false;

    let j: Julia = {
        equation: "z*z - 1",
        max_escape_iterations: 1000,
        zoom: 4.0,
        center_point: {real: 0, imaginary: 0},
        coloring_algorithm: "grayscale",
        image: false,
        video: false,
        stl: false,
        initial_point: {real: 0, imaginary: 0},
        increment: {real: 0.01, imaginary: 0.01},
        num_increments: 10,
        fps: 10,
        width: 600,
        height: 600,
        file_path: BASE_FILE_PATH
    }

    async function submit() {
        loading = true
        let uuid = await SendJulia(j)
        if (uuid != "") {
            goto("/fractals/julia/viewer/" + uuid)
        }
    }
</script>

{#if !loading}
<div class="container">
    <form>
        <!-- Basic Julia Stuff-->
        <div class="form-group">
            <label for="equation">Equation</label>
            <input class="form-control" type="text" id="equation" bind:value={j.equation}>

            <label for="max-escape-iterations">Max iterations for escape:</label>
            <input class="form-control" type="number" id="max-escape-iterations" bind:value={j.max_escape_iterations}>

            <label for="zoom">Zoom:</label>
            <input class="form-control" type="number" id="zoom" bind:value={j.zoom}>

            <label for="center-point-real">Center Point (real part)</label>
            <input class="form-control" type="number" id="center-point-real" bind:value={j.center_point.real}>

            <label for="center-point-imaginary">Center Point (imaginary part)</label>
            <input class="form-control" type="number" id="center-point-imaginary" bind:value={j.center_point.imaginary}>

            <label for="coloring-algorithm">Coloring Algorithm</label>
            <select id="coloring-algorithm" bind:value={j.coloring_algorithm}>
                <option value="greyscale">Grey Scale</option>
                <option value="greyscaleclear">Grey Scale (Clear)</option>
                <option value="unitary">Unitary Scale</option>
                <option value="burning">Burning Color</option>
                <option value="inferno">Inferno Color</option>
                <option value="iteration">By number of iterations</option>
            </select>
        </div>


        <div class="form-group">
            <div class="form-check form-check-inline">
            <label class="form-check-label" for="image">image</label>
            <input class="form-check-input" type="checkbox" id="image" bind:checked={j.image}>
            </div>
            <div class="form-check form-check-inline">
                <label class="form-check-label" for="video">video</label>
                <input class="form-check-input" type="checkbox" id="video" bind:checked={j.video}>
            </div>
            <div class="form-check form-check-inline">
                <label class="form-check-label" for="stl">STL</label>
                <input class="form-check-input" type="checkbox" id="stl" bind:checked={j.stl}>
            </div>
        </div>

        {#if j.image || j.video}
            <label for="width">Width</label>
            <input class="form-control" type="number" id="width" bind:value={j.width}/>

            <label for="height">Height</label>
            <input class="form-control" type="number" id="height" bind:value={j.height}/>
        {/if}

        {#if j.video}
            <div class="form-group">
                <label for="fps">Frames per second(FPS)</label>
                <input class="form-control" type="number" id="fps" bind:value={j.fps}>
            </div>
        {/if}

        {#if j.video || j.stl}
            <div class="form-group">
                <label for="initial-point-real">Initial Point (real part)</label>
                <input class="form-control" type="number" id="initial-point-real" bind:value={j.initial_point.real}>

                <label for="initial-point-imaginary">Initial Point (imaginary part)</label>
                <input class="form-control" type="number" id="initial-point-imaginary" bind:value={j.initial_point.imaginary}>

                <label for="increment-real">Increment (real part)</label>
                <input class="form-control" type="number" id="increment-real" bind:value={j.increment.real}>

                <label for="increment-imaginary">Increment (imaginary part)</label>
                <input class="form-control" type="number" id="increment-imaginary" bind:value={j.increment.imaginary}>

                <label for="num-increment">Number of Increments</label>
                <input class="form-control" type="number" id="num-imaginary" bind:value={j.num_increments}>
            </div>
        {/if}

        <button class="btn btn-primary" type="submit" on:click={submit}>Go!</button>
    </form>
</div>
{:else}
    Loading...
{/if}
