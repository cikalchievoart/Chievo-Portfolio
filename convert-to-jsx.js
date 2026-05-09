const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.join(__dirname, 'app', 'portfolio-body.html'), 'utf8');

// Remove Skills from navbar
html = html.replace(/<a[^>]*href="#skills"[^>]*>Skills<\/a>\s*/g, '');

// Convert class to className
html = html.replace(/class=/g, 'className=');

// Convert for to htmlFor
html = html.replace(/for=/g, 'htmlFor=');

// Fix inline styles
html = html.replace(/style="([^"]*)"/g, (match, p1) => {
    const styleObj = p1.split(';').filter(Boolean).reduce((acc, rule) => {
        let [key, value] = rule.split(':');
        if(!key || !value) return acc;
        key = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        acc.push(`${key}: '${value.trim()}'`);
        return acc;
    }, []).join(', ');
    return `style={{${styleObj}}}`;
});

// Self close inputs and standard self-closing tags
html = html.replace(/<input([^>]*?[^\/])>/g, '<input$1 />');
html = html.replace(/<img([^>]*?[^\/])>/g, '<img$1 />');
html = html.replace(/<br\s*>/g, '<br />');
html = html.replace(/<hr([^>]*?)>/g, '<hr$1 />');

// Remove HTML comments
html = html.replace(/<!--[\s\S]*?-->/g, '');

const pageJs = `import Script from "next/script";

export default function Home() {
  return (
    <>
      ${html}
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
`;

fs.writeFileSync(path.join(__dirname, 'app', 'page.js'), pageJs);
console.log('Successfully converted HTML to JSX');
