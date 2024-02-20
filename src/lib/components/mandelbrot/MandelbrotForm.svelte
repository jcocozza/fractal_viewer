<script lang="ts">
    import type { Complex } from "$lib/model/complex";

    let width: number = 600;
    let height: number = 600;

    let equation: string = "z*z + c"
    let max_escape_iterations: number = 1000;
    let zoom: number = 4.0
    let center_point: Complex = {real: 0, imaginary: 0}
    let coloring_algorithm: string = "greyscale"

    let image: boolean = true
    let video: boolean = false;
    let stl: boolean = false;

    let fps: number = 10;
</script>

<form>
    <!-- Basic Mandelbrot Stuff-->
    <div class="form-group">
        <label for="equation">Equation</label>
        <input type="text" id="equation" bind:value={equation}>

        <label for="max-escape-iterations">Max iterations for escape:</label>
        <input type="number" id="max-escape-iterations" bind:value={max_escape_iterations}>

        <label for="zoom">Zoom:</label>
        <input type="number" id="zoom" bind:value={zoom}>

        <label for="center-point-real">Center Point (real part)</label>
        <input type="number" id="center-point-real" bind:value={center_point.real}>

        <label for="center-point-imaginary">Center Point (imaginary part)</label>
        <input type="number" id="center-point-imaginary" bind:value={center_point.imaginary}>

        <label for="coloring-algorithm">Coloring Algorithm</label>
        <select id="coloring-algorithm" bind:value={coloring_algorithm}>
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
          <input class="form-check-input" type="checkbox" id="image" bind:checked={image}>
        </div>
        <div class="form-check form-check-inline">
            <label class="form-check-label" for="video">video</label>
            <input class="form-check-input" type="checkbox" id="video" bind:checked={video}>
        </div>
        <div class="form-check form-check-inline">
            <label class="form-check-label" for="stl">STL</label>
            <input class="form-check-input" type="checkbox" id="stl" bind:checked={stl}>
        </div>
    </div>

    {#if image || video}
        <label for="width">Width</label>
        <input type="number" id="width" bind:value={width}/>

        <label for="height">Height</label>
        <input type="number" id="height" bind:value={height}/>
    {/if}

    {#if video}
        <div class="form-group">
            <label for="fps">Frames per second(FPS)</label>
            <input type="number" id="fps" bind:value={fps}>
        </div>
    {/if}

    <button type="submit"> Go! </button>
</form>