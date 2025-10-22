const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bubbles = [];

function createBubble() {
    const radius = Math.random() * 20 + 10;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = canvas.height + radius;
    const speed = Math.random() * 2 + 1;
    const color = `hsl(${Math.random() * 360}, 100%, 80%)`;
    bubbles.push({ x, y, radius, speed, color });
}

function updateBubbles() {
    for (let i = bubbles.length - 1; i >= 0; i--) {
        const bubble = bubbles[i];
        bubble.y -= bubble.speed;
        if (bubble.y + bubble.radius < 0) {
            bubbles.splice(i, 1);
        }
    }
}

function drawBubbles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const bubble of bubbles) {
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.fill();
        ctx.closePath();
    }
}

function animate() {
    updateBubbles();
    drawBubbles();
    requestAnimationFrame(animate);
}

setInterval(createBubble, 500);
animate();