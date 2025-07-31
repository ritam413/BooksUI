export function formSubmision(form) {
    if (!form) {
        console.error("Form element not provided to formSubmision()");
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const tags = document.getElementById("tags").value;
        const description = document.getElementById("description").value;
        const imageUrl = document.getElementById("imageUrl").value;
        const fileInput = document.getElementById("imageFile");

        const hasFile = fileInput.files.length > 0;
        const hasImageUrl = imageUrl.trim().length > 0;

        try {
            let response;

            if (hasFile) {
                // ✅ Send multipart/form-data
                const Data = new FormData();
                Data.append("title", title);
                Data.append("tags", tags);
                Data.append("description", description);
                Data.append("image", fileInput.files[0]);


                console.log("Sending request...");
                response = await fetch("http://localhost:5000/api/v1/books/upload", {
                    method: "POST",
                    body: Data
                })
                console.log("Got response...");

            } else if (hasImageUrl) {
                // ✅ Send application/json
                const jsonBody = {
                    title,
                    tags,
                    description,
                    image: imageUrl
                };

                console.log("Sending request...");
                response = await fetch("http://localhost:5000/api/v1/books/upload", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(jsonBody),
                    credentials: "include"
                });
                console.log("Got response...");


            } else {
                alert("Please provide either a file or an image URL.");
                return;
            }



            // ✅ Common response handling
            let result

            try {
                result = await response.json();
            } catch (jsonErr) {
                console.error("Could not parse JSON:", jsonErr);
                throw new Error("Server did not return JSON");
            }
            if (!response.ok) {
                console.log("❌ Server responded with error:", result);
                throw new Error(result.message || "Unknown server error");
            }

            console.log("✅ Upload successful:", result);
            alert("Upload successful!");

        } catch (err) {
            console.error("⚠️ Upload failed:", err.message);
            alert("Upload failed. Check the console for details.");
        }
    });

}