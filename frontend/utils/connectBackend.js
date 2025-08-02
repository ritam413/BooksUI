export function formSubmision(form) {
    try {
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
                if (hasFile) {
                    // ✅ Send multipart/form-data
                    const Data = new FormData();
                    Data.append("title", title);
                    Data.append("tags", tags);
                    Data.append("description", description);
                    Data.append("image", fileInput.files[0]);
    
    
                    console.log("Sending request...");
                    try {
                        // const response = await fetch("http://localhost:5000/api/v1/books/upload", {
                        const response = await fetch("https://booksui.onrender.com/books/upload", {
                            method: "POST",
                            body: Data
                        })
                        const data = await response.json();
                        if(!response.ok){
                            throw new Error(data.message|| "unknown error from server")
                        }
        
                        console.log("Got response... , Upload Successfull ✅",data);
                    } catch (error) {
                        console.log("upload failed ");
                        
                    }
                } else if (hasImageUrl) {
                    // ✅ Send application/json
                    const jsonBody = {
                        title,
                        tags,
                        description,
                        image: imageUrl
                    };
                    let response ;
                    console.log("Sending request...");
                    // response = await fetch("http://localhost:5000/api/v1/books/upload", {
                    response = await fetch("https://booksui.onrender.com/books/upload", {
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
    
    } catch (error) {
        console.error("ERRor in Controller: ",error)
        return res.status(500).json({
            success:false,
            message:error.message||"something went wrong "
        })    
    }
}