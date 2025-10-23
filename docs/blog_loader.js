function loadBlogContent(modalId, contentUrl) {
    const modal = document.getElementById(modalId);
    const contentDiv = modal.querySelector('.prose');


    modal.classList.remove('hidden');
    contentDiv.innerHTML = '<p class="text-center text-gray-400">Loading content...</p>'; // Show a loading message

    fetch(contentUrl)
        .then(response => {
            if (!response.ok) {

                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text(); 
        })
        .then(htmlContent => {
            contentDiv.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Error loading blog content:', error);
            contentDiv.innerHTML = `
                <p class="text-red-500 font-semibold">
                    Error: Failed to load blog content.
                </p>
                <p class="text-gray-500 text-sm">
                    Please check if the file "${contentUrl}" exists.
                </p>
            `;
        });
}


function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}