const fs = require('fs');
const path = require('path');

// function countLinesInFile(filePath) {
//   const content = fs.readFileSync(filePath, 'utf8');
//   const lines = content.split('\n').filter(line => line.trim() !== '');
//   return lines.length;
// }

// function detectLanguage(extension) {
//   const extensionsToLanguages = {
//     '.html': 'HTML',
//     '.htm': 'HTML',
//     '.css': 'CSS',
//     '.js': 'JavaScript',
//     '.ts': 'TypeScript',
//     '.jsx': 'JavaScript (JSX)',
//     '.tsx': 'TypeScript (TSX)',
//     '.php': 'PHP',
//     '.py': 'Python',
//     '.java': 'Java',
//     '.c': 'C',
//     '.cpp': 'C++',
//     '.cs': 'C#',
//     '.rb': 'Ruby',
//     '.swift': 'Swift',
//     '.go': 'Go',
//     '.rs': 'Rust',
//     '.json': 'JSON',
//     '.xml': 'XML',
//     '.yml': 'YAML',
//     '.toml': 'TOML',
//     '.md': 'Markdown',
//     '.txt': 'Plain Text'
//     // Adicione outras extensões e linguagens conforme necessário
//   };

//   return extensionsToLanguages[extension.toLowerCase()] || 'Unknown';
// }

// function countLinesInFolder(folderPath, parentPath = '') {
//   const files = fs.readdirSync(folderPath);

//   let totalLines = 0;
//   for (const file of files) {
//     const filePath = path.join(folderPath, file);
//     const stats = fs.statSync(filePath);

//     if (stats.isFile()) {
//       const extension = path.extname(file);
//       const language = detectLanguage(extension);
//       if (language !== 'Unknown') {
//         const lines = countLinesInFile(filePath);
//         console.log(`${path.join(parentPath, file)} (${language}): ${lines} lines`);
//         totalLines += lines;
//       }
//     } else if (stats.isDirectory()) {
//       const linesInSubfolder = countLinesInFolder(filePath, path.join(parentPath, file));
//       totalLines += linesInSubfolder;
//     }
//   }

//   return totalLines;
// }

// const args = process.argv.slice(2);
// if (args.length > 0) {
//   const folderPath = args[0];
//   const totalLines = countLinesInFolder(folderPath);
//   console.log(`Total lines in all files: ${totalLines}`);
// }

async function countLinesInFile(filePath) {
  const content = await fetch(filePath).then(response => response.text());
  const lines = content.split('\n').filter(line => line.trim() !== '');
  return lines.length;
}

function detectLanguage(extension) {
  const extensionsToLanguages = {
    '.html': 'HTML',
    '.htm': 'HTML',
    '.css': 'CSS',
    '.js': 'JavaScript',
    '.ts': 'TypeScript',
    '.jsx': 'JavaScript (JSX)',
    '.tsx': 'TypeScript (TSX)',
    '.php': 'PHP',
    '.py': 'Python',
    '.java': 'Java',
    '.c': 'C',
    '.cpp': 'C++',
    '.cs': 'C#',
    '.rb': 'Ruby',
    '.swift': 'Swift',
    '.go': 'Go',
    '.rs': 'Rust',
    '.json': 'JSON',
    '.xml': 'XML',
    '.yml': 'YAML',
    '.toml': 'TOML',
    '.md': 'Markdown',
    '.txt': 'Plain Text',
    // Adicione outras extensões e linguagens conforme necessário
  };

  return extensionsToLanguages[extension.toLowerCase()] || 'Unknown';
}

async function countLinesInGitHubRepo() {
  const owner = document.getElementById('owner').value;
  const repo = document.getElementById('repository').value;
  const token = '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'; // Substitua pelo seu token do GitHub

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`, {
      headers,
    });
    const data = await response.json();

    let totalLines = 0;
    for (const file of data) {
      if (file.type === 'file') {
        const filePath = file.download_url;
        const lines = await countLinesInFile(filePath);
        const extension = file.name.substring(file.name.lastIndexOf('.'));
        const language = detectLanguage(extension);
        totalLines += lines;
      }
    }

    function openPopup() {
      var popup = window.open('./index.html', 'popup', 'width=500,height=200');
      popup.document.write(
        '<h1>Este é um popup!</h1>',
        '<p>Este é um exemplo de como abrir uma janela popup com JavaScript.</p>'
      );
    }
 
    // Exibir o resultado em uma janela popup
    const popup = window.open('./index.html', 'popup', 'width=400,height=200');
    popup.document.write(`Total lines in all files: ${totalLines}`);
    } catch (error) {
      console.error('Erro ao obter os arquivos do repositório:', error.message);
    }
}


document.getElementById('repoForm').addEventListener('countlines', async function(event) {
  event.preventDefault();
  await countLinesInGitHubRepo();
  
});