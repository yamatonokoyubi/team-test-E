document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // h2の文字をアニメーションさせる
                if (entry.target.tagName === 'H2') {
                    const chars = entry.target.querySelectorAll('.char');
                    chars.forEach((char, index) => {
                        char.style.animationDelay = `${index * 0.1}s`;
                    });
                }
                // p要素をアニメーションさせる
                if (entry.target.tagName === 'P') {
                    entry.target.style.animationDelay = '0.5s';
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // h2とp要素を監視対象に追加
    document.querySelectorAll('h2, p.fade-in').forEach(el => {
        observer.observe(el);
    });

    // カーソルに追従するキラキラエフェクト
    document.addEventListener('mousemove', (e) => {
        createSparkle(e.pageX, e.pageY);
    });

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        sparkle.style.width = '10px';
        sparkle.style.height = '10px';
        sparkle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.transform = 'scale(1)';
        sparkle.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
        sparkle.style.opacity = '1';
        
        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.style.transform = `scale(0) rotate(${Math.random() * 360}deg)`;
            sparkle.style.opacity = '0';
        }, 10);

        setTimeout(() => {
            sparkle.remove();
        }, 500);
    }
});
