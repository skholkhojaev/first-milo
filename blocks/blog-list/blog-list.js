import { getLibs } from '../../scripts/utils.js';
console.log("import is working")
const {
  html,
  render,
  useEffect,
  useState
} = await import(`${getLibs()}/deps/htm-preact.js`)
console.log("this is working")
function Dog({ heading }) {
  console.log("FUN Dog is working")
  return html `<li><h3>${heading}</h3></li>`;
}

function Bloglist({ json }) {
  const [count, setCount] = useState(0);
  const [dogData, setDogData] = useState([]);


  useEffect(async () => {
    const dogs = [];
    for (const post of json.data) {
      const resp = await fetch(`${post.path}.plain.html`);
      if (!resp.ok) return;
      const respHtml = await resp.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(respHtml, 'text/html');
      const heading = doc.querySelector('h1, h2, h3, h4, h5, p');
      dogs.push(heading.textContent);
    }
    setCount(dogs.length);
    setDogData(dogs);
  }, []);

  return html`
    <h2>DOOOOGGGGSSS</h2>
    <h4>Count: ${count}</4>
    <ul>
    ${dogData.map((heading) => html`<${Dog} heading=${heading} />`)}
    </ul>`;
}

export default async function init(el){
  const qResp = await fetch('/blog/query-index.json');
  if (!qResp.ok) return;
  const qJson = await qResp.json();

  return(html`<${Bloglist} json=${qJson} />`, el);
}
