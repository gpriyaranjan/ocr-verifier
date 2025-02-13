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
  static TextIframeId = 'text-iframe';

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
  static topPanel;

  static chooserPanel;
  static chooseDataDir;
  static dataDirPath;
  static chooseImageFile;
  static imageFilePath;
  static ocrOutputFilePath;
  static editedTextFileRelPath;

  static imagePanel;
  static imageDiv;

  static textPanel;
  static textContainer;
  static textIframe;
  static lineDivs;

  static iconPanel;
  static playButton;
  static pauseButton;
  static editButton;
  static saveButton;

  static settingsPanel;

  static speechSpeed;
  static speechSpeedIcon;
  static speechSpeedSpinBox;

  static speechInterline;
  static speechInterlineIcon;
  static speechInterlinePause;

  static assignComponents() {
    C.topPanel = document.getElementById(T.TopPanelId);
  
    C.chooserPanel = document.getElementById(T.chooserPanelId);

    C.chooseDataDir = document.getElementById(T.chooseDataDirId);
    C.dataDirPath = document.getElementById(T.dataDirPathId);

    C.chooseImageFile = document.getElementById(T.chooseImageFileId);
    C.imageFilePath = document.getElementById(T.imageFilePathId);
    C.ocrOutputFilePath = document.getElementById(T.ocrOutputFilePathId);
    C.editedTextFileRelPath = document.getElementById(T.editedTextFileRelPathId);

    C.imagePanel = document.getElementById(T.ImagePanelId);
    C.imageDiv = document.getElementById(T.ImageDivId);
    
    C.textPanel = document.getElementById(T.TextPanelId);
    C.textContainer = document.getElementById(T.TextContainerId);
    C.textIframe = document.getElementById(T.TextIframeId);
    C.lineDivs = []
  
    C.iconPanel = document.getElementById(T.IconPanelId);
    C.playButton = document.getElementById(T.PlayButtonId);
    C.pauseButton = document.getElementById(T.PauseButtonId);
    C.editButton = document.getElementById(T.EditButtonId);
    C.saveButton = document.getElementById(T.SaveButtonId);
    
    C.settingsPanel = document.getElementById(T.SettingsPanelId);

    C.speechSpeed = document.getElementById(T.SpeechSpeedId);
    C.speechSpeedIcon = document.getElementById(T.SpeechSpeedIconId);
    C.speechSpeedSpinBox = document.getElementById(T.SpeechSpeedSpinBoxId);
  
    C.speechInterline = document.getElementById(T.SpeechInterlineId);
    C.speechInterlineIcon = document.getElementById(T.SpeechInterlineIconId);
    C.speechInterlinePause = document.getElementById(T.SpeechInterlinePauseId);

  }
};
