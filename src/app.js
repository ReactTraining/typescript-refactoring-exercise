let quantity = 1;
const root = document.getElementById("root");
main();

function render() {
	root.innerHTML = getHtml(quantity);
}

function update(quantity) {
	let container = root.querySelector(".input-container");
	container.innerHTML = quantity;
}

function main() {
	render();

	let actions = {
		add: () => {
			update(++quantity);
		},
		subtract: () => {
			if (quantity >= 1) {
				update(--quantity);
			}
		},
	};

	for (let action in actions) {
		let button = root.querySelector(`#${action}-button`);
		button.addEventListener("click", actions[action]);
	}
}

function getHtml(quantity) {
	return `
<div class="quantity-picker">
  <div>
    <div>
      <button type="button" class="icon-button" id="subtract-button" aria-label="Remove an item">
        <span>-</span>
      </button>
    </div>
    <div class="input-container">${quantity}</div>
    <div>
      <button type="button" class="icon-button" id="add-button" aria-label="Add an item">
        <span>+</span>
      </button>
    </div>
  </div>
</div>
`;
}
