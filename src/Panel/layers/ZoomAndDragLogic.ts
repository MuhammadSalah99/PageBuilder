import { Editor } from "grapesjs";

const ZoomAndDragLogic = (editorInstance: Editor) => {

    const dragOnBtn = document.getElementById("hand") as HTMLElement;
    const dragOffBtn = document.getElementById("arrow") as HTMLElement;
    const gjsFrame = document.querySelector(".gjs-frame") as HTMLIFrameElement;
    const zoomSelect = document.getElementById('zoom-select') as HTMLSelectElement;
    const zoomInput = document.getElementById("zoom-input") as HTMLInputElement;
    const iframeDocument = gjsFrame.contentDocument || gjsFrame.contentWindow!.document;
    let isDragToggle = false;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number | null = null;
    let zoomVal = editorInstance.Canvas.getZoom();
    zoomInput.value = zoomVal.toString();

    gjsFrame.addEventListener('wheel', (e) => {
        if (e.ctrlKey) {
            if (e.deltaY < 0) {
                editorInstance.Canvas.setZoom(zoomVal + 5);
                zoomVal = editorInstance.Canvas.getZoom();
                zoomInput.value = zoomVal.toString();
            }
            else if (e.deltaY > 0) {
                editorInstance.Canvas.setZoom(zoomVal - 5);
                zoomVal = editorInstance.Canvas.getZoom();
                zoomInput.value = zoomVal.toString();
            }
        }
    });

    zoomSelect.addEventListener('change', () => {
        const zoomLevel = parseFloat(zoomSelect.value);
        applyZoom(zoomLevel);
        zoomInput.value = zoomLevel.toString();
    });


    zoomInput.addEventListener('focus', () => {
        zoomInput.value = '';
    }); 

    zoomInput.addEventListener('change', () => {
        const zoomLevel = parseFloat(zoomInput.value);
        if (!isNaN(zoomLevel)) {
            applyZoom(zoomLevel);
            if (Array.from(zoomSelect.options).some(option => parseFloat(option.value) === zoomLevel)) {
                zoomSelect.value = zoomLevel.toString();
            } else {
                zoomSelect.value = '';
            }
        }
    });

    const applyZoom = (scale: number) => {
        editorInstance.Canvas.setZoom(scale);
        if (scale === 100) {
            editorInstance.Canvas.setCoords(0, 0);
        }
        zoomInput.value = scale.toString();
    };
    setButtonState(dragOffBtn, true);

    dragOffBtn.addEventListener("click", () => {
        toggleDragMode(false);
    });

    dragOnBtn.addEventListener("click", () => {
        toggleDragMode(!isDragToggle);
        if (gjsFrame.contentDocument) {
            gjsFrame.contentDocument.body.style.cursor = isDragToggle ? "grab" : "default";
            gjsFrame.contentDocument.body.style.position = isDragToggle ? "absloute" : "default";
        }
    });
    const fullScreenDiv = document.createElement('div');

    fullScreenDiv.style.position = 'fixed';
    fullScreenDiv.style.top = '0';
    fullScreenDiv.style.left = '0';
    fullScreenDiv.style.width = '100%';
    fullScreenDiv.style.height = '100%';
    fullScreenDiv.style.zIndex = '9999';
    fullScreenDiv.style.backgroundColor = 'transparent';
    fullScreenDiv.style.display = 'none';
    iframeDocument.body.appendChild(fullScreenDiv);


    function toggleDragMode(activate: boolean) {
        isDragToggle = activate;
        setButtonState(dragOnBtn, activate);
        setButtonState(dragOffBtn, !activate);
        setCursorStyle(activate ? "grab" : "default");
        fullScreenDiv.style.display = activate ? 'block' : 'none';
    }
    let isSpaceBarPressed = false;

    window.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.code === 'Space' && !isSpaceBarPressed) {
            isSpaceBarPressed = true;
            toggleDragMode(true);
        }
    });

    window.addEventListener('keyup', (e: KeyboardEvent) => {
        if (e.code === 'Space') {
            isSpaceBarPressed = false;
            toggleDragMode(false);
        }
    });
    const updatePosition = () => {
        editorInstance.Canvas.setCoords(currentX, currentY);
    };

    const startDragging = (e: MouseEvent) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    };

    const onDragging = (e: MouseEvent) => {
        if (!isDragging) return;

        const dx = (e.clientX - startX) * .56;
        const dy = (e.clientY - startY) * .56;
        currentX += dx;
        currentY += dy;
        startX = e.clientX;
        startY = e.clientY;

        animationFrameId = requestAnimationFrame(updatePosition);
    };

    const stopDragging = () => {
        isDragging = false;
        if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    };

    fullScreenDiv.addEventListener('mousedown', startDragging);
    fullScreenDiv.addEventListener('mousemove', onDragging);
    fullScreenDiv.addEventListener('mouseup', stopDragging);
    fullScreenDiv.addEventListener('mouseleave', stopDragging);
    function setButtonState(button: HTMLElement, isActive: boolean) {
        button.style.backgroundColor = isActive ? "#833a3a" : "transparent";
    }

    function setCursorStyle(cursorStyle: string) {
        document.body.style.cursor = cursorStyle;
        iframeDocument.body.style.cursor = cursorStyle;
    }

}

export default ZoomAndDragLogic;
