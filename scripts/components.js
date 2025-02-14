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

  static GifOffsetId = 'gif-offset';
  static GifOffsetTitleId = 'gif-offset-title';
  static GifOffsetSpinBoxId = 'gif-offset-spin-box';
  
  static GifScaleId = 'gif-scale';
  static GifScaleTitleId = 'gif-scale-title';
  static GifScaleSpinBoxId = 'gif-scale-spin-box';

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
  static lineDivs;

  static iconPanel;
  static playButton;
  static pauseButton;
  static editButton;
  static saveButton;

  static settingsPanel;

  static gifOffsetItem;
  static gifOffsetTitle;
  static gifOffsetSpinBox;

  static gifScaleItem;
  static gifScaleTitle;
  static gifScaleSpinBox;

  static speechSpeedItem;
  static speechSpeedIcon;
  static speechSpeedSpinBox;

  static speechInterlineItem;
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
    C.lineDivs = []
  
    C.iconPanel = document.getElementById(T.IconPanelId);
    C.playButton = document.getElementById(T.PlayButtonId);
    C.pauseButton = document.getElementById(T.PauseButtonId);
    C.editButton = document.getElementById(T.EditButtonId);
    C.saveButton = document.getElementById(T.SaveButtonId);
    
    C.settingsPanel = document.getElementById(T.SettingsPanelId);

    C.gifOffsetItem = document.getElementById(T.GifOffsetId);
    C.gifOffsetTitle = document.getElementById(T.GifOffsetTitleId);
    C.gifOffsetSpinBox = document.getElementById(T.GifOffsetSpinBoxId);

    C.gifScaleItem = document.getElementById(T.GifScaleId);
    C.gifScaleTitle = document.getElementById(T.GifScaleTitleId);
    C.gifScaleSpinBox = document.getElementById(T.GifScaleSpinBoxId);

    C.speechSpeedItem = document.getElementById(T.SpeechSpeedId);
    C.speechSpeedIcon = document.getElementById(T.SpeechSpeedIconId);
    C.speechSpeedSpinBox = document.getElementById(T.SpeechSpeedSpinBoxId);
  
    C.speechInterlineItem = document.getElementById(T.SpeechInterlineId);
    C.speechInterlineIcon = document.getElementById(T.SpeechInterlineIconId);
    C.speechInterlinePause = document.getElementById(T.SpeechInterlinePauseId);

  }
};
