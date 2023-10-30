<script lang="ts">
    // import { session } from "$app/stores";
    // import { getDocument } from "pdfjs-dist/es5/build/pdf";
    // import { onMount } from "svelte";

    // let pdfDoc: { numPages: any };

    // onMount(async () => {
    //     // Get the file from the session store
    //     const { file } = $session;
    //     if (file) {
    //         const fileReader = new FileReader();
    //         fileReader.onload = async function () {
    //             const pdfData = new Uint8Array(this.result as ArrayBuffer);
    //             pdfDoc = await getDocument(pdfData).promise;
    //             console.log("Number of pages:", pdfDoc.numPages);
    //             // You can now work with the pdfDoc object to extract information from the PDF
    //         };
    //         fileReader.readAsArrayBuffer(file);
    //     }
    // });
</script>

<main>
    <h1>Chat Page</h1>
    <p>This is the page to chat with your resume.</p>
    <p>Number of pages: Any!</p>
</main>
