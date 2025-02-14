class GifPanel {

  static gifOffset = 0; // Offset in pixels
  static gifScale = 0.97;  // In percentage of the original height

  static getImageScaleDown() {
    return C.imageDiv.width / C.imageDiv.naturalWidth;
  }

  static scrollToLineNum(lineNum) {
    this.scrollToOffset(50 * lineNum);
    console.log("Image scrolling : Line number ", lineNum, " position ", C.imagePanel.scrollTop);
  }

  static scrollToOffset(offset) {
    const imageScaleDown = this.getImageScaleDown();
    const actualOffset = 100 * imageScaleDown +  this.gifOffset;
    const actualHeight = imageScaleDown * this.gifScale * offset;
    const actualPosition = actualOffset + actualHeight;
    C.imagePanel.scrollTop = actualPosition;
  }

  static scrollToCurrent() {
    this.scrollToLineNum(S.current);
  }

  static loadImage(imageFilePath) {
    console.log("Fetching image file ", imageFilePath)
    C.imageDiv.src = imageFilePath;
  }

  static onImageLoadComplete() {
    console.log("Image load complete");
    GifPanel.scrollToLineNum(0);
  }
}