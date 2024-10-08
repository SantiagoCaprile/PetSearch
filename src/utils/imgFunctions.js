/**
 * Converts a batch of image files to base64
 * @async 
 * @param {File[]} files - The image files to convert
 * @returns {Promise<string[]>} - The images as base64 strings
 * 
 * @example
 * const files = document.querySelector('input[type="file"]').files;
 * convertBatchImagesToBase64(files)
 */
export async function convertBatchImagesToBase64(files) {
    const base64Images = await Promise.all(files.map(file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }));
    return base64Images;
}


/**
 * Converts an image file to base64 and optimizes it
 * @param {File} file - The image file to convert
 * @returns {Promise<string>} - The optimized image as a base64 string
 * 
 * @example
 * const file = document.querySelector('input[type="file"]').files[0];
 * convertImageToBase64(file)
 */
export function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 1280;
                const MAX_HEIGHT = 720;
                let width = img.width;
                let height = img.height;
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                const optimizedImage = canvas.toDataURL('image/jpeg', 0.8);
                resolve(optimizedImage);
            };
        };
        reader.onerror = error => reject(error);
    });
}