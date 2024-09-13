export default function init() {
  const blocks = document.querySelectorAll('.section > div[class]');
  blocks.forEach((block) => {
    const blockVals = [...block.classList];
    const blockName = blockVals.shift();
    if (blockName === 'content') return;
    block.classList.add('display-block-name');
    block.dataset.block = `${blockName} (${[...blockVals]})`;
  });
}
