import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';

async function run() {
  try {
    console.log("Removing background...");
    const imagePath = "public/profile.png";
    const blob = await removeBackground(imagePath);
    const buffer = Buffer.from(await blob.arrayBuffer());
    fs.writeFileSync("public/profile.png", buffer);
    console.log("Background removed successfully!");
  } catch (error) {
    console.error("Error removing background:", error);
  }
}

run();
