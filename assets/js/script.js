document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('diagram-canvas');
    const ctx = canvas.getContext('2d');
    
    let shapes = [];
    let selectedShape = null;
    let offsetX, offsetY;

    function drawShapes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        shapes.forEach(shape => {
            ctx.beginPath();
            ctx.rect(shape.x, shape.y, shape.width, shape.height);
            ctx.fillStyle = shape.color;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        });
    }

    function addShape(type) {
        const shape = {
            type,
            x: Math.random() * (canvas.width - 100),
            y: Math.random() * (canvas.height - 100),
            width: 100,
            height: 100,
            color: 'rgba(0, 150, 136, 0.5)'
        };
        shapes.push(shape);
        drawShapes();
    }

    function handleMouseDown(e) {
        const { offsetX, offsetY } = e;
        shapes.forEach(shape => {
            if (
                offsetX >= shape.x &&
                offsetX <= shape.x + shape.width &&
                offsetY >= shape.y &&
                offsetY <= shape.y + shape.height
            ) {
                selectedShape = shape;
                this.offsetX = offsetX - shape.x;
                this.offsetY = offsetY - shape.y;
            }
        });
    }

    function handleMouseMove(e) {
        if (!selectedShape) return;

        const { offsetX, offsetY } = e;
        selectedShape.x = offsetX - this.offsetX;
        selectedShape.y = offsetY - this.offsetY;
        drawShapes();
    }

    function handleMouseUp() {
        selectedShape = null;
    }

    document.getElementById('add-rectangle').addEventListener('click', () => addShape('rectangle'));
    document.getElementById('add-circle').addEventListener('click', () => addShape('circle'));

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    drawShapes();
});
