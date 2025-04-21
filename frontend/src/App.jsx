import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div class="bg-white dark:bg-gray-950 min-h-screen">
            <header class="border-t-1 border-b-1 border-zinc-200 dark:border-zinc-700">
                <h1 class="text-black dark:text-white p-4 flex justify-between items-center">
                    <span class="text-3xl font-bold">Nome do Site</span>
                    <div class="font-sans flex space-x-3">
                        <a href="#sobre">Sobre</a>
                        <a href="#contato">Contato</a>
                        <a href="#adotar">Adotar</a>
                        <a href="#cadastro">Entrar</a>
                        <a href="#cadastro">Cadastro</a>
                    </div>
                </h1>
            </header>
            <footer class="border-t-1 border-b-1 border-zinc-200 dark:border-zinc-700 text-center text">
                <h1 class="text-gray-700 dark:text-gray-400 font-sans">
                    © 2025 Nome do Site. Todos os direitos reservados.
                </h1>
            </footer>
        </div>
    );
}

export default App;
