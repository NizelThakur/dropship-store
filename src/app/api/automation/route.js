import { exec } from 'child_process';
import path from 'path';

export async function POST(request) {
  const { action } = await request.json();
  const nodePath = 'D:\\AntiGravity\\node-v20.11.1-win-x64\\node.exe';
  
  let scriptPath = '';
  if (action === 'sync') {
    scriptPath = path.join(process.cwd(), 'scripts/meesho_scraper.js');
  } else if (action === 'social') {
    scriptPath = path.join(process.cwd(), 'scripts/social_post.js');
  } else if (action === 'fulfill') {
    scriptPath = path.join(process.cwd(), 'scripts/fulfill_order.js');
  }

  if (!scriptPath) {
    return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400 });
  }

  return new Promise((resolve) => {
    exec(`"${nodePath}" "${scriptPath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        resolve(new Response(JSON.stringify({ error: error.message, details: stderr }), { status: 500 }));
        return;
      }
      resolve(new Response(JSON.stringify({ message: 'Action triggered successfully', output: stdout }), { status: 200 }));
    });
  });
}
