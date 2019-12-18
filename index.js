import React from 'react';
import { Platform, Alert } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';

const OS = Platform.OS.toUpperCase();
const isIos = Platform.OS === 'ios';

export default class extends React.PureComponent {
  static defaultProps = {
    onMedia: () => null,
    labels: {
      cancel: 'Cancel',
      camera: 'Camera',
      gallery: 'Gallery',
    },
  };

  getMedia = isCamera =>
    ImagePicker[isCamera ? 'launchCamera' : 'launchImageLibrary']({}, this.props.onMedia);

  onOptionSelected = index => {
    if (index === 0) return;

    let permission = '';
    const isCamera = index === 1;
    if (isCamera) {
      permission = PERMISSIONS[OS].CAMERA;
    } else {
      permission = PERMISSIONS[OS][isIos ? 'PHOTO_LIBRARY' : 'READ_EXTERNAL_STORAGE'];
    }

    check(permission).then(result => {
      if (result === RESULTS.GRANTED) {
        this.getMedia(isCamera);
      } else if (result === RESULTS.BLOCKED) {
        Alert.alert('Sorry', 'You have blocked this action before this', [
          { text: 'Close' },
          { text: 'Change Setting', onPress: openSettings },
        ]);
      } else {
        request(permission).then(r => (r === RESULTS.GRANTED) && this.getMedia(isCamera));
      }
    });
  };

  askGetMedia = () => this.actionSheet.show();

  render() {
    const { cancel, camera, gallery } = this.props.labels;
    return (
      <ActionSheet
        ref={instance => (this.actionSheet = instance)}
        options={[cancel, camera, gallery]}
        cancelButtonIndex={0}
        onPress={this.onOptionSelected}
      />
    );
  }
}
