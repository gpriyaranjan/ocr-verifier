class T {
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

  static TextPanelId = 'text-panel';
  static TextContainerId = 'text-container';

  static LineDivClass = 'line-div';
  static HiliteClass = 'hilite';
  static ActiveClass = 'active';

  static IconPanelId = 'icon-panel';
  static PlayButtonId = 'play-button';
  static PauseButtonId = 'pause-button';
  // static EditButtonId = 'edit-button';
  static SaveButtonId = 'save-button';

  static SettingsPanelId = 'settings-panel';

  static SpeechSpeedId = 'speech-speed';
  static SpeechSpeedIconId = 'speech-speed-icon';
  static SpeechSpeedSpinBoxId = 'speech-speed-spin-box';

  static SpeechInterlineId = 'speech-interline';
  static SpeechInterlineIconId = 'speech-interline-icon';
  static SpeechInterlinePauseId = 'speech-interline-pause';

};

class C /* Components */ {
  static topPanel : HTMLElement;

  static chooserPanel : HTMLElement;
  static chooseDataDir : HTMLElement;
  static dataDirPath : HTMLElement;
  static chooseImageFile : HTMLElement;
  static imageFilePath : HTMLElement;
  static ocrOutputFilePath : HTMLElement;
  static editedTextFileRelPath : HTMLElement;

  static imagePanel : HTMLElement;
  static imageDiv : HTMLImageElement;

  static textPanel : HTMLElement;
  static textContainer : HTMLElement;
  static lineDivs : HTMLElement[];

  static iconPanel : HTMLElement;
  static playButton : HTMLElement;
  static pauseButton : HTMLElement;
  static editButton : HTMLElement;
  static saveButton : HTMLElement;

  static settingsPanel : HTMLElement;

  static speechSpeedItem : HTMLElement;
  static speechSpeedIcon : HTMLElement;
  static speechSpeedSpinBox : HTMLInputElement;

  static speechInterlineItem : HTMLElement;
  static speechInterlineIcon : HTMLElement;
  static speechInterlinePause : HTMLInputElement;

  static assignComponents() {
    C.topPanel = document.getElementById(T.TopPanelId)!;
  
    C.chooserPanel = document.getElementById(T.chooserPanelId)!;

    C.chooseDataDir = document.getElementById(T.chooseDataDirId)!;
    C.dataDirPath = document.getElementById(T.dataDirPathId)!;

    C.chooseImageFile = document.getElementById(T.chooseImageFileId)!;
    C.imageFilePath = document.getElementById(T.imageFilePathId)!;
    C.ocrOutputFilePath = document.getElementById(T.ocrOutputFilePathId)!;
    C.editedTextFileRelPath = document.getElementById(T.editedTextFileRelPathId)!;

    C.imagePanel = document.getElementById(T.ImagePanelId)!;
    C.imageDiv = document.getElementById(T.ImageDivId)! as HTMLImageElement;
    
    C.textPanel = document.getElementById(T.TextPanelId)!;
    C.textContainer = document.getElementById(T.TextContainerId)!;
    C.lineDivs = []
  
    C.iconPanel = document.getElementById(T.IconPanelId)!;
    C.playButton = document.getElementById(T.PlayButtonId)!;
    C.pauseButton = document.getElementById(T.PauseButtonId)!;
    C.saveButton = document.getElementById(T.SaveButtonId)!;
    
    C.settingsPanel = document.getElementById(T.SettingsPanelId)!;

    C.speechSpeedItem = document.getElementById(T.SpeechSpeedId)!;
    C.speechSpeedIcon = document.getElementById(T.SpeechSpeedIconId)!;
    C.speechSpeedSpinBox = document.getElementById(T.SpeechSpeedSpinBoxId)! as HTMLInputElement;
  
    C.speechInterlineItem = document.getElementById(T.SpeechInterlineId)!;
    C.speechInterlineIcon = document.getElementById(T.SpeechInterlineIconId)!;
    C.speechInterlinePause = document.getElementById(T.SpeechInterlinePauseId)! as HTMLInputElement;

  }
};
