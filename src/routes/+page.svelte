<script lang="ts">
    import { onMount } from 'svelte';

    let drawing = false;

    type Point = {
        X: number;
        Y: number;
    }

    let dragPoints: Point[] = [];
    let canvas: HTMLCanvasElement;

    import pirate from '$lib/images/mandelbrot/pirate_ship.png';

    function addPoint(x: number, y: number) {
        dragPoints = [...dragPoints, { X:x, Y:y }];
    }
    function startDrawing(event: MouseEvent) {
        drawing = true;
        dragPoints = []; // Clear the previous points when starting a new drag
        addPoint(event.clientX, event.clientY);
    }

    function stopDrawing() {
      drawing = false;
    }

    function draw(event: { clientX: number; clientY: number; }) {
        if (!drawing) return;

        const context = canvas.getContext('2d');

        // Get the mouse coordinates
        const x = event.clientX - canvas.offsetLeft;
        const y = event.clientY - canvas.offsetTop;

        if (context != null) {
            // Draw a small circle at the mouse coordinates
            context.beginPath();
            context.arc(x, y, 5, 0, 2 * Math.PI);
            context.fillStyle = 'black';
            context.fill();
            context.closePath();
        }
        if (drawing) {
            addPoint(event.clientX, event.clientY);
        }
    }

    function reset() {
        const context = canvas.getContext('2d');
        if (context != null) {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
        dragPoints = [];
    }


    onMount(() => {
      const image = new Image();
      image.src = pirate //'/pirate_ship.png'; // Replace with the path to your image
      const context = canvas.getContext('2d');

      image.onload = () => {
        // Set canvas dimensions to match the image dimensions
        canvas.width = image.width;
        canvas.height = image.height;
        // Draw the image on the canvas
        if (context != null) {
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
      };
    });
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<main on:mouseup={stopDrawing}>
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img alt="The project logo" src={pirate} />
    <canvas
      bind:this={canvas}
      on:mousedown={startDrawing}
      on:mousemove={draw}
      width="400"
      height="300"
    ></canvas>

    {#if dragPoints.length > 0}
        <ul>
            {#each dragPoints as pt}
            <li>({pt.X}, {pt.Y})</li>
            {/each}
        </ul>
    {/if}

    <button on:click={reset}>Reset</button>
</main>

<style>
    canvas {
      position: absolute;
      top: 0;
      left: 0;
      border: 1px solid #ccc;
    }

    main {
      position: relative;
    }
</style>