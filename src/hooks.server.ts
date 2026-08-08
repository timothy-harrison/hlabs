import type { ServerInit } from "@sveltejs/kit";
import { exec } from "child_process";

export const init: ServerInit = async () => {
    exec("gmx --version", (error, stdout, stderr) => {
        if (error) {
            alert("Gromacs not installed on server");
        } else {
            console.log("Gromacs installation found");
        }
    })
}