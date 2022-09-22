export class Scene3d {
  init(width, height) {
    // Устанавливаем стартовые значения сцены
    this.width = width || window.innerWidth;
    this.height = height || window.innerHeight;
  }

  appendRendererToDOMElement(renderer, targetNode) {
    if (!targetNode) {
      return;
    }
    targetNode.appendChild(renderer.domElement);
  }

  construct() {
    // eslint-disable-next-line no-console
    console.warn(`Класс Scene3d требует расширения.
      Метод construct необходимо переопределить в дочернем классе.`);
  }

  resize() {
    // eslint-disable-next-line no-console
    console.warn(`Класс Scene3d требует расширения.
      Метод resize необходимо переопределить в дочернем классе.`);
  }
}
