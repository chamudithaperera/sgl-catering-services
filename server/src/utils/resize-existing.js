const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const uploadsDirectory = path.resolve(__dirname, "../../uploads");

const TARGET_MAX_DIMENSION = 1200;
const OPTIMIZABLE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function resizeExistingImages() {
  console.log(`Scanning uploads directory: ${uploadsDirectory}`);
  
  if (!fs.existsSync(uploadsDirectory)) {
    console.error("Uploads directory does not exist.");
    return;
  }

  try {
    const files = await fs.promises.readdir(uploadsDirectory);
    console.log(`Found ${files.length} items in directory.`);

    let processedCount = 0;
    let skippedCount = 0;

    for (const file of files) {
      const filePath = path.join(uploadsDirectory, file);
      const stat = await fs.promises.stat(filePath);

      if (stat.isDirectory()) {
        continue;
      }

      const ext = path.extname(file).toLowerCase();
      if (!OPTIMIZABLE_EXTENSIONS.has(ext)) {
        console.log(`Skipping non-optimizable file: ${file}`);
        skippedCount++;
        continue;
      }

      try {
        console.log(`Processing: ${file}`);
        const data = await fs.promises.readFile(filePath);
        
        let pipeline = sharp(data)
          .rotate()
          .resize({
            width: TARGET_MAX_DIMENSION,
            height: TARGET_MAX_DIMENSION,
            fit: "inside",
            withoutEnlargement: true,
          });

        if (ext === ".jpg" || ext === ".jpeg") {
          pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
        } else if (ext === ".png") {
          pipeline = pipeline.png({ quality: 80 });
        } else if (ext === ".webp") {
          pipeline = pipeline.webp({ quality: 80 });
        }

        const outputBuffer = await pipeline.toBuffer();
        
        // Write optimized image back to disk
        await fs.promises.writeFile(filePath, outputBuffer);
        
        const newSize = outputBuffer.length;
        console.log(`Optimized ${file} successfully. Original size: ${stat.size} bytes, New size: ${newSize} bytes.`);
        processedCount++;
      } catch (error) {
        console.error(`Failed to process image ${file}:`, error.message);
      }
    }

    console.log(`Batch resizing completed. Processed: ${processedCount}, Skipped: ${skippedCount}`);
  } catch (error) {
    console.error("An error occurred during scanning:", error);
  }
}

// Run the script directly if executed via CLI
if (require.main === module) {
  resizeExistingImages();
}

module.exports = { resizeExistingImages };
