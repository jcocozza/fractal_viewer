import { API_BASE_URL } from "../../config";
import type { Complex } from "./complex";


export type Mandelbrot = {
    equation: string;
    max_escape_iterations: number;
    zoom: number;
    center_point: Complex;
    coloring_algorithm: string;
    image: boolean;
    video: boolean;
    stl: boolean;
    initial_point: Complex;
    increment: Complex;
    num_increments: number;
    fps: number;
    width: number;
    height: number;
    file_path: string;
}

export async function SendMandelbrot(mandelbrot: Mandelbrot): Promise<string> {
    try {
        const response = await fetch(API_BASE_URL + "/mandelbrot", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mandelbrot)
        });
        if (response.ok) {
            let uuid = await response.json()
            return uuid
        } else {
            let r = await response.json()
            throw new Error("mandelbrot api failed:" + r.error)
        }
    } catch (error) {
        console.error(error)
        return ""
    }
}