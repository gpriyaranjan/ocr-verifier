class GifPanel {

  static getImageScaleDown() {
    return C.imageDiv.width / C.imageDiv.naturalWidth;
  }

  static scrollToLineNum(lineNum) {
    const imageScaleDown = this.getImageScaleDown();
    C.imagePanel.scrollTop = imageScaleDown + 75;
  }
}