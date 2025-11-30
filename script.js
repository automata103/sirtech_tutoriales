
        // Demo en vivo (versión simplificada para el tutorial)
        const demoCanvas = document.getElementById('demoWormCanvas');
        const demoCtx = demoCanvas.getContext('2d');
        const demoEmotionDisplay = document.getElementById('demoEmotionDisplay');

        // Ajustar tamaño del canvas demo
        function resizeDemoCanvas() {
            demoCanvas.width = demoCanvas.clientWidth;
            demoCanvas.height = demoCanvas.clientHeight;
        }
        resizeDemoCanvas();
        window.addEventListener('resize', resizeDemoCanvas);

        // Variables del gusano demo
        let demoSegments = 20;
        let demoPoints = [];
        for (let i = 0; i < demoSegments; i++) {
            demoPoints.push({ x: -100, y: demoCanvas.height / 2 });
        }

        let demoMouse = { x: demoCanvas.width / 2, y: demoCanvas.height / 2 };
        let demoEntering = true;
        let demoEmotion = "neutral";
        let demoParticles = [];

        // Movimiento del gusano demo
        function demoMoveWorm() {
            let head = demoPoints[0];

            if (demoEntering) {
                head.x += 5;
                if (head.x > demoCanvas.width / 2 - 100) demoEntering = false;
            } else {
                head.x += (demoMouse.x - head.x) * 0.05;
                head.y += (demoMouse.y - head.y) * 0.05;
            }

            for (let i = 1; i < demoSegments; i++) {
                let prev = demoPoints[i - 1];
                let curr = demoPoints[i];
                let dx = prev.x - curr.x;
                let dy = prev.y - curr.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist > 15) {
                    curr.x += (dx / dist) * (dist - 15) * 0.5;
                    curr.y += (dy / dist) * (dist - 15) * 0.5;
                }
            }
        }

        // Dibujar el gusano demo
        function demoDrawWorm() {
            const head = demoPoints[0];

            for (let i = 1; i < demoSegments; i++) {
                const size = 12 - i * 0.4;
                const opacity = 0.7 - (i / demoSegments) * 0.5;

                demoCtx.fillStyle = `rgba(0, 255, 200, ${opacity})`;
                demoCtx.beginPath();
                demoCtx.arc(demoPoints[i].x, demoPoints[i].y, size, 0, Math.PI * 2);
                demoCtx.fill();
            }

            demoCtx.fillStyle = "#00ffc4";
            demoCtx.beginPath();
            demoCtx.arc(head.x, head.y, 15, 0, Math.PI * 2);
            demoCtx.fill();

            // Ojos simples
            demoCtx.fillStyle = "#ffffff";
            demoCtx.beginPath();
            demoCtx.arc(head.x - 7, head.y - 5, 4, 0, Math.PI * 2);
            demoCtx.fill();
            demoCtx.beginPath();
            demoCtx.arc(head.x + 7, head.y - 5, 4, 0, Math.PI * 2);
            demoCtx.fill();

            demoCtx.fillStyle = "#000000";
            demoCtx.beginPath();
            demoCtx.arc(head.x - 7, head.y - 5, 2, 0, Math.PI * 2);
            demoCtx.fill();
            demoCtx.beginPath();
            demoCtx.arc(head.x + 7, head.y - 5, 2, 0, Math.PI * 2);
            demoCtx.fill();

            // Boca
            demoCtx.strokeStyle = "#000000";
            demoCtx.lineWidth = 1.5;
            demoCtx.beginPath();
            demoCtx.moveTo(head.x - 6, head.y + 6);
            demoCtx.lineTo(head.x + 6, head.y + 6);
            demoCtx.stroke();
        }

        // Bucle de animación demo
        function demoAnimate() {
            demoCtx.clearRect(0, 0, demoCanvas.width, demoCanvas.height);
            demoMoveWorm();
            demoDrawWorm();
            requestAnimationFrame(demoAnimate);
        }

        // Eventos demo
        demoCanvas.addEventListener("mousemove", e => {
            const rect = demoCanvas.getBoundingClientRect();
            demoMouse.x = e.clientX - rect.left;
            demoMouse.y = e.clientY - rect.top;
        });

        document.getElementById("demoEmail").addEventListener("focus", () => {
            demoEmotionDisplay.textContent = "Emoción: Curioso";
        });

        document.getElementById("demoPassword").addEventListener("focus", () => {
            demoEmotionDisplay.textContent = "Emoción: Alerta";
        });

        document.getElementById("demoTogglePass").addEventListener("click", () => {
            const pass = document.getElementById("demoPassword");
            pass.type = pass.type === "password" ? "text" : "password";
            demoEmotionDisplay.textContent = pass.type === "text" ? "Emoción: Curioso" : "Emoción: Neutral";
        });

        document.getElementById("demoLoginBtn").addEventListener("click", () => {
            let email = document.getElementById("demoEmail").value;
            let pass = document.getElementById("demoPassword").value;
            if (email === "admin@example.com" && pass === "1234") {
                demoEmotionDisplay.textContent = "Emoción: Feliz 🎉";
            } else {
                demoEmotionDisplay.textContent = "Emoción: Frustrado 😠";
            }
        });

        // Función para copiar código
        function copyCode(button) {
            const codeBlock = button.parentElement.nextElementSibling;
            const codeText = codeBlock.textContent;
            
            navigator.clipboard.writeText(codeText).then(() => {
                const originalText = button.textContent;
                button.textContent = "¡Copiado!";
                
                setTimeout(() => {
                    button.textContent = originalText;
                }, 2000);
            });
        }

        demoAnimate();
