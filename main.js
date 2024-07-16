// Description: This script loads a PDF file and draws a transparent box on the first page.
//              The box has an orange contour and contains the text "This is a transparent box".

// import pdfjs library
import * as pdfjsLib from './pdfjs-dist/build/pdf.mjs';

// set worker
pdfjsLib.GlobalWorkerOptions.workerSrc = './pdfjs-dist/build/pdf.worker.mjs';

// get pdf file url
const pdfurl = './Palmeri_ICHEP_Poster_MTD.pdf';

// get pdf file
const loadingTask = pdfjsLib.getDocument(pdfurl);

loadingTask.promise.then(pdf => {
    console.log('PDF loaded');
  
    // get first page
    return pdf.getPage(1).then(page => {
        console.log('Page loaded');
  
        // set scale
        const scale = 1;
        const viewport = page.getViewport({ scale: scale });
  
        // prepare canvas using PDF page dimensions
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
    
        // // set canvas height and width equal to #pdf-container object size
        // const pdfContainer = document.getElementById('pdf-container');
        // canvas.height = pdfContainer.clientHeight;
        // canvas.width = pdfContainer.clientWidth;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // render PDF page into canvas context
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };

        return page.render(renderContext).promise.then(() => {
            console.log('Page rendered');

            // append canvas to pdf container
            const pdfContainer = document.getElementById('pdf-container');
            pdfContainer.appendChild(canvas);

            return canvas;
            
        });
    });
}).then( canvas => {
    // --------------------- //
    // ------ DRAWING ------ //
    // --------------------- //

    // if (canvas) {
    //     const ctx = canvas.getContext('2d');

    //     // ### BOX 1 ###
    //     const box = new Path2D();
    //     box.rect(0, 0, 0.5 * canvas.width, 0.3 * canvas.height);
    //     ctx.strokeStyle = 'orange';
    //     ctx.stroke(box);
            
    //     // change color to red when hovering over box
    //     canvas.addEventListener('mousemove', (e) => {
    //         var x = e.offsetX;
    //         var y = e.offsetY;

    //         // rescale in proportion to viewport size
    //         var x = e.offsetX * canvas.width / canvas.clientWidth;
    //         var y = e.offsetY * canvas.height / canvas.clientHeight;

    //         if (ctx.isPointInPath(box, x, y)) {
    //             ctx.strokeStyle = 'red';
    //         }
    //         else {
    //             ctx.strokeStyle = 'orange';
    //         }
    //         ctx.stroke(box);
    //     });

    //     // if clicking inside box, alert
    //     canvas.addEventListener('click', (e) => {
    //         var x = e.offsetX;
    //         var y = e.offsetY;

    //         // rescale in proportion to viewport size
    //         var x = e.offsetX * canvas.width / canvas.clientWidth;
    //         var y = e.offsetY * canvas.height / canvas.clientHeight;

    //         console.log("Mouse clicked at coordinates", x, y);
    //         if (ctx.isPointInPath(box, x, y)) {
    //             console.log("Point is WITHIN box");
    //             alert("This is a transparent box");
    //         }
    //     });

    //     // ### BOX 2 ###
    //     const box2 = new Path2D();
    //     box2.rect(0.5 * canvas.width, 0, 1.0 * canvas.width, 0.3 * canvas.height);
    //     ctx.strokeStyle = 'orange';
    //     ctx.stroke(box2);

    //     // change color to red when hovering over box
    //     canvas.addEventListener('mousemove', (e) => {
    //         var x = e.offsetX;
    //         var y = e.offsetY;

    //         // rescale in proportion to viewport size
    //         var x = e.offsetX * canvas.width / canvas.clientWidth;
    //         var y = e.offsetY * canvas.height / canvas.clientHeight;

    //         if (ctx.isPointInPath(box2, x, y)) {
    //             ctx.strokeStyle = 'red';
    //         }
    //         else {
    //             ctx.strokeStyle = 'orange';
    //         }
    //         ctx.stroke(box2);
    //     });


    // } else {
    // console.error('Canvas not found');
    // }

}).catch(error => {
    console.error('Error during PDF loading or rendering:', error);
});