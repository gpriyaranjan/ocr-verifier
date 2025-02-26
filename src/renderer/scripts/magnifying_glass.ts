
import { C } from './components.js';

export class MagnifyingGlass {

  static setEventHandlers() {
    this.container.addEventListener("mouseleave", () => {
      this.hide();
      this.disable();
    });

    this.container.addEventListener("mousemove", (e) => {
      this.showWithCenter(e.offsetX, e.offsetY);
    });

    C.imageDiv.addEventListener('dblclick', (e) => this.setDebug("image"));
  }

  static image : HTMLImageElement;
  static magnifier : HTMLDivElement;
  static magnifiedImage : HTMLDivElement;
  static container : HTMLDivElement;

  static enabled = false;
  static magRadius = 30;
  static zoom = 2;

  static debug = false;

  static setDiameter(magDiameter: number) {
    this.magRadius = magDiameter / 2;
  }

  static setContext() {
    this.image = C.imageDiv;
    this.magnifier = C.magnifier;
    this.magnifiedImage = C.magnifiedImage;
    this.container = C.imageContainer;
  }

  static enable() {
    this.enabled = true;
  }

  static disable() {
    this.enabled = false;
  }

  static show() {
    if (!this.enabled) return;
    console.log("Showing magnifier block");
    this.magnifier.style.display = "block"; 
  }

  static hide() {
    this.magnifier.style.display = "none";    
  }

  static isVisible() {
    return (this.magnifier.style.display == 'block');
  }

  static toggle() {
    if (!this.isVisible()) {
      this.enable();
      this.show();
    } else {
      this.disable();
      this.hide();
    }
  }
  static setDebug(str: string) {
    this.debug = true;
    console.log("Setting debugger ", str);
    this.enable();
    console.log("Enabling ");
  }

  static showWithCorner(leftX: number, topY: number) {
    if (this.debug)
      console.log(`showWithCorner(${leftX}, ${topY})`);
    this.showWithCenter(leftX + this.magRadius, topY + this.magRadius);
  }

  static showWithCenter(magCenterX: number, magCenterY: number) {

    if (this.debug)
      console.log(`showWithCenter(${magCenterX}, ${magCenterY})`);

    if (!this.enabled) {
      if (this.debug) {
        console.log('Magnifier not enabled');
        this.debug = false;
        console.log("Reset debugger ");         
      }
      return;
    }

    _showWithCenter(
      magCenterX, magCenterY, 
      this.image, this.container.scrollTop, 
      this.magRadius, this.zoom, this.debug,
      this.magnifier, this.magnifiedImage );
  
    if (this.debug) {
      this.debug = false;
      console.log("Reset debugger ");  
    }
  }
}

function _showWithCenter(
  magCenterX : number, magCenterY : number, 
  image : HTMLImageElement, scrollTop : number, 
  magRadius : number, zoom : number, debug: boolean,
  magnifier : HTMLDivElement, magnifiedImage : HTMLDivElement
) {

  magCenterY = magCenterY - scrollTop;

  let imgCenterX = magCenterX;
  let imgCenterY = magCenterY + scrollTop;

  // Image parameters
  const imageRect = image.getBoundingClientRect();
  const maxCenterX = imageRect.width - magRadius;
  const maxCenterY = imageRect.height - magRadius;

  imgCenterX = Math.max(magRadius, Math.min(imgCenterX, maxCenterX));
  imgCenterY = Math.max(magRadius, Math.min(imgCenterY, maxCenterY));

  // console.log("ClientBoundingRect = ", imageRect)
  // console.log("Radius ", magRadius);
  // console.log("x-center = ", imgCenterX, ", y = ", imgCenterY)

  const imageX = imgCenterX - magRadius;
  const imageY = imgCenterY - magRadius;

  const magnifierX = magCenterX - magRadius;
  const magnifierY = magCenterY - magRadius;

  if (debug) {
    console.log("MagCenterX = " , magCenterX, "MagCenterY = ", magCenterY, "Mag radius = ", magRadius)
    console.log("MagnifierX = ", magnifierX, ", MagnifierY = ", magnifierY);
    console.log("imageX = ", imageX, " imageY = ", imageY);
  }

  magnifier.style.left = magnifierX + "px";
  magnifier.style.top = magnifierY + "px";

  const bgCenterX = - imgCenterX * zoom;
  const bgCenterY = - imgCenterY * zoom;

  const bgX = bgCenterX + 1.0 * magRadius;
  const bgY = bgCenterY + 1.0 * magRadius;

  if (debug)
    console.log("bgX = ", bgX, " bgY = ", bgY);

  magnifiedImage.style.backgroundImage = "url('" + image.src + "')";
  magnifiedImage.style.backgroundSize = 
    (image.width * zoom) + "px " + 
    (image.height * zoom) + "px";

  magnifiedImage.style.backgroundPosition = bgX + "px " + bgY + "px";
};
