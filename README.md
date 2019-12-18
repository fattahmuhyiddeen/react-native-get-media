# react-native-get-media
Get media (photo/camera) easily without worrying about permission, without worrying if user block permission. Just focus on your app, we handle media request thingy.


We handle:
1. Asking user whether to use Camera or Gallery.
1. Asking permission (in Javascript level, make sure you already configure `react-native-permissions` on native level).
1. Asking user to open setting if user already block permission in the first place.
1. Return object returned by `react-native-image-picker`.

# Dependencies
This libraries requires these libraries. PLease install it by yourself:
1. `react-native-image-picker`
1. `react-native-permissions`
2. `react-native-actionsheet`

Can install in one simple command `npm i -S react-native-image-picker react-native-permissions react-native-actionsheet` or `yarn add react-native-image-picker react-native-permissions react-native-actionsheet`.

Make sure you install and configure according to their documentations respectively.


"react-native-image-picker": "^1.1.0",
"react-native-permissions": "^2.0.8",
"react-native-actionsheet": "2.4.2"

# Usage

```
//importing
import GetMedia from 'react-native-get-media';

//make sure you render the component. This is just wrapper of react-native-actionsheet. While onMedia Props return the same thing that react-native-image-picker returns. you can follow their docs.
<GetMedia
 ref={instance => (this.getMedia = instance)}
 onMedia={this.onImagePicked}
 labels={{
   cancel: 'Cancel,
   camera: 'Camera,
   gallery: 'Gallery',
 }}
/>


//to call the get media wherever in the component
this.getMedia.askGetMedia();

```