import { C } from "./components.js";
import { S } from "./app_state.js";
import { MagnifyingGlass } from "./magnifying_glass.js";

export class GifPanel {

  static init() {
    C.imageDiv.style.display = 'none';
    C.imageHilite.style.display = 'none';
    C.magnifier.style.display = 'none';
  }
  
  static enable() {
    C.imageDiv.style.display = 'block';
    C.imageHilite.style.display = 'block';
  }

  static setEventHandlers() {
    C.imageDiv.addEventListener('load', this.onImageLoadComplete);
    C.imageContainer.addEventListener('click', this.toggleMagnifier);
  }

  static gifOffset = 0; // Offset in pixels
  static gifScale = 0.97;  // In percentage of the original height

  static getImageScaleDown() {
    return C.imageDiv.width / C.imageDiv.naturalWidth;
  }

  static scrollToLineNum(lineNum : number) {
    this.scrollToOffset(50 * lineNum);
    console.log("Image scrolling : Line number ", lineNum, " position ", C.imagePanel.scrollTop);
  }

  static scrollToOffset(offset : number) {
    console.log("GifPanel::scrollToOffset ", offset);
    const imageScaleDown = this.getImageScaleDown();
    const actualOffset = 100 * imageScaleDown +  this.gifOffset;
    const actualHeight = imageScaleDown * this.gifScale * offset;
    const actualPosition = actualOffset + actualHeight;
    C.imageContainer.scrollTop = actualPosition;
  }

  static scrollToCurrent() {
    this.scrollToLineNum(S.current);
  }

  static loadImage(imageFilePath : string) {
    console.log("Fetching image file ", imageFilePath)
    C.imageDiv.src = imageFilePath;
  }

  static onImageLoadComplete() {
    console.log("Image load complete");
    GifPanel.enable();
    GifPanel.scrollToLineNum(0);
  }

  static toggleMagnifier() {
    console.log("GifPanel::toggleMagnifier from ", 
      MagnifyingGlass.isVisible(), " to ", !MagnifyingGlass.isVisible());
    MagnifyingGlass.toggle();
  }
}
