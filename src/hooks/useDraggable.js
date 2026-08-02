import { useState, useEffect } from 'react';

export function useDraggable(storageKey = 'controls_position') {
    const [position, setPosition] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : { x: 20, y: 20 };
    });

    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        // Sadece header veya belirlenen tutamağa tıklanınca sürüklensin
        if (e.target.closest('.drag-handle')) {
            setIsDragging(true);
            setDragOffset({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            });
        }
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return;
            const newX = Math.max(10, Math.min(window.innerWidth - 300, e.clientX - dragOffset.x));
            const newY = Math.max(10, Math.min(window.innerHeight - 150, e.clientY - dragOffset.y));

            const newPos = { x: newX, y: newY };
            setPosition(newPos);
            localStorage.setItem(storageKey, JSON.stringify(newPos));
        };

        const handleMouseUp = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset, storageKey]);

    return { position, handleMouseDown, isDragging };
}
