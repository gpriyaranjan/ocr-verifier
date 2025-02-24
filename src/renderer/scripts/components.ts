export class T {
  static TopPanelId = 'top-panel';

  static chooserPanelId = 'chooser-panel';
  static chooseDataDirId = 'choose-data-dir';
  static dataDirPathId = 'data-dir-path';
  static chooseImageFileId = 'choose-image-file';
  static imageFilePathId = 'image-file-path';
  static ocrOutputFilePathId = 'text-file-path';
  static editedTextFileRelPathId = 'edited-text-file-path';

  static ImagePanelId = 'image-panel';
  static ImageDivId = 'image';
  static ImageContainerId = 'image-container';
  static ImageHiliteId = 'image-hilite';
  static MagnifierId = 'magnifier';
  static MagnifiedImageId = 'magnified-image';

  static TextPanelId = 'text-panel';
  static TextContainerId = 'text-container';

  static LineContainerClass = 'line-container';
  static LineDivClass = 'line-div'

  static HiliteClass = 'hilite';
  static ActiveClass = 'active';

  static IconPanelId = 'icon-panel';
  static PlayButtonId = 'play-button';
  static PauseButtonId = 'pause-button';
  // static EditButtonId = 'edit-button';
  static SaveButtonId = 'save-button';
  static SearchButtonId = 'search-button';

  static SettingsPanelId = 'settings-panel';

  static SpeechSpeedId = 'speech-speed';
  static SpeechSpeedIconId = 'speech-speed-icon';
  static SpeechSpeedSpinBoxId = 'speech-speed-spin-box';

  static SpeechInterlineId = 'speech-interline';
  static SpeechInterlineIconId = 'speech-interline-icon';
  static SpeechInterlinePauseId = 'speech-interline-pause';

  static ZoomIconId = 'zoom-icon';
  static UnzoomIconId = 'unzoom-icon';

};

export class C /* Components */ {
  static topPanel : HTMLElement;

  static chooserPanel : HTMLElement;
  static chooseDataDir : HTMLButtonElement;
  static dataDirPath : HTMLElement;
  static chooseImageFile : HTMLButtonElement;
  static imageFilePath : HTMLElement;
  static ocrOutputFilePath : HTMLElement;
  static editedTextFileRelPath : HTMLElement;

  static imagePanel : HTMLDivElement;
  static imageContainer : HTMLDivElement;
  static imageDiv : HTMLImageElement;
  static imageHilite : HTMLDivElement;
  static magnifier : HTMLDivElement;
  static magnifiedImage : HTMLDivElement;

  static textPanel : HTMLElement;
  static textContainer : HTMLElement;
  static lineDivs : HTMLInputElement[];

  static iconPanel : HTMLElement;
  static playButton : HTMLButtonElement;
  static pauseButton : HTMLButtonElement;
  static editButton : HTMLButtonElement;
  static saveButton : HTMLButtonElement;
  static searchButton : HTMLButtonElement;

  static settingsPanel : HTMLElement;

  static speechSpeedItem : HTMLElement;
  static speechSpeedIcon : HTMLElement;
  static speechSpeedSpinBox : HTMLInputElement;

  static speechInterlineItem : HTMLElement;
  static speechInterlineIcon : HTMLElement;
  static speechInterlinePause : HTMLInputElement;

  static zoomIcon : HTMLButtonElement;
  static unzoomIcon : HTMLButtonElement;

  static assignComponents() {
    C.topPanel = document.getElementById(T.TopPanelId)!;
  
    C.chooserPanel = document.getElementById(T.chooserPanelId)!;

    C.chooseDataDir = document.getElementById(T.chooseDataDirId)! as HTMLButtonElement;
    C.dataDirPath = document.getElementById(T.dataDirPathId)!;

    C.chooseImageFile = document.getElementById(T.chooseImageFileId)! as HTMLButtonElement;
    C.imageFilePath = document.getElementById(T.imageFilePathId)!;
    C.ocrOutputFilePath = document.getElementById(T.ocrOutputFilePathId)!;
    C.editedTextFileRelPath = document.getElementById(T.editedTextFileRelPathId)!;

    C.imagePanel = document.getElementById(T.ImagePanelId)! as HTMLDivElement;
    C.imageHilite = document.getElementById(T.ImageHiliteId)! as HTMLDivElement;
    C.imageContainer = document.getElementById(T.ImageContainerId)! as HTMLDivElement;
    C.imageDiv = document.getElementById(T.ImageDivId)! as HTMLImageElement;
    C.magnifier = document.getElementById(T.MagnifierId)! as HTMLDivElement;
    C.magnifiedImage = document.getElementById(T.MagnifiedImageId)! as HTMLImageElement;

    C.textPanel = document.getElementById(T.TextPanelId)!;
    C.textContainer = document.getElementById(T.TextContainerId)!;
    C.lineDivs = []
  
    C.iconPanel = document.getElementById(T.IconPanelId)!;
    C.playButton = document.getElementById(T.PlayButtonId)! as HTMLButtonElement;
    C.pauseButton = document.getElementById(T.PauseButtonId)! as HTMLButtonElement;
    C.saveButton = document.getElementById(T.SaveButtonId)! as HTMLButtonElement;
    C.searchButton = document.getElementById(T.SearchButtonId)! as HTMLButtonElement;

    C.settingsPanel = document.getElementById(T.SettingsPanelId)!;

    C.speechSpeedItem = document.getElementById(T.SpeechSpeedId)!;
    C.speechSpeedIcon = document.getElementById(T.SpeechSpeedIconId)!;
    C.speechSpeedSpinBox = document.getElementById(T.SpeechSpeedSpinBoxId)! as HTMLInputElement;
  
    C.speechInterlineItem = document.getElementById(T.SpeechInterlineId)!;
    C.speechInterlineIcon = document.getElementById(T.SpeechInterlineIconId)!;
    C.speechInterlinePause = document.getElementById(T.SpeechInterlinePauseId)! as HTMLInputElement;

    C.zoomIcon = document.getElementById(T.ZoomIconId)! as HTMLButtonElement;
    C.unzoomIcon = document.getElementById(T.UnzoomIconId)! as HTMLButtonElement;
  }
};
